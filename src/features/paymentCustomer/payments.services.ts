import { date } from "zod";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { MidtransClient } from "../../utils/midtrans.utils";
import { userPayload } from "../../validations/validate";
import { DriverQueueService } from "../shared/driverQueue.service";
import { PaymentRepository } from "./payments.repositories";
import { MidtransWebhookInput, OrderIdInput } from "./payments.validations";

// Status yang dianggap "sukses" (BR-PAY-02): SETTLEMENT dan CAPTURE.
const SUCCESS_STATUSES = new Set(["settlement", "capture"]);
// Terminal-gagal: attempt ini nggak akan pernah berhasil, customer boleh bikin attempt baru (BR-PAY-01).
const FAILED_STATUSES = new Set(["deny", "cancel", "expire"]);

export class PaymentService {
  static async createPaymentAttempt(
    payload: userPayload,
    { params }: OrderIdInput,
  ) {
    const order = await PaymentRepository.getOwnedOrderWithBill(payload, {
      params,
    });
    const bill = order.bill!;

    if (order.customerStatus === "OVERDUE") {
      throw new ResponseError("ORDER_OVERDUE");
    }

    if (bill.paymentStatus === "PAID") {
      throw new ResponseError("PAYMENT_ALREADY_PAID");
    }

    const pendingAttempt = await prisma.payment.findFirst({
      where: { billId: bill.id, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    if (pendingAttempt) {
      throw new ResponseError("PAYMENT_ALREADY_PENDING");
    }

    const attemptCount = await prisma.payment.count({
      where: { billId: bill.id },
    });
    const gatewayOrderId = `PAY-${order.orderCode}-${bill.id.slice(0, 4)}-${attemptCount + 1}`;

    const { token, redirectUrl } = await MidtransClient.createTransaction({
      gatewayOrderId,
      amount: Number(bill.totalAmount ?? 0),
      customerName: order.customer.name,
      customerEmail: order.customer.email,
    });

    const payment = await prisma.payment.create({
      data: {
        billId: bill.id,
        gatewayOrderId,
        amount: bill.totalAmount ?? 0,
        redirectUrl,
        status: "PENDING",
        isFinal: false,
      },
    });

    return {
      paymentId: payment.id,
      gatewayOrderId,
      snapToken: token,
      redirectUrl,
    };
  }

  static async getLastestPaymentAttempt(
    payload: userPayload,
    { params }: OrderIdInput,
  ) {
    const order = await PaymentRepository.getOwnedOrderWithBill(payload, {
      params,
    });

    const latest = await prisma.payment.findFirst({
      where: { billId: order.bill!.id },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      throw new ResponseError(
        "BILL_NOT_FOUND",
        "Belum ada percobaan pembayaran untuk order ini.",
      );
    }

    return {
      id: latest.id,
      status: latest.status,
      amount: latest.amount,
      redirectUrl: latest.redirectUrl,
      isFinal: latest.isFinal,
      paidAt: latest.paidAt,
      billPaymentStatus: order.bill!.paymentStatus,
    };
  }
  static async MidtransWebhook({ payload }: MidtransWebhookInput) {
    const isValidSignature = MidtransClient.verifySignature({
      order_id: payload.order_id,
      status_code: payload.status_code,
      gross_amount: payload.gross_amount,
      signature_key: payload.signature_key,
    });

    const payment = await prisma.payment.findUnique({
      where: { gatewayOrderId: payload.order_id },
      include: { bill: { include: { order: true } } },
    });

    if (payment) {
      await prisma.paymentWebhook.create({
        data: {
          paymentId: payment.id,
          eventType: payload.transaction_status,
          rawPayload: JSON.stringify(payload),
          signature: payload.signature_key,
          isValid: isValidSignature,
        },
      });
    }

    if (!isValidSignature) {
      throw new ResponseError(
        "INVALID_PAYMENT_SIGNATURE",
        "Signature webhook tidak valid.",
      );
    }

    if (!payment) {
      return { received: true };
    }

    const order = payment.bill.order;

    if (order.customerStatus === "OVERDUE") {
      return { received: true };
    }

    if (payment.isFinal) {
      return { received: true };
    }

    const status = payload.transaction_status.toLowerCase();

    await prisma.$transaction(async (tx) => {
      if (SUCCESS_STATUSES.has(status)) {
        const paidAt = new Date(); // satu timestamp, dipakai konsisten di 3 tempat

        // Re-cek UNPAID di dalam transaction — mencegah dua webhook/attempt
        // beda nyalain PAID dua kali kalau race condition (BR-PAY-01: "Satu
        // Bill hanya berubah PAID sekali").
        await tx.bill.updateMany({
          where: { id: payment.bill.id, paymentStatus: "UNPAID" },
          data: { paymentStatus: "PAID", paidAt },
        });

        await tx.order.update({
          where: { id: order.id },
          data: { paidAt },
        });

        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: status === "settlement" ? "SETTLEMENT" : "CAPTURE",
            isFinal: true,
            paidAt,
          },
        });
      } else if (FAILED_STATUSES.has(status)) {
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: status.toUpperCase() as "DENY" | "CANCEL" | "EXPIRE",
            isFinal: true,
          },
        });
      }
    });

    if (SUCCESS_STATUSES.has(status)) {
      await DriverQueueService.enqueueDeliveryIfEligible(order.id);
    }

    return { received: true };
  }
}

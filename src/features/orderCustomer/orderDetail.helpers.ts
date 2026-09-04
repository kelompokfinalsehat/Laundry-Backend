import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import {
  CUSTOMER_STATUS_LABELS,
} from "./order.constants";
import { OrderHelper } from "./order.helpers";

export class OrderDetailHelper {
  static async getDetail(
    customerId: string,
    orderId: string,
  ) {
    const order =
      await this.findCustomerOrder(
        customerId,
        orderId,
      );

    return this.buildResponse(order);
  }

  private static async findCustomerOrder(
    customerId: string,
    orderId: string,
  ) {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        customerId,
      },
      include: {
        bill: true,
        orderItems: {
          include: {
            laundryItem: true,
          },
        },
        driverAssignments: true,
        workerAssignments: true,
        complaint: true,
      },
    });

    if (!order) {
      throw new ResponseError(
        "FORBIDDEN",
        "Order tidak ditemukan atau bukan milik kamu.",
      );
    }

    return order;
  }

  private static buildResponse(
    order: Awaited<
      ReturnType<
        typeof OrderDetailHelper.findCustomerOrder
      >
    >,
  ) {
    return {
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      customerStatusLabel:
        CUSTOMER_STATUS_LABELS[
          order.customerStatus
        ],
      addressSnapshot:
        order.addressSnapshot,
      addressPhoneSnapshot:
        order.addressPhoneSnapshot,
      pickupDate: order.pickupDate,
      pickupScheduledAt:
        order.pickupScheduledAt,
      bill: order.bill,
      orderItems: order.orderItems,
      complaint: order.complaint,
      timeline:
        OrderHelper.buildTimeline(order),
      allowedActions:
        this.getAllowedActions(order),
    };
  }

  private static getAllowedActions(
    order: Awaited<
      ReturnType<
        typeof OrderDetailHelper.findCustomerOrder
      >
    >,
  ) {
    const waitingConfirmation =
      order.customerStatus ===
      "WAITING_CUSTOMER_CONFIRMATION";

    return {
      canPay:
        order.bill !== null &&
        order.bill.paymentStatus === "UNPAID",

      canConfirmReceived:
        waitingConfirmation,

      canFileComplaint:
        waitingConfirmation &&
        !order.complaint,
    };
  }
}
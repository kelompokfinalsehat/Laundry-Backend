import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { PaymentValidation } from "./payments.validations";
import { PaymentService } from "./payments.services";
import { StatusCodes } from "http-status-codes";
import { MidtransClient } from "../../utils/midtrans.utils";
import { mapStatusToUserMessage } from "./payments.helpers";

export class PaymentController {
  static async createPaymentAttempt(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(PaymentValidation.ORDER_ID, {
      params: req.params,
    });

    const result = await PaymentService.createPaymentAttempt(payload, {
      params,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
      message: "percobaan pembayaran berhasil di buat!",
    });
  }
  static async getLatestPaymentAttempt(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(PaymentValidation.ORDER_ID, {
      params: req.params,
    });

    const result = await PaymentService.getLastestPaymentAttempt(payload, {
      params,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "histori percobaan pembayaran berhasil didapatkan.",
    });
  }
  static async MidtransWebhook(req: Request, res: Response) {
    const { payload } = validate(PaymentValidation.MIDTRANS_WEEBHOOK, {
      payload: req.body,
    });

    const result = await PaymentService.MidtransWebhook({ payload });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "pembayaran berhasil di validasi.",
    });
  }

  static async expirePaymentHandler(req: Request, res: Response) {
  const { order_id } = req.body;

  if (typeof order_id !== "string" || !order_id) {
    return res.status(400).json({ message: "order_id wajib diisi" });
  }

  try {
    const result = await MidtransClient.expireTransaction(order_id);
    return res.status(200).json({
      message: "Transaksi berhasil dibuat expire",
      transactionStatus: result.transactionStatus,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Transaksi sudah dalam status final, tidak perlu dibuat expire",
    });
  }
}
}

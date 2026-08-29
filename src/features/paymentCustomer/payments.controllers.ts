import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { PaymentValidation } from "./payments.validations";
import { PaymentService } from "./payments.services";
import { StatusCodes } from "http-status-codes";

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
      message: "histori percobaan pembayaran berhasil dibuat.",
    });
  }
  static async MidtransWebhook(req: Request, res: Response) {
    const { payload } = validate(PaymentValidation.MIDTRANS_WEEBHOOK, {
      payload: req.body,
    });
    console.log("MIDTRANS WEBHOOK PAYLOAD:");
    console.log(JSON.stringify(req.body, null, 2));

    const result = await PaymentService.MidtransWebhook({ payload });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "pembayaran berhasil di validasi.",
    });
  }
}

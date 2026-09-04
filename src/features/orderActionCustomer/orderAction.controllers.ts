import { Request, Response } from "express";
import { OrderActionValidation } from "./orderAction.validations";
import { validate } from "../../validations/validate";
import { OrderActionServices } from "./orderAction.services";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { StatusCodes } from "http-status-codes";

export class OrderActionController {
  static async confirm(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(OrderActionValidation.ORDER_DETAIL, {
      params: req.params,
    });

    const result = await OrderActionServices.confirm(payload, { params });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: result.message,
    });
  }

  static async complaint(req: Request, res: Response) {
    const payload = res.locals.payload;
    const file = req.file;
    const { params, body } = validate(OrderActionValidation.COMPLAINT_ORDER, {
      params: req.params,
      body: req.body,
    });

    if (!file) {
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "File foto wajib diunggah. diunggah",
      );
    }

    const result = await OrderActionServices.complaint(payload, file, {
      params,
      body,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
      message:
        "Komplain berhasil dikirim dan akan segera ditinjau oleh tim kami.",
    });
  }
}

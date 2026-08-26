import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { OrderCustomerValidation } from "./order.validation";
import { OrderService } from "./order.services";
import { StatusCodes } from "http-status-codes";


export class OrderController {
  static async create(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(OrderCustomerValidation.CREATE_ORDER, {
      body: req.body,
    });

    const order = await OrderService.create(payload, { body });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: order,
      message: "Pickup berhasil dijadwalkan!",
    });
  }
  static async getListOrder(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { query } = validate(OrderCustomerValidation.LIST_ORDER, {
      query: req.query,
    });

    const { data, meta } = await OrderService.getListOrder(payload, {
      query,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "histori laundy kamu berahasil di dapatkan",
      data: data,
      meta,
    });
  }
  static async getDetailOrder(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(OrderCustomerValidation.ORDER_DETAIL, {
      params: req.params,
    });

    const order = await OrderService.getDetailOrder(payload, { params });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: order,
      message: `Detail order ${order.orderCode} berhasil di dapatkan`,
    });
  }
}

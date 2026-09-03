import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { OrderValidation } from "./order.validation";
import { OrderService } from "./order.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class OrderController {
    static async getOrders(req: Request, res: Response){
        const query = validate(OrderValidation.QUERY.getOrders, req.query)
        const {sub} = res.locals.payload
        const result = await OrderService.getOrders(query, sub)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getOrderById(req: Request, res: Response){
        const {id} = validate(OrderValidation.PARAMS.orderId, req.params)
        const {sub} = res.locals.payload
        const order = await OrderService.getOrderById(id, sub)
        return ResponseHelper.success(res, Message.FETCHED, order)
    }
    static async receiveOrder(req: Request, res: Response){
        const {id} = validate(OrderValidation.PARAMS.orderId, req.params)
        const {sub} = res.locals.payload
        const order = await OrderService.receiveOrder(id, sub)
        return ResponseHelper.success(res, Message.RECEIVED, order)
    }
    static async createOrder(req: Request, res: Response){
        const {id} = validate(OrderValidation.PARAMS.orderId, req.params)
        const body = validate(OrderValidation.BODY.createOrder, req.body)
        const {sub} = res.locals.payload
        const order = await OrderService.createOrder(id, sub, body)
        return ResponseHelper.success(res, Message.CREATED, order)
    }
}
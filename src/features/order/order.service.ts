import { ResponseError } from "../../utils/errors/response-error.utils";
import { OrderRepository } from "./order.repository";
import { OrderQuery } from "./order.type";

export class OrderService {
    static async getOrders(query: OrderQuery, outletId?: string){
        return await OrderRepository.findAll(query, outletId)
    }
    static async getOrderById(id: string, outletId?: string){
        const order = await OrderRepository.findById(id, outletId)
        if(!order) throw new ResponseError('RESOURCE_NOT_FOUND', 'Order not found.')
        return order
    }
}
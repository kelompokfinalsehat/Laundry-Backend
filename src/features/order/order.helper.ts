import { ResponseError } from "../../utils/errors/response-error.utils";
import { OrderRepository } from "./order.repository";

export class OrderHelper {
    static async findOrderByIdOrThrow(id: string, outletId?: string){
        const order = await OrderRepository.findById(id, outletId)
        if(!order) throw new ResponseError('RESOURCE_NOT_FOUND', 'Order not found.')
        return order
    }
}
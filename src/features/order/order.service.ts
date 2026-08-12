import { DriverAssignmentStatus } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { OrderRepository } from "./order.repository";
import { OrderQuery } from "./order.type";

export class OrderService {
    private static async findOrderByIdOrThrow(id: string, outletId?: string){
        const order = await OrderRepository.findById(id, outletId)
        if(!order) throw new ResponseError('RESOURCE_NOT_FOUND', 'Order not found.')
        return order
    }
    static async getOrders(query: OrderQuery, outletId?: string){
        return OrderRepository.findAll(query, outletId)
    }
    static async getOrderById(id: string, outletId?: string){
        const order = await this.findOrderByIdOrThrow(id, outletId)
        return order
    }
    static async receiveOrder(orderId: string, outletId: string, outletAdminId: string){
        const order = await this.findOrderByIdOrThrow(orderId, outletId)
        if(order.receivedAt) return order
        const assignment = await OrderRepository.findPickupAssignment(orderId)
        if(!assignment) throw new ResponseError('RESOURCE_NOT_FOUND', 'Pickup assignment not found/empty.')
        if(assignment.status !== DriverAssignmentStatus.IN_PROGRESS || !assignment.driverId) throw new ResponseError('INVALID_STATE_TRANSITION', 'Pickup is not currently in progress.')
        return OrderRepository.receiveOrder(orderId, assignment.id, assignment.driverId, outletAdminId)
    }
}
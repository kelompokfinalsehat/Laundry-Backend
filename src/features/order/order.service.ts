import {
  CustomerStatus,
  DriverAssignmentStatus,
  Prisma,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { LaundryItemRepository } from "../laundry-item/laundry-item.repository";
import { PricingRepository } from "../pricing/pricing.repository";
import { OrderHelper } from "./order.helper";
import { OrderRepository } from "./order.repository";
import { CreateOrderBody, OrderQuery } from "./order.type";

export class OrderService {
  static async getOrders(query: OrderQuery, sub: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
    return OrderRepository.findAll(query, employee.currentOutletId ?? undefined);
  }
  static async getOrderById(id: string, sub: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
    const order = await OrderHelper.findOrderByIdOrThrow(id, employee.currentOutletId ?? undefined)
    return order;
  }
  static async receiveOrder(
    orderId: string,
    outletAdminId: string,
  ) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
    const order = await OrderHelper.findOrderByIdOrThrow(orderId, employee.currentOutletId ?? undefined)
    if (order.receivedAt) return order;
    if (order.customerStatus !== CustomerStatus.ON_THE_WAY_TO_OUTLET)
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Order is not ready to be received.",
      );
    const assignment = await OrderRepository.findPickupAssignment(orderId);
    if (!assignment)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Pickup assignment not found/empty.",
      );
    if (
      assignment.status !== DriverAssignmentStatus.IN_PROGRESS ||
      !assignment.driverId
    )
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Pickup is not currently in progress.",
      );
    return OrderRepository.receiveOrder(
      orderId,
      assignment.id,
      assignment.driverId,
      outletAdminId,
    );
  }
  static async createOrder(
    orderId: string,
    outletAdminId: string,
    body: CreateOrderBody,
  ) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
    if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
    const order = await OrderHelper.findOrderByIdOrThrow(orderId, employee.currentOutletId)
    if (!order.receivedAt)
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Order has not been received by outlet.",
      );
    if (order.bill) return order;
    if (order.customerStatus !== CustomerStatus.ARRIVED_AT_OUTLET)
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Order is not ready to be created.",
      );
    const itemIds = body.items.map((item) => item.laundryItemId);
    const laundryItems = await LaundryItemRepository.findByIds(itemIds);
    const uniqueItemIds = new Set(itemIds);
    if (laundryItems.length !== uniqueItemIds.size)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "One or more laundry items are not found.",
      );
    const laundryPricing = await PricingRepository.findCurrentLaundryPricing();
    if (!laundryPricing)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Laundry price is not found/empty.",
      );
    const shippingRate =
      await PricingRepository.findShippingRateByDistanceMeter(
        Number(order.distanceMeters),
      );
    if (!shippingRate)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Shipping price is not found.",
      );
    const weightKg = new Prisma.Decimal(body.weightKg);
    const laundryCost = weightKg.mul(laundryPricing.pricePerKg);
    const totalAmount = laundryCost.add(shippingRate.price);
    return OrderRepository.createOrder({
      orderId,
      outletId: employee.currentOutletId,
      weightKg,
      laundryPricingId: laundryPricing.id,
      pricePerKgSnapshot: laundryPricing.pricePerKg,
      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,
      totalAmount,
      items: body.items,
    });
  }
}

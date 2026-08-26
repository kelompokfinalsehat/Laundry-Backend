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
  const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub);
  const order = await OrderHelper.findOrderByIdOrThrow(id, employee.currentOutletId ?? undefined);

  if (!order.bill || !order.bill.weightKg) {
    return order;
  }

  const laundryPricing = await PricingRepository.findCurrentLaundryPricing();
  const shippingRate = await PricingRepository.findShippingRateByDistanceMeter(
    Number(order.distanceMeters)
  );

  const weightKg = Number(order.bill.weightKg);
  const pricePerKg = laundryPricing ? Number(laundryPricing.pricePerKg) : 0;
  const shippingCost = shippingRate ? Number(shippingRate.price) : 0;
  const laundryCost = weightKg * pricePerKg;

  return {
    ...order,
    bill: {
      ...order.bill,
      laundryCost,
      shippingCost,
    },
  };
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
        "Order belum siap untuk diterima.",
      );
    const assignment = await OrderRepository.findPickupAssignment(orderId);
    if (!assignment)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Penugasan pickup tidak ditemukan.",
      );
    if (
      assignment.status !== DriverAssignmentStatus.IN_PROGRESS ||
      !assignment.driverId
    )
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Penugasan tidak dalam progress.",
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
    if (!order.receivedAt || order.customerStatus !== CustomerStatus.ARRIVED_AT_OUTLET)
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Order belum diterima outlet.",
      );
    if (order.bill) return order;
    const itemIds = body.items.map((item) => item.laundryItemId);
    const laundryItems = await LaundryItemRepository.findByIds(itemIds);
    const uniqueItemIds = new Set(itemIds);
    if (laundryItems.length !== uniqueItemIds.size)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "1 atau lebih laundry item tidak ditemukan.",
      );
    const laundryPricing = await PricingRepository.findCurrentLaundryPricing();
    if (!laundryPricing)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Harga laundry tidak ditemukan/kosong.",
      );
    const shippingRate =
      await PricingRepository.findShippingRateByDistanceMeter(
        Number(order.distanceMeters),
      );
    if (!shippingRate)
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "Harga ongkir tidak ditemukan.",
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

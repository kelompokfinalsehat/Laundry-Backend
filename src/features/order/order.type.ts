import z from "zod";
import { OrderValidation } from "./order.validation";
import { Prisma } from "../../../generated/prisma";

export type OrderQuery = z.infer<typeof OrderValidation.QUERY.getOrders>
export type CreateOrderBody = z.infer<typeof OrderValidation.BODY.createOrder>
export type CreateOrderTransactionData = {
    orderId: string;
    outletId: string;
    weightKg: Prisma.Decimal;
    laundryPricingId: string;
    pricePerKgSnapshot: Prisma.Decimal;
    shippingRateId: string;
    shippingFeeSnapshot: Prisma.Decimal;
    totalAmount: Prisma.Decimal;
    items: {
        laundryItemId: string;
        quantity: number;
    }[];
}
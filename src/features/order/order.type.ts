import z from "zod";
import { OrderValidation } from "./order.validation";

export type OrderQuery = z.infer<typeof OrderValidation.QUERY.getOrders>
export type CreateOrderBody = z.infer<typeof OrderValidation.BODY.createOrder>
import z from "zod";
import { BillPaymentStatus, CustomerStatus } from "../../../generated/prisma";

export class OrderValidation {
  static readonly QUERY = {
    getOrders: z.object({
      page: z.coerce.number().positive().optional(),
      pageSize: z.coerce.number().positive().optional(),
      search: z.string().trim().optional(),
      outletId: z.uuid().optional(),
      customerStatus: z.enum(CustomerStatus).optional(),
      paymentStatus: z.enum(BillPaymentStatus).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["pickupScheduledAt", "orderCode", "createdAt"]).default("createdAt"),
      sortOrder: z.enum(["asc", "desc"]).default("desc"),
    }),
  };
  static readonly PARAMS = {
    orderId: z.object({
        id: z.uuid()
    })
  }
  static readonly BODY = {
    createOrder: z.object({
        weightKg: z.coerce.number().positive(),
        items: z.array(z.object({
            laundryItemId: z.uuid(),
            quantity: z.coerce.number().int().positive()
        })).min(1)
    })
  }
}

import * as z from "zod";
import { ORDER_STATUS_GROUPS } from "./order.constans";

const SORTABLE_FIELDS = ["createdAt", "pickupDate"] as const;

const orderStatusGroupKeys = Object.keys(ORDER_STATUS_GROUPS) as [
  keyof typeof ORDER_STATUS_GROUPS,
  ...(keyof typeof ORDER_STATUS_GROUPS)[],
];

export class OrderCustomerValidation {
  static readonly CREATE_ORDER = z.object({
    body: z
      .object({
        addressId: z.string().uuid("Alamat tidak valid"),
        pickupDate: z.string().date("Format tanggal tidak valid (YYYY-MM-DD)"),
        pickupTime: z
          .string()
          .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            "Format jam tidak valid (HH:mm)",
          ),
        locationPermissionGranted: z.boolean(),
      })
      .refine(
        (data) => {
          const pickupDateTime = new Date(
            `${data.pickupDate}T${data.pickupTime}:00`,
          );
          return pickupDateTime.getTime() > Date.now();
        },
        { message: "Waktu pickup harus di masa depan", path: ["pickupDate"] },
      ),
  });

  static readonly LIST_ORDER = z.object({
    query: z
      .object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        search: z.preprocess(
          (val) => (val === "" ? undefined : val),
          z.string().trim().max(50).optional(),
        ),
        statusGroup: z.preprocess(
          (val) => (val === "" ? undefined : val),
          z.enum(orderStatusGroupKeys).optional(),
        ),
        startDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
        endDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
        sortBy: z.enum(SORTABLE_FIELDS).default("createdAt"),
        sortOrder: z.enum(["asc", "desc"]).default("desc"),
      })
      .refine(
        (data) => {
          if (data.startDate && data.endDate) {
            return new Date(data.startDate) <= new Date(data.endDate);
          }
          return true;
        },
        {
          message: "Tanggal awal harus sebelum atau sama dengan tanggal akhir",
          path: ["startDate"],
        },
      ),
  });
  static readonly ORDER_DETAIL = z.object({
    params: z.object({ id: z.string().uuid("ID order tidak valid") }),
  });
}

export type CreateOrderInput = z.infer<
  typeof OrderCustomerValidation.CREATE_ORDER
>;
export type ListOrderInput = z.infer<typeof OrderCustomerValidation.LIST_ORDER>;
export type DetailOrderInput = z.infer<
  typeof OrderCustomerValidation.ORDER_DETAIL
>;

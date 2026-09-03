import * as z from "zod";

export class OrderActionValidation {
  static readonly ORDER_DETAIL = z.object({
    params: z.object({ id: z.string().uuid("ID order tidak valid") }),
  });
  static readonly COMPLAINT_ORDER = z.object({
    params: z.object({
      id: z.string().uuid("ID order tidak valid"),
    }),
    body: z.object({
      category: z.enum(["TIDAK_SESUAI", "RUSAK", "HILANG"]),
      description: z.string().min(1, "Deskripsi wajib diisi").max(500),
    }),
  });
}

export type ComplaintOrderInput = z.infer<
  typeof OrderActionValidation.COMPLAINT_ORDER
>;
export type DetailOrderInput = z.infer<
  typeof OrderActionValidation.ORDER_DETAIL
>;

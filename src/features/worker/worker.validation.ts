import * as zod from "zod";
import { paginationSchema } from "../../validations/pagination.validation";
import { StationType } from "../../../generated/prisma";

export class WorkerValidation {
  static readonly AVAILABLE_ASSIGNMENT = zod.object({
    query: paginationSchema.extend({
      stationType: zod
        .enum([StationType.WASHING, StationType.IRONING, StationType.PACKING], { message: "Pilihan tidak tersedia!" })
        .optional(),
      sortOrder: zod.enum(["asc", "desc"], { message: "Pilihan tidak tersedia!" }).default("desc"),
    }),
  });

  static readonly HISTORY_LIST = zod.object({
    query: paginationSchema.extend({
      stationType: zod
        .enum([StationType.WASHING, StationType.IRONING, StationType.PACKING], {
          message: "Pilihan tidak tersedia!",
        })
        .optional(),
      sortOrder: zod.enum(["asc", "desc"], { message: "Pilihan tidak tersedia!" }).default("desc"),
    }),
  });

  static readonly CLAIM_ASSIGNMENT = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid!"),
    }),
    body: zod.object({}).strict(),
  });

  static readonly VALIDATE_QUANTITIES = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid!"),
    }),
    body: zod.object({
      items: zod
        .array(
          zod.object({
            orderItemId: zod.uuid("ID item tidak valid!"),
            submittedQuantity: zod
              .number()
              .int("Input harus berupa bilangan bulat!")
              .nonnegative("Input tidak boleh negatif!"),
          }),
        )
        .min(1, "Minimal input 1 items!")
        .refine((items) => new Set(items.map((id) => id.orderItemId)).size === items.length, {
          message: "Order item tidak boleh duplikat!", // pengecekan duplikat order Items
        }),
    }),
  });

  static readonly REQUEST_BYPASS = this.VALIDATE_QUANTITIES;

  static readonly COMPLETE = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid!"),
    }),
    body: zod.object({}).strict(),
  });
}

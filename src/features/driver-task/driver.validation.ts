import * as zod from "zod";
import { paginationSchema } from "../../validations/pagination.validation";
import { PickupDeliveryType } from "../../../generated/prisma";

const assignmentIdParamsSchema = zod.object({
  assignmentId: zod.uuid("ID tidak valid!"),
});

const emptyBodySchema = zod.object({}).strict();

export class DriverValidation {
  static readonly AVAILABLE_ASSIGNMENT = zod.object({
    query: paginationSchema.extend({
      taskType: zod.enum([PickupDeliveryType.PICKUP, PickupDeliveryType.DELIVERY], { message: "Tipe tugas hanya boleh PICKUP atau DELIVERY!" }).optional(),
      sortOrder: zod.enum(["asc", "desc"], { message: "Urutan hanya boleh ASCENDING atau DESCENDING" }).default("desc"),
    }),
  });

  static readonly CLAIM_ASSIGNMENT = zod.object({
    params: assignmentIdParamsSchema,
    body: emptyBodySchema,
    // body kosong, karna frontend hanya kirim body kosong untuk claim.
    // semua ditentukan oleh backend
  });

  static readonly START_ASSIGNMENT = zod.object({
    params: assignmentIdParamsSchema,
    body: emptyBodySchema,
  });

  static readonly PICKUP = zod.object({
    params: assignmentIdParamsSchema,
    body: emptyBodySchema,
  });

  static readonly COMPLETE_DELIVERY = zod.object({
    params: assignmentIdParamsSchema,
    body: emptyBodySchema,
  });

  static readonly HISTORY_LIST = zod.object({
    query: paginationSchema.extend({
      taskType: zod
        .enum([PickupDeliveryType.PICKUP, PickupDeliveryType.DELIVERY], {
          message: "Tipe tugas hanya PICKUP atau DELIVERY!",
        })
        .optional(),
      period: zod.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Format bulan harus YYYY-MM!"),
      sortOrder: zod.enum(["asc", "desc"], { message: "Urutan hanya boleh ASC atau DESC!" }).default("desc"),
    }),
  });

  static readonly HISTORY_DETAIL = zod.object({
    params: assignmentIdParamsSchema,
  });
}

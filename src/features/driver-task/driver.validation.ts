import * as zod from "zod";
import { paginationSchema } from "../../validations/pagination.validation";

export class DriverValidation {
  static readonly AVAILABLE_ASSIGNMENT = zod.object({
    query: paginationSchema.extend({
      taskType: zod
        .enum(["PICKUP", "DELIVERY"], { message: "Tipe tugas hanya boleh PICKUP atau DELIVERY!" })
        .optional(),
      sortOrder: zod.enum(["asc", "desc"], { message: "Urutan hanya boleh ASCENDING atau DESCENDING" }).default("desc"),
    }),
  });

  static readonly CLAIM_ASSIGNMENT = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid"),
    }),
    body: zod.object({}).strict(),
    // body kosong, karna frontend hanya kirim body kosong untuk claim.
    // semua ditentukan oleh backend
  });

  static readonly START_ASSIGNMENT = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid"),
    }),
    body: zod.object({}).strict(),
  });

  static readonly PICKUP_COLLECTED = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid"),
    }),
    body: zod.object({}).strict(),
  });

  static readonly COMPLETE_DELIVERY = zod.object({
    params: zod.object({
      assignmentId: zod.uuid("ID tidak valid"),
    }),
    body: zod.object({}).strict(),
  });
}

export type DriverAvailableAssignmentInput = zod.infer<typeof DriverValidation.AVAILABLE_ASSIGNMENT>;
export type DriverClaimInput = zod.infer<typeof DriverValidation.CLAIM_ASSIGNMENT>;
export type DriverStartTaskInput = zod.infer<typeof DriverValidation.START_ASSIGNMENT>;
export type DriverPickupCollectedInput = zod.infer<typeof DriverValidation.PICKUP_COLLECTED>;
export type DriverCompleteDeliveryInput = zod.infer<typeof DriverValidation.COMPLETE_DELIVERY>;

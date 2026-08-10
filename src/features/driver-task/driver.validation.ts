import * as zod from "zod";
import { paginationSchema } from "../../validations/pagination.validation";

export class DriverValidation {
  static readonly AVAILABLE_TASKS = zod.object({
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
    // body kudu kosong, karna frontend hanya kirim body kosong untuk claim.
    // semua ditentukan oleh backend
  });
}

export type DriverAvailableTaskInput = zod.infer<typeof DriverValidation.AVAILABLE_TASKS>;
export type DriverClaimInput = zod.infer<typeof DriverValidation.CLAIM_ASSIGNMENT>;

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
}

export type DriverAvailableTaskInput = zod.infer<typeof DriverValidation.AVAILABLE_TASKS>;

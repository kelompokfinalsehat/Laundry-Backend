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
}

export type WorkerAvailableAssignmentInput = zod.infer<typeof WorkerValidation.AVAILABLE_ASSIGNMENT>;

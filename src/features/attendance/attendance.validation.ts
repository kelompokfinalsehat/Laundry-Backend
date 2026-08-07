import * as zod from "zod";
import { paginationSchema } from "../../validations/pagination.validation";

export class AttendanceValidation {
  static readonly CLOCK_IN = zod.object({
    body: zod.object({}).strict(),
  });
  static readonly CLOCK_OUT = zod.object({
    body: zod.object({}).strict(),
  });
  static readonly HISTORY = zod.object({
    query: paginationSchema.extend({
      period: zod.enum(["THIS_WEEK", "THIS_MONTH"]).optional,
      sortOrder: zod.enum(["asc", "desc"]).default("desc"),
    }),
  });
}

export type AttendanceHistoryInput = zod.infer <typeof AttendanceValidation.HISTORY>

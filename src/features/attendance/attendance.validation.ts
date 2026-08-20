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
      period: zod
        .enum(["THIS_WEEK", "THIS_MONTH"], { message: "Pilihan Period hanya berdasarkan minggu dan bulan!" })
        .optional(),
      sortOrder: zod
        .enum(["asc", "desc"], { message: "Pilihan urutan hanya boleh ASCENDING atau DESCENDING!" })
        .default("desc"),
    }),
  });
}



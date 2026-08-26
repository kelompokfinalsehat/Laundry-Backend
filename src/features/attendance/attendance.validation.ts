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
      period: zod.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Format bulan harus YYYY-MM!"),
      sortOrder: zod.enum(["asc", "desc"], { message: "Pilihan urutan hanya boleh ASCENDING atau DESCENDING!" }).default("desc"),
    }),
  });
}

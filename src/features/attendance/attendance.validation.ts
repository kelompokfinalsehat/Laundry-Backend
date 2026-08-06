import * as zod from "zod";

export class AttendanceValidation {
  static readonly CLOCK_IN = zod.object({
    body: zod.object({}).strict(),
  });
  static readonly CLOCK_OUT = zod.object({
    body: zod.object({}).strict(),
  });
}

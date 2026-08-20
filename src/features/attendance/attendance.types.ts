import * as zod from "zod";
import type { AttendanceValidation } from "./attendance.validation";

export type ClockInInput = {
  employeeId: string;
  outletId: string;
  attendanceDate: Date;
  clockInAt: Date;
};

export type AttendanceHistoryInput = zod.infer<typeof AttendanceValidation.HISTORY>;

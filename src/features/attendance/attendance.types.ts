import * as zod from "zod";
import type { AttendanceValidation } from "./attendance.validation";
import type { Prisma } from "../../../generated/prisma";

export type ClockInInput = {
  employeeId: string;
  outletId: string;
  attendanceDate: Date;
  clockInAt: Date;
};

export type AttendanceHistoryPaginated = {
  where: Prisma.AttendanceWhereInput;
  skip: number;
  take: number;
  sortOrder: "asc" | "desc";
};
export type AttendanceHistoryInput = zod.infer<typeof AttendanceValidation.HISTORY>;

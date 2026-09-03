import z from "zod";
import { EmployeeValidation } from "./employee.validation";
import { Role } from "../../../generated/prisma";

export type EmployeeQuery = z.infer<typeof EmployeeValidation.Query.getEmployees>;
export type OutletTeamQuery = z.infer<typeof EmployeeValidation.Query.getCurrentOutletEmployees>;
export type OutletAttendanceQuery = z.infer<typeof EmployeeValidation.Query.getCurrentOutletAttendance>;
export type InviteEmployeeBody = z.infer<typeof EmployeeValidation.Body.inviteEmployee>;
export type UpdateEmployeeBody = z.infer<typeof EmployeeValidation.Body.updateEmployee>;
export type AssignEmployeeBody = z.infer<typeof EmployeeValidation.Body.assignEmployee>;

export enum AttendanceStatus {
  NOT_CLOCKED_IN = "NOT_CLOCKED_IN",
  CLOCKED_IN = "CLOCKED_IN",
  CLOCKED_OUT = "CLOCKED_OUT",
}

export type EmployeeWithAttendace = {
  role: Role;
  name: string;
  email: string;
  id: string;
  attendances: {
    clockInAt: Date | null;
    clockOutAt: Date | null;
    id: string;
    attendanceDate: Date;
  }[];
}[];

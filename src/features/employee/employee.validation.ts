import z from "zod";
import { AccountStatus, Role, StationType, WorkStatus } from "../../../generated/prisma";
import { AttendanceStatus } from "./employee.type";

export class EmployeeValidation {
  static readonly Query = {
    getEmployees: z.object({
      page: z.coerce.number().int().min(1).positive().optional(),
      pageSize: z.coerce.number().int().min(1).max(50).optional(),
      search: z.string().trim().optional(),
      role: z.enum([Role.OUTLET_ADMIN, Role.WORKER, Role.DRIVER]).optional(),
      accountStatus: z.enum(AccountStatus).optional(),
      workStatus: z.enum(WorkStatus).optional(),
      outletId: z.uuid().optional(),
      sortBy: z.enum(["name", "email", "role", "accountStatus", "createdAt"]).default("name"),
      sortOrder: z.enum(["asc", "desc"]).default("asc"),
    }),
    getCurrentOutletEmployees: z
      .object({
        page: z.coerce.number().positive().optional(),
        pageSize: z.coerce.number().min(1).max(100).optional(),
        search: z.string().trim().optional(),
        role: z.enum([Role.DRIVER, Role.WORKER]).optional(),
        workStatus: z.enum(WorkStatus).optional(),
        stationType: z.enum(StationType).optional(),
        sortBy: z.enum(["name", "role", "workStatus"]).default("name"),
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
      })
      .superRefine((data, ctx) => {
        if (data.role === Role.DRIVER && data.stationType) {
          ctx.addIssue({
            code: "custom",
            path: ["stationType"],
            message: "Station type hanya berlaku untuk worker.",
          });
        }
      }),
    getCurrentOutletAttendance: z.object({
      page: z.coerce.number().positive().optional(),
      pageSize: z.coerce.number().min(1).max(100).optional(),
      search: z.string().trim().optional(),
      role: z.enum([Role.DRIVER, Role.WORKER]).optional(),
      date: z.coerce.date().optional(),
      status: z.enum(AttendanceStatus).optional(),
      sortBy: z.enum(["name", "clockInAt", "clockOutAt"]).default("name"),
      sortOrder: z.enum(["asc", "desc"]).default("asc"),
    }),
  };

  static readonly Params = {
    employeeId: z.object({
      id: z.uuid(),
    }),
  };

  static readonly Body = {
    inviteEmployee: z.object({
      name: z.string().trim().min(3).max(100),
      email: z.email(),
      role: z.enum([Role.OUTLET_ADMIN, Role.WORKER, Role.DRIVER]),
    }),
    updateEmployee: z
      .object({
        name: z.string().trim().min(3).max(100).optional(),
        role: z.enum([Role.OUTLET_ADMIN, Role.WORKER, Role.DRIVER]).optional(),
      })
      .refine((data) => data.name !== undefined || data.role !== undefined, { error: "At least one field must be provided." }),
    assignEmployee: z.object({
      employeeId: z.uuid(),
      outletId: z.uuid(),
    }),
  };
}

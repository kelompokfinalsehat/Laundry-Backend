import z from "zod";
import { AccountStatus, Role, WorkStatus } from "../../../generated/prisma";

export class EmployeeValidation {
    static readonly Query = {
        getEmployees: z.object({
            page: z.coerce.number().positive().optional(),
            pageSize: z.coerce.number().positive().optional(),
            search: z.string().trim().optional(),
            role: z.enum(Role).optional(),
            accountStatus: z.enum(AccountStatus).optional(),
            workStatus: z.enum(WorkStatus).optional(),
            outletId: z.uuid().optional(),
            sortBy: z.enum(["name", "email", "role", "accountStatus", "createdAt"]).optional(),
            sortOrder: z.enum(["asc", "desc"]).optional()
        })
    }

    static readonly Params = {
        employeeId: z.object({
            id: z.uuid()
        })
    }

    static readonly Body = {
        inviteEmployee: z.object({
            name: z.string().trim().min(3).max(100),
            email: z.email(),
            role: z.enum(["OUTLET_ADMIN", "WORKER", "DRIVER"]),
            outletId: z.string()
        }),
        updateEmployee: z.object({
            name: z.string().trim().min(3).max(100).optional(),
            role: z.enum(["OUTLET_ADMIN", "WORKER", "DRIVER"]).optional()
        }),
        assignEmployee: z.object({
            employeeId: z.uuid(),
            outletId: z.string()
        })
    }
}
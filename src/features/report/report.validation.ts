import z from "zod";
import { Role, StationType } from "../../../generated/prisma";

export class ReportValidation {
  static readonly PARAMS = {};
  static readonly QUERY = {
    getSales: z.object({
      period: z.enum(["DAY", "MONTH", "YEAR"]).default("MONTH"),
      date: z.coerce.date().default(() => new Date()),
      month: z.coerce
        .number()
        .int()
        .min(1)
        .max(12)
        .default(() => new Date().getMonth() + 1),
      year: z.coerce
        .number()
        .int()
        .min(2025)
        .max(2100)
        .default(() => new Date().getFullYear()),
      outletId: z.uuid().optional(),
    }),
    getEmployeePeformance: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      role: z.enum([Role.DRIVER, Role.WORKER]).optional(),
      stationType: z.enum([StationType.WASHING, StationType.IRONING, StationType.PACKING]).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      outletId: z.uuid().optional(),
      sortBy: z.enum(["completedJobs", "name"]).default("completedJobs"),
      sortOrder: z.enum(["asc", "desc"]).default("desc")
    }).superRefine((data, ctx) => {
        if(data.role === Role.DRIVER && data.stationType){
            ctx.addIssue({
                code: "custom",
                path: ["stationType"],
                message: "Tipe station hanya dapat digunakan untuk worker."
            })
        }
        if(data.startDate && data.endDate && data.startDate > data.endDate){
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date tidak boleh sebelum start date."
            })
        }
    }),
  };
  static readonly BODY = {};
}

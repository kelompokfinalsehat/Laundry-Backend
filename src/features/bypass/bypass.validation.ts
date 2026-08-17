import z from "zod";
import { BypassStatus, StationType } from "../../../generated/prisma";

export class BypassValidation {
  static readonly QUERY = {
    getBypassRequests: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      status: z.enum(BypassStatus).optional(),
      stationType: z.enum(StationType).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["createdAt", "decidedAt"]).default("createdAt"),
      sortOrder: z.enum(["asc", "desc"]).default("desc")
    }),
  };
  static readonly PARAMS = {
    bypassId: z.object({
        id: z.uuid()
    })
  }
  static readonly BODY = {
    approve: z.object({
        password: z.string().min(1),
        problemNote: z.string().min(1)
    })
  }
}

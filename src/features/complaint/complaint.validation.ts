import z from "zod";
import { ComplaintCategory, ComplaintStatus } from "../../../generated/prisma";

export class ComplaintValidation {
  static readonly QUERY = {
    getComplaints: z.object({
      page: z.coerce.number().int().min(1).positive().optional(),
      pageSize: z.coerce.number().int().min(1).max(100).positive().optional(),
      search: z.string().trim().optional(),
      status: z.enum(ComplaintStatus).optional(),
      category: z.enum(ComplaintCategory).optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      sortBy: z.enum(["createdAt", "decidedAt"]).default('createdAt'),
      sortOrder: z.enum(["asc", "desc"]).default("desc")
    }).superRefine((data, ctx) => {
        if(data.startDate && data.endDate && data.endDate < data.startDate){
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "End date tidak boleh sebelum start date."
            })
        }
    }),
  };
  static readonly PARAMS = {
    complaintId: z.object({
        id: z.uuid()
    })
  };
  static readonly BODY = {
    decide: z.object({
        decision: z.enum([ComplaintStatus.APPROVED, ComplaintStatus.REJECTED]),
        responseNote: z.string().trim().min(1)
    })
  };
}

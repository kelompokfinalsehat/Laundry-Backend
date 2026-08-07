import z from "zod";

export class OutletValidation {
  static readonly QUERY = {
    getOutlets: z.object({
      page: z.coerce.number().positive().optional(),
      pageSize: z.coerce.number().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["name", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional()
    }),
  };
  static readonly PARAMS = {
    outletId: z.object({
        id: z.uuid()
    })
  };
  static readonly BODY = {
    createOutlet: z.object({
        name: z.string().trim().min(3).max(100),
        address: z.string().trim().min(10).max(255)
    }),
    updateOutlet: z.object({
        name: z.string().trim().min(3).max(100).optional(),
        address: z.string().trim().min(10).max(255).optional()
    }).refine(data => data.name !== undefined || data.address !== undefined, {error: "At least one field must be provided."})
  };
}

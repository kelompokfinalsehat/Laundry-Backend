import z from "zod";

export class LaundryItemValidation {
  static readonly QUERY = {
    getLaundryItems: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["name", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
  };
  static readonly PARAMS = {
    laundryItemId: z.object({
        id: z.uuid()
    })
  }
  static readonly BODY = {
    createLaundryItem: z.object({
        name: z.string().trim().min(2).max(100)
    }),
    updateLaundryItem: z.object({
        name: z.string().trim().min(2).max(100).optional()
    }).refine(data => data.name !== undefined, {error: "At least one field must be provided."})
  }
}

import z from "zod";

export class CustomerValidation {
  static readonly QUERY = {
    getCustomers: z.object({
      page: z.coerce.number().int().min(1).positive().optional(),
      pageSize: z.coerce.number().int().min(1).max(10).positive().optional(),
      search: z.string().trim().optional(),
      isEmailVerified: z.enum(["true", "false"]).transform(value => value === "true").optional(),
      sortBy: z.enum(["name", "email", "createdAt"]).default("name"),
      sortOrder: z.enum(["asc", "desc"]).default("asc")
    }),
  };
  static readonly PARAMS = {
    customerId: z.object({
        id: z.uuid()
    })
  }
}

import z from "zod";

export class OutletValidation {
  static readonly QUERY = {
    getOutlets: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["name", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
  };
  static readonly PARAMS = {
    outletId: z.object({
      id: z.uuid(),
    }),
  };
  static readonly BODY = {
    createOutlet: z.object({
      name: z.string().trim().min(3).max(100),
      address: z.string().trim().min(10).max(255),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
    updateOutlet: z
      .object({
        name: z.string().trim().min(3).max(100).optional(),
        address: z.string().trim().min(10).max(255).optional(),
        latitude: z.number().min(-90).max(90).optional(),
        longitude: z.number().min(-180).max(180).optional(),
      })
      .refine((data) => data.name !== undefined || data.address !== undefined || data.latitude !== undefined || data.longitude !== undefined, {
        error: "At least one field must be provided.",
      })
      .refine((data) => (data.latitude === undefined && data.longitude === undefined) || (data.latitude !== undefined && data.longitude !== undefined), {
        error: "Latitude dan longitude harus dikirim bersamaan.",
        path: ["latitude"],
      }),
  };
}

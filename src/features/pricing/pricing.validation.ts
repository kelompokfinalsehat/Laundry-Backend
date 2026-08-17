import z from "zod";

export class PricingValidation {
  static readonly PARAMS = {
    pricingId: z.object({
      id: z.uuid(),
    }),
  };
  static readonly BODY = {
    createOrUpdateLaundryPricing: z.object({
      pricePerKg: z.coerce.number().positive(),
    }),
    createShippingRate: z.object({
        maxDistanceMeters: z.coerce.number().int().positive(),
        price: z.coerce.number().int().positive()
    }),
    updateShippingRate: z.object({
        maxDistanceMeters: z.coerce.number().int().positive().optional(),
        price: z.coerce.number().int().positive().optional()
    }).refine(data => data.maxDistanceMeters !== undefined || data.price !== undefined, {error: "At least one field must be provided."})
  };
  static readonly QUERY = {
    getShippingRates: z.object({
      page: z.coerce.number().int().positive().optional(),
      pageSize: z.coerce.number().int().positive().optional(),
      search: z.string().trim().optional(),
      sortBy: z.enum(["price", "maxDistanceMeters", "createdAt"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
  };
}

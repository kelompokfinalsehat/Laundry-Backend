import z from "zod";
import { PricingValidation } from "./pricing.validation";

export type LaundryPricingBody = z.infer<typeof PricingValidation.BODY.createOrUpdateLaundryPricing>
export type ShippingRateQuery = z.infer<typeof PricingValidation.QUERY.getShippingRates>
export type CreateShippingRateBody = z.infer<typeof PricingValidation.BODY.createShippingRate>
export type UpdateShippingRateBody = z.infer<typeof PricingValidation.BODY.updateShippingRate>
import z from "zod";
import { LaundryItemValidation } from "./laundry-item.validation";

export type LaundryItemQuery = z.infer<typeof LaundryItemValidation.QUERY.getLaundryItems>
export type CreateLaundryItemBody = z.infer<typeof LaundryItemValidation.BODY.createLaundryItem>
export type UpdateLaundryItemBody = z.infer<typeof LaundryItemValidation.BODY.updateLaundryItem>
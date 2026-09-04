import z from "zod";
import { OutletValidation } from "./outlet.validation";

export type OutletQuery = z.infer<typeof OutletValidation.QUERY.getOutlets>
export type CreateOutletBody = z.infer<typeof OutletValidation.BODY.createOutlet>
export type UpdateOutletBody = z.infer<typeof OutletValidation.BODY.updateOutlet>
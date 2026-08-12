import z from "zod";
import { BypassValidation } from "./bypass.validation";

export type BypassQuery = z.infer<typeof BypassValidation.QUERY.getBypassRequests>
export type ApproveBypassBody = z.infer<typeof BypassValidation.BODY.approve>
export type QuantityDifference = {
    orderItemId: string,
    officialQuantity: number,
    submittedQuantity: number,
    difference: number
}
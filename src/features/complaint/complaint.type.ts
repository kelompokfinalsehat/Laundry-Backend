import z from "zod";
import { ComplaintValidation } from "./complaint.validation";

export type ComplaintQuery = z.infer<typeof ComplaintValidation.QUERY.getComplaints>
export type DecideComplaintBody = z.infer<typeof ComplaintValidation.BODY.decide>
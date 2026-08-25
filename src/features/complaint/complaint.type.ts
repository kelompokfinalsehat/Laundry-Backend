import z from "zod";
import { ComplaintValidation } from "./complaint.validation";
import { ComplaintStatus } from "../../../generated/prisma";

export type ComplaintQuery = z.infer<typeof ComplaintValidation.QUERY.getComplaints>
export type DecideComplaintBody = z.infer<typeof ComplaintValidation.BODY.decide>
export type DecideDTOParams = DecideComplaintBody & {
    id: string,
    handledBy: string
}
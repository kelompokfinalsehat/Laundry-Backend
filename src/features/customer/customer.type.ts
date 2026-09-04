import z from "zod";
import { CustomerValidation } from "./customer.validation";

export type CustomerQuery = z.infer<typeof CustomerValidation.QUERY.getCustomers>
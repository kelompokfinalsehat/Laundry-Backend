import z from "zod";
import { EmployeeValidation } from "./employee.validation";

export type EmployeeQuery = z.infer<typeof EmployeeValidation.Query.getEmployees>
export type InviteEmployeeBody = z.infer<typeof EmployeeValidation.Body.inviteEmployee>
export type UpdateEmployeeBody = z.infer<typeof EmployeeValidation.Body.updateEmployee>
export type AssignEmployeeBody = z.infer<typeof EmployeeValidation.Body.assignEmployee>
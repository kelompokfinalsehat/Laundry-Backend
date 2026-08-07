import { Request, Response } from "express";
import { validate } from "../../validations/validation";
import { EmployeeValidation } from "./employee.validation";
import { EmployeeService } from "./employee.service";
import { Message } from "../../constants/message.constant";
import { ResponseHelper } from "../../helpers/response.helper";

export class EmployeeController {
    static async getEmployees(req: Request, res: Response){
        const query = validate(EmployeeValidation.Query.getEmployees, req.query);
        const employees = await EmployeeService.getEmployees(query)
        return ResponseHelper.paginated(res, Message.FETCHED, employees.data, employees.meta)
    }
    static async getEmployeeById(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.getEmployeeById(id)
        return ResponseHelper.success(res, Message.FETCHED, employee)
    }
    static async inviteEmployee(req: Request, res: Response){
        const body = validate(EmployeeValidation.Body.inviteEmployee, req.body)
        const employee = await EmployeeService.inviteEmployee(body)
        return ResponseHelper.created(res, Message.INVITED, employee)
    }
    static async updateEmployee(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const body = validate(EmployeeValidation.Body.updateEmployee, req.body)
        const employee = await EmployeeService.updateEmployee(id, body)
        return ResponseHelper.success(res, Message.UPDATED, employee)
    }
    static async resendInvitation(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.resendInvitation(id)
        return ResponseHelper.success(res, "Invitation resend successfully.", employee)

    }
    static async activateEmployee(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.activateEmployee(id)
        return ResponseHelper.success(res, "Employee account activate successfully.", employee)
    }
    static async deactivateEmployee(req: Request, res: Response){
        const {id} = validate(EmployeeValidation.Params.employeeId, req.params)
        const employee = await EmployeeService.deactivateEmployee(id)
        return ResponseHelper.success(res, "Employee account deactivate successfully", employee)
    }
    static async assignEmployee(req: Request, res: Response){
        const body = validate(EmployeeValidation.Body.assignEmployee, req.body)
        const employee = await EmployeeService.assignEmployee(body)
        return ResponseHelper.success(res, "Employee assigned successfully.", employee)
    }
}
import { EmployeeRepository } from "./employee.repository";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { Role } from "../../../generated/prisma";

export class EmployeeHelper {
    static async findEmployeeByIdOrThrow(id: string){
        const employee = await EmployeeRepository.findById(id)
        if(!employee) throw new ResponseError('RESOURCE_NOT_FOUND', 'Employee not found.')
        if(employee.role === Role.OUTLET_ADMIN && !employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
        return employee
    }
}
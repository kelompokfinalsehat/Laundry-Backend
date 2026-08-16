import { EmployeeRepository } from "./employee.repository";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class EmployeeHelper {
    static async findEmployeeByIdOrThrow(id: string){
        const employee = await EmployeeRepository.findById(id)
        if(!employee) throw new ResponseError('RESOURCE_NOT_FOUND', 'Employee not found.')
        return employee
    }
}
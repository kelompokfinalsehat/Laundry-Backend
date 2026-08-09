import { AccountStatus, Prisma, WorkStatus } from "../../../generated/prisma";
import { ResponseError } from "../../utils/response-error.utils";
import { OutletRepository } from "../outlet/outlet.repository";
import { EmployeeRepository } from "./employee.repository";
import { AssignEmployeeBody, EmployeeQuery, InviteEmployeeBody, UpdateEmployeeBody } from "./employee.type";

export class EmployeeService {
    private static async findEmployeeOrThrow(id: string){
        const employee = await EmployeeRepository.findById(id)
        if (!employee) throw new ResponseError("RESOURCE_NOT_FOUND", 'Employee not found.');
        return employee
    }
  static async getEmployees(query: EmployeeQuery) {
    return await EmployeeRepository.findAll(query);
  }
  static async getEmployeeById(id: string) {
    const employee = await this.findEmployeeOrThrow(id)
    return employee;
  }
  static async inviteEmployee(body: InviteEmployeeBody) {
    const existingEmployee = await EmployeeRepository.findByEmail(body.email);
    if (existingEmployee)
      throw new ResponseError("CONFLICT", "Employee email already exist.");
    const outlet = await OutletRepository.findById(body.outletId);
    if (!outlet)
      throw new ResponseError("RESOURCE_NOT_FOUND", "Outlet not found.");
    const employeeData = {
      name: body.name,
      email: body.email,
      role: body.role,
      accountStatus: AccountStatus.INVITED,
      currentOutletId: body.outletId,
    };
    const employee = await EmployeeRepository.create(employeeData);
    /**
     * TODO
     *
     * Generate invitation token
     * Send invitation email
     *
     * Akan diintegrasikan setelah
     * Feature 1 selesai.
     */
    return employee
  }
  static async updateEmployee(id: string, body: UpdateEmployeeBody){
    const {name, role} = body
    await this.findEmployeeOrThrow(id)
    const updateData: Prisma.EmployeeUpdateInput = {}
    if(name) updateData.name = name
    if(role) updateData.role = role
    return await EmployeeRepository.update(id, updateData)
  }
  static async resendInvitation(id: string){
    const employee = await this.findEmployeeOrThrow(id)
    if(employee.accountStatus !== AccountStatus.INVITED) throw new ResponseError('CONFLICT')
    /**
    * TODO Feature 1
    *
    * Revoke previous invitation
    * Generate new invitation token
    * Send invitation email
    */
    return null
  }
  static async activateEmployee(id: string){
    const employee = await this.findEmployeeOrThrow(id)
    if(employee.accountStatus !== AccountStatus.INACTIVE) throw new ResponseError('CONFLICT', "Account already active.")
    const updateData: Prisma.EmployeeUpdateInput = {accountStatus: AccountStatus.ACTIVE}
    return EmployeeRepository.update(id, updateData)
  }
  static async deactivateEmployee(id: string){
    const employee = await this.findEmployeeOrThrow(id)
    if(employee.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError('CONFLICT', "Account already inactive.")
    if(employee.workStatus === WorkStatus.BUSY) throw new ResponseError('CONFLICT', 'Employee is currently busy.')
   const updateData: Prisma.EmployeeUpdateInput = {accountStatus: AccountStatus.INACTIVE}
   return EmployeeRepository.update(id, updateData)
  }
  static async assignEmployee(body: AssignEmployeeBody){
    const {employeeId, outletId} = body
    const employee = await this.findEmployeeOrThrow(employeeId)
    if(employee.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError('CONFLICT', "Account must be active.")
    if(employee.workStatus === WorkStatus.BUSY) throw new ResponseError('CONFLICT', 'Employee is currently busy.')
    const outlet = await OutletRepository.findById(outletId)
    if(!outlet) throw new ResponseError('RESOURCE_NOT_FOUND', 'Outlet not found.')
    if(employee.currentOutletId === outletId) throw new ResponseError('CONFLICT', 'Employee already assigned to this outlet.')
    const updateData: Prisma.EmployeeUpdateInput = {currentOutlet: {connect: {id: outletId}}}
    return EmployeeRepository.update(employeeId, updateData)
  }
}

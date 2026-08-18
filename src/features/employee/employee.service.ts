import {
  AccountStatus,
  Prisma,
  Role,
  WorkStatus,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { AuthTokenIssuer } from "../mailers/mailer.helpers";
import { OutletRepository } from "../outlet/outlet.repository";
import { EmployeeHelper } from "./employee.helper";
import { EmployeeRepository } from "./employee.repository";
import {
  AssignEmployeeBody,
  EmployeeQuery,
  InviteEmployeeBody,
  OutletTeamQuery,
  UpdateEmployeeBody,
} from "./employee.type";

export class EmployeeService {
  static async getEmployees(query: EmployeeQuery) {
    return await EmployeeRepository.findAll(query);
  }
  static async getEmployeeById(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    return employee;
  }
  static async getCurrentOutletEmployee(
    adminOutletId: string,
    query: OutletTeamQuery,
  ) {
    const employee =
      await EmployeeHelper.findEmployeeByIdOrThrow(adminOutletId);
    if (employee.role !== Role.OUTLET_ADMIN)
      throw new ResponseError(
        "FORBIDDEN",
        "Hanya outlet admin yang boleh mengakses endpoint ini.",
      );
    if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
    return EmployeeRepository.findOutletTeam(query, employee.currentOutletId);
  }
  static async inviteEmployee(body: InviteEmployeeBody) {
    const existingEmployee = await EmployeeRepository.findByEmail(body.email);
    if (existingEmployee)
      throw new ResponseError("CONFLICT", "Email employee sudah ada.");
    const outlet = await OutletRepository.findById(body.outletId);
    if (!outlet)
      throw new ResponseError("RESOURCE_NOT_FOUND", "Outlet tidak ditemukan.");
    const employeeData = {
      name: body.name,
      email: body.email,
      role: body.role,
      accountStatus: AccountStatus.INVITED,
      currentOutletId: body.outletId,
    };
    const employee = await EmployeeRepository.create(employeeData);
    await AuthTokenIssuer.issueEmployeInvitationToken(
      employee.id,
      employee.email,
      employee.name,
    );
    return employee;
  }
  static async updateEmployee(id: string, body: UpdateEmployeeBody) {
    const { name, role } = body;
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    const updateData: Prisma.EmployeeUpdateInput = {};
    if (name) updateData.name = name;
    if (role) {
      if (employee.workStatus === WorkStatus.BUSY)
        throw new ResponseError("CONFLICT", "Employee sedang sibuk.");
      updateData.role = role;
    }
    return await EmployeeRepository.update(id, updateData);
  }
  static async resendInvitation(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    if (employee.accountStatus !== AccountStatus.INVITED)
      throw new ResponseError(
        "CONFLICT",
        "Akun employee tidak sedang menunggu undangan.",
      );
    await AuthTokenIssuer.issueEmployeInvitationToken(
      employee.id,
      employee.email,
      employee.name,
    );
    return employee;
  }
  static async activateEmployee(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    if (employee.accountStatus !== AccountStatus.INACTIVE)
      throw new ResponseError("CONFLICT", "Akun sudah aktif.");
    const updateData: Prisma.EmployeeUpdateInput = {
      accountStatus: AccountStatus.ACTIVE,
    };
    return EmployeeRepository.update(id, updateData);
  }
  static async deactivateEmployee(id: string) {
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(id);
    if (employee.accountStatus !== AccountStatus.ACTIVE)
      throw new ResponseError("CONFLICT", "Akun sudah tidak aktif.");
    if (employee.workStatus === WorkStatus.BUSY)
      throw new ResponseError("CONFLICT", "Employee sedang sibuk.");
    const updateData: Prisma.EmployeeUpdateInput = {
      accountStatus: AccountStatus.INACTIVE,
    };
    return EmployeeRepository.update(id, updateData);
  }
  static async assignEmployee(body: AssignEmployeeBody) {
    const { employeeId, outletId } = body;
    const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId);
    if (employee.accountStatus !== AccountStatus.ACTIVE)
      throw new ResponseError("CONFLICT", "Akun harus aktif.");
    if (employee.workStatus === WorkStatus.BUSY)
      throw new ResponseError("CONFLICT", "Employee sedang sibuk.");
    const outlet = await OutletRepository.findById(outletId);
    if (!outlet)
      throw new ResponseError("RESOURCE_NOT_FOUND", "Outlet tidak ditemukan.");
    if (employee.currentOutletId === outletId)
      throw new ResponseError(
        "CONFLICT",
        "Employee sudah ditempatkan pada outlet ini.",
      );
    const updateData: Prisma.EmployeeUpdateInput = {
      currentOutlet: { connect: { id: outletId } },
    };
    return EmployeeRepository.update(employeeId, updateData);
  }
}

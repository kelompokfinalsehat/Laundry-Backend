import { AccountStatus, Role } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type { EmployeeProfileEntity, EmployeeProfileResponse } from "./employeeProfile.types";

export class EmployeeProfileHelper {
  static assertEmployee(employee: EmployeeProfileEntity | null): asserts employee is EmployeeProfileEntity {
    if (!employee) {
      throw new ResponseError("RESOURCE_NOT_FOUND", "Akun tidak ditemukan!");
    }

    if (employee.accountStatus !== AccountStatus.ACTIVE) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    }

    if (employee.role !== Role.WORKER && employee.role !== Role.DRIVER) {
      throw new ResponseError("FORBIDDEN");
    }
  }

  static buildProfileResponse(employee: EmployeeProfileEntity) {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      profilePhotoUrl: employee.profilePhotoUrl,
      role: employee.role,
      workStatus: employee.workStatus,
      currentOutletId: employee.currentOutletId,
      currentOutlet: employee.currentOutlet,
    };
  }
}

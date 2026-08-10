import {
  AccountStatus,
  DriverAssignmentStatus,
  Role,
  type DriverAssignment,
  type Employee,
  type WorkStatus,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/response-error.utils";

export class DriverChecker {
  static verifyDriver(driver: Employee | null): asserts driver is Employee {
    if (!driver) {
      throw new ResponseError("RESOURCE_NOT_FOUND", "Akun tidak ditemukan");
    }
    if (driver.accountStatus !== AccountStatus.ACTIVE) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE", "Akun anda tidak aktif!");
    }
    if (driver.role !== Role.DRIVER) {
      throw new ResponseError("FORBIDDEN", "Role anda tidak diijinkan mengakses fitur!");
    }
    if (driver.currentOutletId === null) {
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Akun belum terdaftar di outlet, silahkan hubungi admin outlet!",
      );
    }
  }

  static verifyWorkStatus(driver: Employee, expectedWorkStatus: WorkStatus) {
    if (driver.workStatus !== expectedWorkStatus) {
      throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    }
  }

  static verifyAssignmentToClaim(
    assignment: DriverAssignment | null,
    driverOutletId: string,
  ): asserts assignment is DriverAssignment {
    if (!assignment) {
      throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas dengan ID tersebut tidak ditemukan!");
    }
    if (assignment.outletId !== driverOutletId) {
      throw new ResponseError("OUTLET_SCOPE_FORBIDDEN");
    }
    if (assignment.status !== DriverAssignmentStatus.QUEUED || assignment.driverId !== null) {
      throw new ResponseError("ASSIGNMENT_ALREADY_CLAIMED");
    }
  }
}


import {
  AccountStatus,
  Role,
  WorkStatus,
  type Employee,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/response-error.utils";

export class AttendanceChecker {
  static verifyClockIn(
    employee: Employee | null,
  ): asserts employee is Employee {
    if (!employee) {
      throw new ResponseError("RESOURCE_NOT_FOUND", "Akun tidak ditemukan");
    }
    if (employee.accountStatus !== AccountStatus.ACTIVE) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE", "Akun anda belum aktif");
    }
    if (employee.role !== Role.DRIVER && employee.role !== Role.WORKER) {
      throw new ResponseError("FORBIDDEN");
    }
    if (employee.currentOutletId === null) {
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Karyawan belum diinput ke dalam outlet, hubungi admin outlet",
      );
    }
    if (
      employee.workStatus !== WorkStatus.OFF_DUTY &&
      employee.workStatus !== null
    ) {
      throw new ResponseError("INVALID_STATE_TRANSITION");
    }
  }
}

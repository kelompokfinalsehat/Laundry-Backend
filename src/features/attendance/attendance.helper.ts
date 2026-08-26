import { AccountStatus, Role, WorkStatus, type Attendance, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class AttendanceHelper {
  // CHECKER UMUM dipakai untuk beberapa Function
  static assertEmployee(employee: Employee | null): asserts employee is Employee & { currentOutletId: string } {
    if (!employee) throw new ResponseError("RESOURCE_NOT_FOUND", "Akun tidak ditemukan!");
    if (employee.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (employee.role !== Role.DRIVER && employee.role !== Role.WORKER) throw new ResponseError("FORBIDDEN");
    if (employee.currentOutletId === null) throw new ResponseError("INVALID_STATE_TRANSITION", "Anda tidak terdaftar di outlet aktif manapun!");
  }

  static assertWorkStatus(employee: Employee, expectedWorkStatus: (WorkStatus | null)[]) {
    // Parameter ExpectedWorkStatus -> Array flexible mengecek WorkStatus sesuai yg diijinkan
    if (!expectedWorkStatus.includes(employee.workStatus)) throw new ResponseError("INVALID_STATE_TRANSITION");
  }

  // DATE-HELPER
  static getAttendanceDateWIB(date: Date = new Date()) {
    const dateWIB = date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
    return new Date(`${dateWIB}T00:00:00.000Z`);
  } // Mendapat Tanggal YYYY-MM-DD

  static getMonthRange(period: string) {
    const year = Number(period.slice(0, 4)); // YYYY
    const month = Number(period.slice(5, 7)); // MM pasti! bukan 3 / 5 doang
    const startDate = new Date(Date.UTC(year, month - 1, 1)); // index month!
    const endDate = new Date(Date.UTC(year, month, 1));
    return { startDate, endDate };
  }
  static getDaysInMonth(period: string) {
    const year = Number(period.slice(0, 4));
    const month = Number(period.slice(5, 7));
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }
  static buildAttendanceActions({
    workStatus,
    todayAttendance,
    openAttendance,
    hasActiveAssignment,
  }: {
    workStatus: WorkStatus | null;
    todayAttendance: Attendance | null;
    openAttendance: Attendance | null;
    hasActiveAssignment: boolean;
  }) {
    const isTodayComplete = !!todayAttendance?.clockInAt && !!todayAttendance?.clockOutAt;

    const canClockIn =
      !openAttendance &&
      (!todayAttendance || isTodayComplete) && // ← allow kalau today sudah complete
      (workStatus === WorkStatus.OFF_DUTY || workStatus === null);

    const canClockOut = !!openAttendance && !hasActiveAssignment && workStatus === WorkStatus.AVAILABLE;

    return { canClockIn, canClockOut };
  }
}

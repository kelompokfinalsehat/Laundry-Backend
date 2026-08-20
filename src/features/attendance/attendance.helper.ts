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

  static getThisWeek() {
    const today = this.getAttendanceDateWIB();
    const dayIndex = today.getUTCDay();
    let daysToMonday: number;
    if (dayIndex === 0) {
      daysToMonday = 6;
    } else {
      daysToMonday = dayIndex - 1;
    }

    const monday = new Date(today);
    monday.setUTCDate(today.getUTCDate() - daysToMonday);

    const sunday = new Date(monday);
    sunday.setUTCDate(monday.getUTCDate() + 6);

    return { gte: monday, lte: sunday };
  }

  static getThisMonth() {
    const today = this.getAttendanceDateWIB();

    const currentYear = today.getUTCFullYear();
    const currentMonth = today.getUTCMonth();

    const firstDayOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
    const lastDayOfMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 0));

    return { gte: firstDayOfMonth, lte: lastDayOfMonth };
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
    const canClockIn = !openAttendance && !todayAttendance && (workStatus === WorkStatus.OFF_DUTY || workStatus === null);
    const canClockOut = !!openAttendance && !hasActiveAssignment && workStatus === WorkStatus.AVAILABLE;

    return { canClockIn, canClockOut };
  }
}

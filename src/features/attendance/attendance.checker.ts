import { AccountStatus, Role, WorkStatus, type Attendance, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class AttendanceChecker {
  //checker umum dipake semua
  static verifyEmployee(employee: Employee | null): asserts employee is Employee {
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
  }

  static verifyWorkStatus(employee: Employee, expected: (WorkStatus | null)[]) {
    if (!expected.includes(employee.workStatus)) {
      throw new ResponseError("INVALID_STATE_TRANSITION", "Status kerja tidak sesuai");
    }
  }
  // checker untuk clockin
  static verifyNoOpenAttendance(openAttendance: Attendance | null) {
    if (openAttendance) {
      throw new ResponseError("INVALID_STATE_TRANSITION", "Masih ada absensi yang belum clock-out!");
    }
  }

  // checker untuk claim job
  static verifyActiveAttendanceToday(attendance: Attendance | null) {
    if (!attendance || attendance.clockInAt === null || attendance.clockOutAt !== null) {
      throw new ResponseError(
        "ATTENDANCE_NOT_CLOCKED_IN",
        "Anda harus melakukan clockin hari ini sebelum mengambil tugas!",
      );
    }
  }

  // checker untuk attendance me Status
  //attendanceActions diperlukan untuk kirim respons agar frontend tahu mengatur button
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
    const isOffDuty = workStatus === WorkStatus.OFF_DUTY || workStatus === null;
    const canClockIn = isOffDuty && !todayAttendance && !openAttendance;

    const isAvailable = workStatus === WorkStatus.AVAILABLE;
    const hasOpenAttendance = Boolean(openAttendance?.clockInAt) && openAttendance?.clockOutAt === null;
    const canClockOut = isAvailable && hasOpenAttendance && !hasActiveAssignment;
    return { canClockIn, canClockOut };
  }
}

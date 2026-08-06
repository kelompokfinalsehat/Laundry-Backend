import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/response-error.utils";
import { AttendanceChecker } from "./attendance.checker";
import { getAttendanceDateWIB } from "./attendance.date-helper";
import { EmployeeRepository } from "./employee.repository";
import { AttendanceRepository } from "./attendance.repository";
import { WorkStatus } from "../../../generated/prisma";

export class AttendanceService {
  static async clockIn(payload: { id: string }) {
    const employee = await EmployeeRepository.findActiveById(payload.id);

    AttendanceChecker.verifyEmployee(employee);
    AttendanceChecker.verifyWorkStatus(employee, [WorkStatus.OFF_DUTY, null]);

    const attendanceDate = getAttendanceDateWIB();
    const existingAttendance = await AttendanceRepository.findTodayAttendance(
      employee.id,
      attendanceDate,
    );

    if (existingAttendance) {
      throw new ResponseError(
        "ATTENDANCE_ALREADY_CLOCKED_IN",
        "Anda sudah melakukan clock-in hari ini",
      );
    }

    const attendance = await prisma.$transaction(async (tx) => {
      const newAttendance = await AttendanceRepository.create(
        {
          employeeId: employee.id,
          outletId: employee.currentOutletId!,
          attendanceDate,
          clockInAt: new Date(),
        },
        tx,
      );

      await AttendanceRepository.updateEmployeeWorkStatus(employee.id, WorkStatus.AVAILABLE, tx);

      return newAttendance;
    });
    return attendance;
  }

  static async clockOut(payload: { id: string }) {
    const employee = await EmployeeRepository.findActiveById(payload.id);

    AttendanceChecker.verifyEmployee(employee);
    AttendanceChecker.verifyWorkStatus(employee, [WorkStatus.AVAILABLE]);

    const attendanceDate = getAttendanceDateWIB();
    const existingAttendance = await AttendanceRepository.findTodayAttendance(
      employee.id,
      attendanceDate,
    );
    if (!existingAttendance) {
      throw new ResponseError("ATTENDANCE_NOT_CLOCKED_IN", "Anda belum melakukan clock-in");
    }
    if (existingAttendance.clockOutAt !== null) {
      throw new ResponseError("INVALID_STATE_TRANSITION", "Anda sudah melakukan clock-out!");
    }

    const existingAssignment = await AttendanceRepository.findActiveAssigment(
      employee.id,
      employee.role,
    );
    if (existingAssignment) {
      throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS", "Anda masih memiliki tugas aktif!");
    }

    const attendance = await prisma.$transaction(async (tx) => {
      const updateAttendance = await AttendanceRepository.updateClockOut(
        existingAttendance.id,
        new Date(),
        tx,
      );

      await AttendanceRepository.updateEmployeeWorkStatus(employee.id, WorkStatus.OFF_DUTY, tx);

      return updateAttendance;
    });

    return attendance;
  }
}

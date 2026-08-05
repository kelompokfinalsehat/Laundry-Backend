import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/response-error.utils";
import { AttendanceChecker } from "./attendance.checker";
import { AttendanceDateWIB } from "./attendance.date-helper";
import { EmployeeRepository } from "./employee.repository";
import { AttendanceRepository } from "./attendance.repository";
import { WorkStatus } from "../../../generated/prisma";

export class AttendanceService {
  static async clockIn(payload: { id: string }) {
    const employee = await EmployeeRepository.findActiveById(payload.id);

    AttendanceChecker.verifyClockIn(employee);

    const attendanceDate = AttendanceDateWIB();
    const existingAttendance = await AttendanceRepository.isClockInAlready(
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

      await AttendanceRepository.updateEmployeeWorkStatus(
        employee.id,
        WorkStatus.AVAILABLE,
        tx,
      );

      return newAttendance;
    });
    return attendance;
  }
}

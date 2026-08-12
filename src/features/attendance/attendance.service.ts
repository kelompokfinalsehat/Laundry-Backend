import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/response-error.utils";
import { AttendanceChecker } from "./attendance.checker";
import { getAttendanceDateWIB, getBulanIni, getMingguIni } from "./attendance.date-helper";
import { EmployeeRepository } from "./employee.repository";
import { AttendanceRepository } from "./attendance.repository";
import { WorkStatus, type Prisma } from "../../../generated/prisma";
import type { AttendanceHistoryInput } from "./attendance.validation";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";

export class AttendanceService {
  static async clockIn(payload: { id: string }) {
    const employee = await EmployeeRepository.findById(payload.id);

    AttendanceChecker.verifyEmployee(employee);
    const openAttendance = await AttendanceRepository.findOpenAttendance(employee.id);
    AttendanceChecker.verifyNoOpenAttendance(openAttendance);
    AttendanceChecker.verifyWorkStatus(employee, [WorkStatus.OFF_DUTY, null]);

    const attendanceDate = getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance(employee.id, attendanceDate);

    if (todayAttendance) {
      throw new ResponseError("ATTENDANCE_ALREADY_CLOCKED_IN", "Anda sudah melakukan clock-in hari ini");
    }

    const createAttendance = await prisma.$transaction(async (tx) => {
      const newAttendance = await AttendanceRepository.createAttendance(
        {
          employeeId: employee.id,
          outletId: employee.currentOutletId!,
          attendanceDate,
          clockInAt: new Date(),
        },
        tx,
      );

      await EmployeeRepository.updateWorkStatus(employee.id, WorkStatus.AVAILABLE, tx);

      return newAttendance;
    });
    return createAttendance;
  }

  static async clockOut(payload: { id: string }) {
    const employee = await EmployeeRepository.findById(payload.id);

    AttendanceChecker.verifyEmployee(employee);
    const openAttendance = await AttendanceRepository.findOpenAttendance(employee.id);
    if (!openAttendance) {
      throw new ResponseError("ATTENDANCE_NOT_CLOCKED_IN", "Anda belum melakukan clockin!");
    }
    const activeAssignment = await AttendanceRepository.findEmployeeActiveAssigment(employee.id, employee.role);
    if (activeAssignment) {
      throw new ResponseError("CLOCK_OUT_BLOCKED", "Selesaikan Tugas terlebih dahulu!");
    }
    AttendanceChecker.verifyWorkStatus(employee, [WorkStatus.AVAILABLE]);

    const closedAttendance = await prisma.$transaction(async (tx) => {
      const updatedAttendance = await AttendanceRepository.closeAttendance(openAttendance.id, new Date(), tx);
      await EmployeeRepository.updateWorkStatus(employee.id, WorkStatus.OFF_DUTY, tx);
      return updatedAttendance;
    });

    return closedAttendance;
  }
  static async getHistory({ payload, query }: { payload: { id: string } } & AttendanceHistoryInput) {
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;

    const where: Prisma.AttendanceWhereInput = { employeeId: payload.id };

    // checker untuk filtering
    if (query.period === "THIS_WEEK") {
      where.attendanceDate = getMingguIni();
    }
    if (query.period === "THIS_MONTH") {
      where.attendanceDate = getBulanIni();
    }

    const totalItems = await prisma.attendance.count({ where });

    const attendanceHistory = await prisma.attendance.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: query.sortOrder },
    });

    const meta = makePaginationMeta({ page: query.page, limit: query.limit, totalItems });

    return { data: attendanceHistory, meta };
  }

  static async getMyAttendanceStatus({ payload }: { payload: { id: string } }) {
    const employee = await EmployeeRepository.findById(payload.id);
    AttendanceChecker.verifyEmployee(employee);
    const attendanceDate = getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance(employee.id, attendanceDate);
    const openAttendance = await AttendanceRepository.findOpenAttendance(employee.id);
    const activeAssignment = await AttendanceRepository.findEmployeeActiveAssigment(employee.id, employee.role);

    const { canClockIn, canClockOut } = AttendanceChecker.buildAttendanceActions({
      workStatus: employee.workStatus,
      todayAttendance,
      openAttendance,
      hasActiveAssignment: Boolean(activeAssignment),
    });

    return { workStatus: employee.workStatus, attendanceDate, canClockIn, canClockOut };
  }
}

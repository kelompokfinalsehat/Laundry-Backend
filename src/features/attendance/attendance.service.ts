import { prisma } from "../../configs/prisma-client.config";
import { EmployeeRepository } from "../employee/employee.repository";
import { AttendanceRepository } from "./attendance.repository";
import { WorkStatus, type Prisma } from "../../../generated/prisma";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { AttendanceHelper } from "./attendance.helper";
import type { AttendanceHistoryInput } from "./attendance.types";

export class AttendanceService {
  static async clockIn(employeeId: string) {
    const employee = await EmployeeRepository.findById(employeeId);
    AttendanceHelper.assertEmployee(employee);
    const openAttendance = await AttendanceRepository.findOpenAttendance(employee.id);
    if (openAttendance) throw new ResponseError("ATTENDANCE_STILL_OPEN");
    const attendanceDate = AttendanceHelper.getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance({ employeeId: employee.id, attendanceDate: attendanceDate });
    if (todayAttendance) throw new ResponseError("ATTENDANCE_ALREADY_CLOCKED_IN");
    if (employee.workStatus !== WorkStatus.OFF_DUTY && employee.workStatus !== null) throw new ResponseError("INVALID_STATE_TRANSITION");
    return await AttendanceRepository.clockInTransaction({
      employeeId: employee.id,
      outletId: employee.currentOutletId,
      attendanceDate: attendanceDate,
      clockInAt: new Date(),
    });
  }

  static async clockOut(employeeId: string) {
    const employee = await EmployeeRepository.findById(employeeId);
    AttendanceHelper.assertEmployee(employee);

    //Cari absen yang masih gantung (belum clock out), termasuk bukan todayAttendance
    const openAttendance = await AttendanceRepository.findOpenAttendance(employee.id);
    if (!openAttendance) throw new ResponseError("ATTENDANCE_NOT_CLOCKED_IN");
    const activeAssignment = await AttendanceRepository.findActiveAssignment({ employeeId: employee.id, role: employee.role });
    if (activeAssignment) throw new ResponseError("CLOCK_OUT_BLOCKED");
    if (employee.workStatus !== WorkStatus.AVAILABLE) throw new ResponseError("INVALID_STATE_TRANSITION");
    return await AttendanceRepository.clockOutTransaction({ attendanceId: openAttendance.id, employeeId: employee.id });
  }

  static async getHistory({ employeeId, query }: { employeeId: string; query: AttendanceHistoryInput["query"] }) {
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;
    const where: Prisma.AttendanceWhereInput = { employeeId };
    // checker untuk filtering
    if (query.period === "THIS_WEEK") where.attendanceDate = AttendanceHelper.getThisWeek();
    if (query.period === "THIS_MONTH") where.attendanceDate = AttendanceHelper.getThisMonth();
    const totalItems = await prisma.attendance.count({ where });
    const attendanceHistory = await prisma.attendance.findMany({ where, skip, take, orderBy: { attendanceDate: query.sortOrder } });
    const meta = makePaginationMeta({ page: query.page, limit: query.limit, totalItems });
    return { data: attendanceHistory, meta };
  }

  static async getAttendanceStatus(employeeId: string) {
    const employee = await EmployeeRepository.findById(employeeId);
    AttendanceHelper.assertEmployee(employee);
    const attendanceDate = AttendanceHelper.getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance({ employeeId: employee.id, attendanceDate: attendanceDate });
    const openAttendance = await AttendanceRepository.findOpenAttendance(employee.id);
    const activeAssignment = await AttendanceRepository.findActiveAssignment({ employeeId: employee.id, role: employee.role });
    const { canClockIn, canClockOut } = AttendanceHelper.buildAttendanceActions({
      workStatus: employee.workStatus,
      todayAttendance: todayAttendance,
      openAttendance: openAttendance,
      hasActiveAssignment: Boolean(activeAssignment),
    });
    const currentAttendance = openAttendance ?? todayAttendance;
    return {
      workStatus: employee.workStatus,
      attendanceDate: currentAttendance?.attendanceDate ?? null,
      clockInAt: currentAttendance?.clockInAt ?? null,
      clockOutAt: currentAttendance?.clockOutAt ?? null,
      canClockIn: canClockIn,
      canClockOut: canClockOut,
    };
  }
}

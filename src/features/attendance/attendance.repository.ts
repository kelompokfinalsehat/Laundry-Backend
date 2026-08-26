import { DriverAssignmentStatus, Role, WorkerAssignmentStatus, WorkStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type { AttendanceHistoryPaginated, ClockInInput } from "./attendance.types";

export class AttendanceRepository {
  static async findOpenAttendance(employeeId: string) {
    return await prisma.attendance.findFirst({
      where: { employeeId, clockInAt: { not: null }, clockOutAt: null },
      orderBy: [{ attendanceDate: "desc" }, { createdAt: "desc" }],
      // mencari open Attendance terbaru digunakan untuk clockIn dan clockOut.
    });
  }
  static async findTodayAttendance({ employeeId, attendanceDate }: { employeeId: string; attendanceDate: Date }) {
    return await prisma.attendance.findUnique({ where: { employeeId_attendanceDate: { employeeId, attendanceDate } } });
  }

  static async clockInTransaction({ employeeId, outletId, attendanceDate, clockInAt }: ClockInInput) {
    return prisma.$transaction(async (tx) => {
      const createAttendance = await tx.attendance.create({
        data: { employeeId, outletId, attendanceDate: attendanceDate, clockInAt: clockInAt },
        select: { id: true, employeeId: true, outletId: true, attendanceDate: true, clockInAt: true },
      });
      const updateWorkStatus = await tx.employee.updateMany({
        where: { id: employeeId, OR: [{ workStatus: WorkStatus.OFF_DUTY }, { workStatus: null }] },
        data: { workStatus: WorkStatus.AVAILABLE },
      });
      if (updateWorkStatus.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      return createAttendance;
    });
  }

  static async findActiveAssignment({ employeeId, role }: { employeeId: string; role: Role }) {
    switch (role) {
      case Role.DRIVER:
        return await prisma.driverAssignment.findFirst({
          where: { driverId: employeeId, status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] } },
          select: { id: true },
        });
      case Role.WORKER:
        return await prisma.workerAssignment.findFirst({
          where: {
            workerId: employeeId,
            status: { in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS, WorkerAssignmentStatus.ON_HOLD_BYPASS] },
          },
          select: { id: true },
        });
      default:
        return null;
    }
  }

  static async clockOutTransaction({ attendanceId, employeeId }: { attendanceId: string; employeeId: string }) {
    return prisma.$transaction(async (tx) => {
      const closeAttendance = await tx.attendance.update({
        where: { id: attendanceId, employeeId: employeeId, clockOutAt: null },
        data: { clockOutAt: new Date() },
        select: { id: true, employeeId: true, outletId: true, attendanceDate: true, clockOutAt: true },
      });
      const updateWorkStatus = await tx.employee.updateMany({
        where: { id: employeeId, workStatus: WorkStatus.AVAILABLE },
        data: { workStatus: WorkStatus.OFF_DUTY },
      });
      if (updateWorkStatus.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION");
      return closeAttendance;
    });
  }

  static async findAttendancePaginated({ where, skip, take, sortOrder }: AttendanceHistoryPaginated) {
    return prisma.$transaction([prisma.attendance.count({ where }), prisma.attendance.findMany({ where, skip, take, orderBy: { attendanceDate: sortOrder } })]);
  }
}

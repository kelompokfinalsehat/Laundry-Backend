import {
  DriverAssignmentStatus,
  Prisma,
  Role,
  WorkerAssignmentStatus,
  WorkStatus,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";

export class AttendanceRepository {
  static async findTodayAttendance(employeeId: string, attendanceDate: Date) {
    return await prisma.attendance.findFirst({
      where: { employeeId, attendanceDate },
    });
  }
  static async create(
    data: {
      employeeId: string;
      outletId: string;
      attendanceDate: Date;
      clockInAt?: Date;
    },
    tx: Prisma.TransactionClient,
  ) {
    const newAttendance = await tx.attendance.create({
      data,
    });

    return newAttendance;
  }

  static async updateEmployeeWorkStatus(
    employeeId: string,
    workStatus: WorkStatus,
    tx: Prisma.TransactionClient,
  ) {
    const updateEmployee = await tx.employee.update({
      where: { id: employeeId },
      data: { workStatus },
    });
    return updateEmployee;
  }

  static async findActiveAssigment(employeeId: string, role: Role) {
    if (role === Role.DRIVER) {
      return await prisma.driverAssignment.findFirst({
        where: {
          driverId: employeeId,
          status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] },
        },
      });
    } else if (role === Role.WORKER) {
      return await prisma.workerAssignment.findFirst({
        where: {
          workerId: employeeId,
          status: { in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS] },
        },
      });
    } else {
      return null;
    }
  }

  static async updateClockOut(
    attendanceId: string,
    clockOutAt: Date,
    tx: Prisma.TransactionClient,
  ) {
    return await tx.attendance.update({
      where: { id: attendanceId },
      data: { clockOutAt: clockOutAt },
    });
  }
}

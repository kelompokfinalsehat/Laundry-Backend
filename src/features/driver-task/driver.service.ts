import { DriverAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";

import { AttendanceChecker } from "../attendance/attendance.checker";
import { getAttendanceDateWIB } from "../attendance/attendance.date-helper";
import { AttendanceRepository } from "../attendance/attendance.repository";
import { EmployeeRepository } from "../attendance/employee.repository";
import { DriverChecker } from "./driver.checker";
import { DriverRepository } from "./driver.repository";
import { DriverResponseHelper } from "./driver.response-helper";
import type { DriverAvailableTaskInput, DriverClaimInput } from "./driver.validation";

export class DriverService {
  static async getAvailableTasks({ payload, query }: { payload: { id: string } } & DriverAvailableTaskInput) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverChecker.verifyDriver(driver);

    const where: Prisma.DriverAssignmentWhereInput = {
      outletId: driver.currentOutletId!,
      status: DriverAssignmentStatus.QUEUED,
    };
    if (query.taskType) {
      where.taskType = query.taskType;
    }
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;

    const [totalItems, availableTasks] = await Promise.all([
      prisma.driverAssignment.count({ where }),
      DriverRepository.findAvailableTasks(where, skip, take, query.sortOrder),
    ]);
    // const totalItems = await prisma.driverAssignment.count({ where });

    const meta = makePaginationMeta({ page: query.page, limit: query.limit, totalItems });
    return { data: availableTasks, meta };
  }
  static async claimAssignment({ payload, params }: { payload: { id: string } } & DriverClaimInput) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverChecker.verifyDriver(driver);
    // Rules menjaga driver lupa CLOCK-OUT, Driver harus punya attendance hari ini agar bisa claim job!
    const attendanceDate = getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance(driver.id, attendanceDate);
    AttendanceChecker.verifyActiveAttendanceToday(todayAttendance);

    //Rules menjaga DRIVER hanya boleh satu job
    DriverChecker.verifyWorkStatus(driver, WorkStatus.AVAILABLE);

    const activeAssignment = await DriverRepository.findDriverActiveAssignment(driver.id);
    if (activeAssignment) {
      throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS");
    }

    //Rules untuk verifikasi assignment
    const assignment = await DriverRepository.findAssignmentById(params.assignmentId);
    DriverChecker.verifyAssignmentToClaim(assignment, driver.currentOutletId!);

    const claimedAssignment = await prisma.$transaction(async (tx) => {
      const assignedAt = new Date();
      await DriverRepository.claimAssignment(assignment.id, driver.currentOutletId!, driver.id, assignedAt, tx);
      await DriverRepository.updateDriverWorkStatus(driver.id, tx);
      const updatedAssignment = await DriverRepository.findUpdatedAssignment(assignment.id, tx);
      return updatedAssignment;
    });
    return claimedAssignment;
  }
  static async getActiveTask(payload: { id: string }) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverChecker.verifyDriver(driver);

    const activeAssignment = await DriverRepository.findActiveTaskDetail(driver.id);
    if (!activeAssignment) {
      return null; //NULL menandakan belum ada tugas
    }

    return DriverResponseHelper.buildActiveTaskResponse(activeAssignment);
  }
}

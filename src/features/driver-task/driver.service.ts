import { pick } from "zod/mini";
import {
  CustomerStatus,
  DriverAssignmentStatus,
  PickupDeliveryType,
  WorkStatus,
  type Prisma,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { AttendanceRepository } from "../attendance/attendance.repository";
import { EmployeeRepository } from "../employee/employee.repository";

import { DriverHelper } from "./driver.helper";
import { DriverRepository } from "./driver.repository";
import type { DriverAvailableAssignmentInput, DriverClaimInput, DriverStartTaskInput } from "./driver.validation";

export class DriverService {
  static async getAvailableAssignment({
    payload,
    query,
  }: { payload: { id: string } } & DriverAvailableAssignmentInput) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverHelper.assertDriver(driver);

    const where: Prisma.DriverAssignmentWhereInput = {
      outletId: driver.currentOutletId!,
      status: DriverAssignmentStatus.QUEUED,
    };
    if (query.taskType) {
      where.taskType = query.taskType;
    }
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;

    const [totalItems, availableAssignment] = await Promise.all([
      prisma.driverAssignment.count({ where }),
      DriverRepository.findAvailableAssignment(where, skip, take, query.sortOrder),
    ]);
    // const totalItems = await prisma.driverAssignment.count({ where });

    const meta = makePaginationMeta({ page: query.page, limit: query.limit, totalItems });
    return { data: availableAssignment, meta };
  }
  static async claimAssignment({ payload, params }: { payload: { id: string } } & DriverClaimInput) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverHelper.assertDriver(driver);
    // Rules menjaga driver lupa CLOCK-OUT, Driver harus punya attendance hari ini agar bisa claim job!
    const attendanceDate = DriverHelper.getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance(driver.id, attendanceDate);
    if (!todayAttendance)
      throw new ResponseError("ATTENDANCE_NOT_CLOCKED_IN", "Anda belum melakukan clock in hari ini!");
    if (driver.workStatus !== WorkStatus.AVAILABLE) throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");

    const activeAssignment = await DriverRepository.findActiveByDriverId(driver.id);
    if (activeAssignment) throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS");

    //Rules untuk verifikasi assignment
    const assignment = await DriverRepository.findAssignmentById(params.assignmentId);
    DriverHelper.assertClaimableAssignment(assignment, driver.currentOutletId!);

    const claimedAssignment = await prisma.$transaction(async (tx) => {
      const assignedAt = new Date();
      await DriverRepository.claimAssignment(assignment.id, driver.currentOutletId!, driver.id, assignedAt, tx);
      await DriverRepository.updateDriverWorkStatus(driver.id, driver.workStatus!, WorkStatus.BUSY, tx);
      const updatedAssignment = await DriverRepository.findUpdatedAssignment(assignment.id, tx);
      return updatedAssignment;
    });
    return claimedAssignment;
  }
  static async getActiveAssignment(payload: { id: string }) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverHelper.assertDriver(driver);

    const activeAssignment = await DriverRepository.findActiveAssignmentDetail(driver.id);
    if (!activeAssignment) return null; //NULL menandakan belum ada tugas

    return DriverHelper.buildActiveResponse(activeAssignment);
  }

  static async startAssignment({ payload, params }: { payload: { id: string } } & DriverStartTaskInput) {
    const driver = await EmployeeRepository.findById(payload.id);
    DriverHelper.assertDriver(driver);
    const assignment = await DriverRepository.findAssignmentById(params.assignmentId);
    DriverHelper.assertStartableAssignment(assignment, driver.id);
    const expectedOrderStatus =
      assignment.taskType === PickupDeliveryType.PICKUP
        ? CustomerStatus.WAITING_DRIVER_PICKUP
        : CustomerStatus.READY_FOR_DELIVERY;
    if (assignment.order.customerStatus !== expectedOrderStatus) throw new ResponseError("INVALID_STATE_TRANSITION");
    const startedAssignment = await prisma.$transaction(async (tx) => {
      await DriverRepository.startAssignmentUpdate(assignment.id, driver.id, tx);
      await DriverRepository.startCustomerStatusUpdate(assignment.orderId, expectedOrderStatus, tx);
      const updatedAssignment = await DriverRepository.findUpdatedAssignment(assignment.id, tx);
      if (!updatedAssignment) throw new ResponseError("RESOURCE_NOT_FOUND");
      return { id: updatedAssignment.id, taskType: updatedAssignment.taskType, status: updatedAssignment.status };
    });
    return startedAssignment;
  }
}

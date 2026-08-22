import { DriverAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { AttendanceRepository } from "../attendance/attendance.repository";
import { EmployeeRepository } from "../employee/employee.repository";

import { DriverHelper } from "./driver.helper";
import { DriverRepository } from "./driver.repository";
import type {
  DriverAvailableListInput,
  DriverClaimInput,
  DriverCompleteDeliveryInput,
  DriverHistoryDetailInput,
  DriverHistoryListInput,
  DriverPickupInput,
  DriverStartInput,
} from "./driver.types";

export class DriverService {
  static async getAvailableAssignment({ driverId, query }: { driverId: string; query: DriverAvailableListInput["query"] }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    const where: Prisma.DriverAssignmentWhereInput = {
      outletId: driver.currentOutletId!,
      status: DriverAssignmentStatus.QUEUED,
    };
    if (query.taskType) where.taskType = query.taskType;
    const skip = countSkip({ page: query.page, pageSize: query.pageSize });
    const take = query.pageSize;
    const [totalItems, availableList] = await DriverRepository.findAvailablePaginated({
      where: where,
      skip: skip,
      take: take,
      sortOrder: query.sortOrder,
    });
    const meta = makePaginationMeta({ page: query.page, pageSize: query.pageSize, totalItems });
    return { data: availableList, meta };
  }
  static async claimAssignment({ driverId, assignmentId }: { driverId: string; assignmentId: DriverClaimInput["params"]["assignmentId"] }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    const attendanceDate = DriverHelper.getAttendanceDateWIB(); // Rules menjaga driver lupa CLOCK-OUT, Driver harus punya attendance hari ini agar bisa claim job!
    const todayAttendance = await AttendanceRepository.findTodayAttendance({ employeeId: driver.id, attendanceDate: attendanceDate });
    if (!todayAttendance || todayAttendance.clockOutAt !== null) throw new ResponseError("ATTENDANCE_NOT_CLOCKED_IN");
    if (driver.workStatus !== WorkStatus.AVAILABLE) throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    const activeAssignment = await DriverRepository.findActiveByDriverId(driver.id);
    if (activeAssignment) throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS");
    return await DriverRepository.claimTransaction({ assignmentId: assignmentId, driverId: driver.id, outletId: driver.currentOutletId });
  }
  static async getActiveAssignment(driverId: string) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    const activeAssignment = await DriverRepository.findActiveAssignmentDetail(driver.id);
    if (!activeAssignment) return null; //NULL menandakan belum ada tugas

    return DriverHelper.buildActiveResponse(activeAssignment);
  }

  static async startAssignment({ driverId, assignmentId }: { driverId: string; assignmentId: DriverStartInput["params"]["assignmentId"] }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    return await DriverRepository.startTransaction({ assignmentId: assignmentId, driverId: driver.id });
  }

  static async pickupCollected({ driverId, assignmentId }: { driverId: string; assignmentId: DriverPickupInput["params"]["assignmentId"] }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    return await DriverRepository.pickupTransaction({ assignmentId: assignmentId, driverId: driver.id });
  }

  static async completeDelivery({
    driverId,
    assignmentId,
  }: {
    driverId: string;
    assignmentId: DriverCompleteDeliveryInput["params"]["assignmentId"];
  }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    return await DriverRepository.completeDeliveryTransaction({ assignmentId: assignmentId, driverId: driver.id });
  }

  static async getHistoryList({ driverId, query }: { driverId: string; query: DriverHistoryListInput["query"] }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    const where: Prisma.DriverAssignmentWhereInput = { driverId: driver.id, status: DriverAssignmentStatus.COMPLETED };
    if (query.taskType) where.taskType = query.taskType;
    const skip = countSkip({ page: query.page, pageSize: query.pageSize });
    const take = query.pageSize;
    const [totalItems, historyList] = await DriverRepository.findHistoryPaginated({ where, skip, take, sortOrder: query.sortOrder });
    const meta = makePaginationMeta({ page: query.page, pageSize: take, totalItems });

    return { data: historyList, meta };
  }

  static async getHistoryDetail({ driverId, assignmentId }: { driverId: string; assignmentId: DriverHistoryDetailInput["params"]["assignmentId"] }) {
    const driver = await EmployeeRepository.findById(driverId);
    DriverHelper.assertDriver(driver);
    const assignment = await DriverRepository.findCompleteByDetail({ driverId: driver.id, assignmentId: assignmentId });
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND");
    return assignment;
  }
}

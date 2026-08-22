import { CustomerStatus, WorkerAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { EmployeeRepository } from "../employee/employee.repository";
import { WorkerHelper } from "./worker.helper";
import type {
  WorkerAvailableAssignmentInput,
  WorkerClaimInput,
  WorkerCompleteInput,
  WorkerHistoryInput,
  WorkerPreClaimInput,
  WorkerRequestBypassInput,
  WorkerValidateQuantitiesInput,
} from "./worker.types";
import { WorkerRepository } from "./worker.repository";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { AttendanceRepository } from "../attendance/attendance.repository";

export class WorkerService {
  static async getAvailableAssignments({ workerId, query }: { workerId: string; query: WorkerAvailableAssignmentInput["query"] }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const where: Prisma.WorkerAssignmentWhereInput = {
      outletId: worker.currentOutletId!,
      status: WorkerAssignmentStatus.QUEUED,
      workerId: null,
    };
    if (query.stationType) where.stationType = query.stationType;
    const skip = countSkip({ page: query.page, pageSize: query.pageSize });
    const take = query.pageSize;
    const [totalItems, availableAssignments] = await WorkerRepository.findAvailablePaginated({ where, skip, take, sortOrder: query.sortOrder });
    const meta = makePaginationMeta({ page: query.page, pageSize: take, totalItems });
    return { data: availableAssignments, meta };
  }

  static async getPreClaimDetail({ workerId, assignmentId }: { workerId: string; assignmentId: WorkerPreClaimInput["params"]["assignmentId"] }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findPreClaimDetail({ assignmentId, workerOutletId: worker.currentOutletId });
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak ditemukan atau sudah tidak tersedia!");
    return assignment;
  }
  static async getHistoryList({ workerId, query }: { workerId: string; query: WorkerHistoryInput["query"] }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const where: Prisma.WorkerAssignmentWhereInput = {
      workerId: worker.id,
      status: WorkerAssignmentStatus.COMPLETED,
    };
    if (query.stationType) where.stationType = query.stationType;
    const skip = countSkip({ page: query.page, pageSize: query.pageSize });
    const take = query.pageSize;
    const [totalItems, historyList] = await WorkerRepository.findHistoryPaginated({ where, skip, take, sortOrder: query.sortOrder });
    const meta = makePaginationMeta({ page: query.page, pageSize: take, totalItems });
    return { data: historyList, meta };
  }

  static async claimAssignment({ workerId, assignmentId }: { workerId: string; assignmentId: WorkerClaimInput["params"]["assignmentId"] }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    if (worker.workStatus !== WorkStatus.AVAILABLE) throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    const attendanceDate = WorkerHelper.getAttendanceDateWIB();
    const todayAttendance = await AttendanceRepository.findTodayAttendance({ employeeId: worker.id, attendanceDate });
    if (!todayAttendance || todayAttendance.clockOutAt !== null) throw new ResponseError("ATTENDANCE_NOT_CLOCKED_IN");
    const isActive = await WorkerRepository.findActiveAssignmentDetail(worker.id);
    if (isActive) throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS");
    const result = await WorkerRepository.claimAssignment({ assignmentId, workerId: worker.id, workerOutletId: worker.currentOutletId });
    return result;
  }

  static async getActive(workerId: string) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findActiveAssignmentDetail(worker.id);
    if (!assignment) return null;
    return WorkerHelper.buildActiveAssignmentResponse(assignment);
  }

  static async validateQuantities({
    workerId,
    assignmentId,
    items,
  }: {
    workerId: string;
    assignmentId: WorkerValidateQuantitiesInput["params"]["assignmentId"];
    items: WorkerValidateQuantitiesInput["body"]["items"];
  }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findValidatableAssignment({ workerId, assignmentId }); // pengecekan ownership tugas, status tugas digabungkan dalam query prisma where
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND");
    const orderItems = assignment.order.orderItems;
    const inputItems = items;
    const compare = WorkerHelper.compareQuantity({ orderItems, inputItems });
    if (compare.matched === false) {
      throw new ResponseError("QUANTITY_MISMATCH");
    }
    const customerStatus = WorkerHelper.getCustomerStatusByStation(assignment.stationType);
    return WorkerRepository.updateValidateTransaction({
      workerId: worker.id,
      assignmentId: assignment.id,
      orderId: assignment.order.id,
      customerStatus: customerStatus,
    });
  }

  static async requestBypass({
    workerId,
    assignmentId,
    items,
  }: {
    workerId: string;
    assignmentId: WorkerRequestBypassInput["params"]["assignmentId"];
    items: WorkerRequestBypassInput["body"]["items"];
  }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findValidatableAssignment({workerId, assignmentId});
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND");
    const orderItems = assignment.order.orderItems;
    const inputItems = items;
    const compare = WorkerHelper.compareQuantity({ orderItems, inputItems });
    if (compare.matched) {
      throw new ResponseError("VALIDATION_ERROR", "Bypass hanya dapat diajukan apabila quantity tidak sesuai!");
    }
    const differences = compare.differences;
    return WorkerRepository.createBypassTransaction({
      assignmentId: assignment.id,
      workerId: worker.id,
      orderId: assignment.order.id,
      stationType: assignment.stationType,
      differences,
    });
  }

  static async complete({ workerId, assignmentId }: { workerId: string; assignmentId: WorkerCompleteInput["params"]["assignmentId"] }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findCompletableAssignment({workerId, assignmentId});
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND");
    if (assignment.order.customerStatus === CustomerStatus.OVERDUE) throw new ResponseError("INVALID_STATE_TRANSITION");
    const nextStation = WorkerHelper.getNextStation(assignment.stationType);
    return await WorkerRepository.completeTransaction({
      assignmentId: assignment.id,
      workerId: worker.id,
      nextStation,
      orderId: assignment.order.id,
      outletId: assignment.outletId,
    });
  }
}

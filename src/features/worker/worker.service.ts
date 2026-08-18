import { WorkerAssignmentStatus, WorkStatus, type Prisma } from "../../../generated/prisma";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { EmployeeRepository } from "../employee/employee.repository";
import { WorkerHelper } from "./worker.helper";
import type { WorkerAvailableAssignmentInput, WorkerClaimInput, WorkerHistoryInput, WorkerPreClaimInput, WorkerRequestBypassInput, WorkerValidateQuantitiesInput } from "./worker.validation";
import { WorkerRepository } from "./worker.repository";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class WorkerService {
  static async getAvailableAssignments({ workerId, query }: { workerId: string } & WorkerAvailableAssignmentInput) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const where: Prisma.WorkerAssignmentWhereInput = {
      outletId: worker.currentOutletId!,
      status: WorkerAssignmentStatus.QUEUED,
      workerId: null,
    };
    if (query.stationType) where.stationType = query.stationType;
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;
    const [totalItems, availableAssignments] = await WorkerRepository.findAvailablePaginated(where, skip, take, query.sortOrder);
    const meta = makePaginationMeta({ page: query.page, limit: take, totalItems });
    return { data: availableAssignments, meta };
  }

  static async getPreClaimDetail({ workerId, params }: { workerId: string } & WorkerPreClaimInput) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findPreClaimDetail(params.assignmentId, worker.currentOutletId!);
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak ditemukan atau sudah tidak tersedia!");
    return assignment;
  }
  static async getHistoryList({ workerId, query }: { workerId: string } & WorkerHistoryInput) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const where: Prisma.WorkerAssignmentWhereInput = {
      workerId: worker.id,
      status: WorkerAssignmentStatus.COMPLETED,
    };
    if (query.stationType) where.stationType = query.stationType;
    const skip = countSkip({ page: query.page, limit: query.limit });
    const take = query.limit;
    const [totalItems, historyList] = await WorkerRepository.findHistoryPaginated(where, skip, take, query.sortOrder);
    const meta = makePaginationMeta({ page: query.page, limit: take, totalItems });
    return { data: historyList, meta };
  }

  static async claimAssignment({ workerId, params }: { workerId: string; params: WorkerClaimInput["params"] }) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    if (worker.workStatus !== WorkStatus.AVAILABLE) throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    const isActive = await WorkerRepository.findActiveAssignment(worker.id);
    if (isActive) throw new ResponseError("ACTIVE_ASSIGNMENT_EXISTS");
    const result = await WorkerRepository.claimAssignment(params.assignmentId, worker.id, worker.currentOutletId!);
    return result;
  }

  static async getActive(workerId: string) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findActiveAssignmentDetail(worker.id);
    if (!assignment) return null;
    return WorkerHelper.buildActiveAssignmentResponse(assignment);
  }

  static async validateQuantities({ workerId, params, body }: { workerId: string } & WorkerValidateQuantitiesInput) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findValidatableAssignment(workerId, params.assignmentId); // pengecekan ownership tugas, status tugas digabungkan dalam query prisma where
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND");
    const orderItems = assignment.order.orderItems;
    const inputItems = body.items;
    const compare = WorkerHelper.compareQuantity({ orderItems, inputItems });
    if (compare.matched === false) {
      throw new ResponseError("QUANTITY_MISMATCH");
    }
    const customerStatus = WorkerHelper.getCustomerStatusByStation(assignment.stationType);
    return WorkerRepository.updateValidateTransaction(worker.id, assignment.id, assignment.order.id, customerStatus);
  }

  static async requestBypass({ workerId, params, body }: { workerId: string } & WorkerRequestBypassInput) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findValidatableAssignment(workerId, params.assignmentId);
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND");
    const orderItems = assignment.order.orderItems;
    const inputItems = body.items;
    const compare = WorkerHelper.compareQuantity({ orderItems, inputItems });
    if (compare.matched) {
      throw new ResponseError("VALIDATION_ERROR", "Bypass hanya dapat diajukan apabila quantity tidak sesuai!");
    }
    const differences = compare.differences;
    return WorkerRepository.createBypassTransaction({ assignmentId: assignment.id, workerId: worker.id, orderId: assignment.order.id, stationType: assignment.stationType, differences });
  }
}

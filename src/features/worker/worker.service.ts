import { WorkerAssignmentStatus, type Prisma } from "../../../generated/prisma";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { EmployeeRepository } from "../employee/employee.repository";
import { WorkerHelper } from "./worker.helper";
import type { WorkerAssignmentDetailInput, WorkerAvailableAssignmentInput } from "./worker.validation";
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
    const [totalItems, availableAssignment] = await Promise.all([
      WorkerRepository.countAvailable(where),
      WorkerRepository.findAvailable(where, skip, take, query.sortOrder),
    ]);
    const meta = makePaginationMeta({ page: query.page, limit: take, totalItems });
    return { data: availableAssignment, meta };
  }

  static async getAssignmentDetail({ workerId, params }: { workerId: string } & WorkerAssignmentDetailInput) {
    const worker = await EmployeeRepository.findById(workerId);
    WorkerHelper.assertWorkerValidity(worker);
    const assignment = await WorkerRepository.findAssignmentById(params.assignmentId, worker.currentOutletId!);
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak ditemukan atau sudah tidak tersedia!");
    return assignment;
  }
}

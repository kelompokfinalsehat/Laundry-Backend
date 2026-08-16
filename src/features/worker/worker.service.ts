import { WorkerAssignmentStatus, type Prisma } from "../../../generated/prisma";
import { countSkip, makePaginationMeta } from "../../utils/pagination.util";
import { EmployeeRepository } from "../employee/employee.repository";
import { WorkerHelper } from "./worker.helper";
import type { WorkerAvailableAssignmentInput } from "./worker.validation";
import { WorkerRepository } from "./worker.repository";

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
}

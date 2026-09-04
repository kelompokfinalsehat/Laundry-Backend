import * as zod from "zod";
import type { WorkerValidation } from "./worker.validation";
import type { WorkerRepository } from "./worker.repository";
import type { CustomerStatus, Prisma, StationType } from "../../../generated/prisma";

export type WorkerAvailableAssignmentInput = zod.infer<typeof WorkerValidation.AVAILABLE_ASSIGNMENT>;
export type WorkerHistoryInput = zod.infer<typeof WorkerValidation.HISTORY_LIST>;
export type WorkerClaimInput = zod.infer<typeof WorkerValidation.CLAIM_ASSIGNMENT>;
export type WorkerValidateQuantitiesInput = zod.infer<typeof WorkerValidation.VALIDATE_QUANTITIES>;
export type WorkerRequestBypassInput = zod.infer<typeof WorkerValidation.REQUEST_BYPASS>;
export type WorkerCompleteInput = zod.infer<typeof WorkerValidation.COMPLETE>;

export type WorkerHistoryDetailInput = zod.infer<typeof WorkerValidation.HISTORY_DETAIL>;

export type WorkerActiveAssignmentDetail = NonNullable<Awaited<ReturnType<typeof WorkerRepository.findActiveAssignmentDetail>>>;
export type WorkerValidateQuantitiesDetail = NonNullable<Awaited<ReturnType<typeof WorkerRepository.findValidatableAssignment>>>;

export type FindAvailablePaginated = { where: Prisma.WorkerAssignmentWhereInput; skip: number; take: number; sortOrder: "asc" | "desc" };
export type FindHistoryPaginated = { where: Prisma.WorkerAssignmentWhereInput; skip: number; take: number; sortOrder: "asc" | "desc" };

export type UpdateValidateTransactionTypes = { workerId: string; assignmentId: string; orderId: string; customerStatus: CustomerStatus; currentAttempt: number };
export type CreateBypassTypes = {
  assignmentId: string;
  workerId: string;
  orderId: string;
  stationType: StationType;
  differences: { orderItemId: string; officialQuantity: number; submittedQuantity: number; difference: number }[];
};

export type CompleteTransactionTypes = { assignmentId: string; workerId: string; nextStation: StationType | null; orderId: string; outletId: string };

import {
  ComplaintStatus,
  CustomerStatus,
  Prisma,
} from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ComplaintHelper } from "./complaint.helper";
import { ComplaintQuery, DecideDTOParams } from "./complaint.type";

export class ComplaintRepository {
  static async findAll(query: ComplaintQuery, outletId?: string) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const where = ComplaintHelper.defineComplaintQuery(query, outletId);
    const [complaints, totalItems] = await prisma.$transaction([
      prisma.complaint.findMany({
        where,
        skip,
        take,
        include: ComplaintHelper.listInclude,
        orderBy: { [query.sortBy]: query.sortOrder },
      }),
      prisma.complaint.count({ where }),
    ]);
    return {
      data: complaints,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findById(id: string, outletId?: string) {
    return prisma.complaint.findFirst({
      where: { id, ...(outletId && { order: { outletId } }) },
      include: ComplaintHelper.detailInclude,
    });
  }
  static async decide({ id, handledBy, responseNote }: DecideDTOParams) {
    const now = new Date()
    return await prisma.$transaction(async (tx) => {
      const complaint = await tx.complaint.update({
        where: { id },
        data: {
          status: ComplaintStatus.APPROVED,
          handledBy,
          responseNote,
          decidedAt: now,
        },
      });
      await tx.order.update({
        where: { id: complaint.orderId },
        data: { customerStatus: CustomerStatus.RECEIVED_BY_CUSTOMER, completedAt: now },
      });
      return tx.complaint.findFirst({where: {id: complaint.id}})
    });
  }
}

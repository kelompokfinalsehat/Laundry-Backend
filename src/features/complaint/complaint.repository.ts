import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { ComplaintHelper } from "./complaint.helper";
import { ComplaintQuery } from "./complaint.type";

export class ComplaintRepository {
    static async findAll(query: ComplaintQuery, outletId?: string){
        const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
        const where = ComplaintHelper.defineComplaintQuery(query, outletId)
        const [complaints, totalItems] = await prisma.$transaction([
            prisma.complaint.findMany({where, skip, take, include: ComplaintHelper.listInclude, orderBy: {[query.sortBy]: query.sortOrder}}),
            prisma.complaint.count({where})
        ])
        return {
            data: complaints,
            meta: PaginationHelper.meta(page, pageSize, totalItems)
        }
    }
    static async findById(id: string, outletId?: string){
        return prisma.complaint.findFirst({where: {id, ...(outletId && {order: {outletId}})}, include: ComplaintHelper.detailInclude})
    }
}
import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { LaundryItemQuery } from "./laundry-item.type";

export class LaundryItemRepository {
    static async findAll(query: LaundryItemQuery){
        const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
        const sortField = query.sortBy ?? "createdAt"
        const where: Prisma.LaundryItemWhereInput = {deletedAt: null}
        if(query.search){
            where.name = {
                contains: query.search,
                mode: "insensitive"
            }
        }
        const [laundryItems, totalItems] = await prisma.$transaction([
            prisma.laundryItem.findMany({
                where,
                take,
                skip,
                orderBy:{
                    [sortField]: query.sortOrder ?? "asc"
                }
            }),
            prisma.laundryItem.count({where})
        ])
        return {
            data: laundryItems,
            meta: PaginationHelper.meta(page, pageSize, totalItems)
        }
    }
    static async findById(id: string){
        return await prisma.laundryItem.findUnique({where: {id, deletedAt: null}})
    }
    static async create(data: Prisma.LaundryItemCreateInput){
        return await prisma.laundryItem.create({data})
    }
    static async update(id: string, data: Prisma.LaundryItemUpdateInput){
        return await prisma.laundryItem.update({where: {id}, data})
    }
    static async findByIds(ids: string[]){
        return await prisma.laundryItem.findMany({where: {id: {in: ids}, deletedAt: null}})
    }
}
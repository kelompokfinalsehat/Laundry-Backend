import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination.constant";
import { PaginationQuery } from "../types/pagination";

export class PaginationHelper {
    static paginate(query: PaginationQuery){
        const page = Number(query.page) || DEFAULT_PAGE
        const pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE
        const skip = (page - 1) * pageSize
        return {
            page,
            pageSize,
            skip,
            take: pageSize
        }
    }
    static meta(page: number, pageSize: number, totalItems: number){
        const totalPages = Math.ceil(totalItems/pageSize)
        return {
            page,
            pageSize,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    }
}
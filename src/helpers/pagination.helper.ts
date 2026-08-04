import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/pagination.constant";
import { PaginationQuery } from "../types/pagination";

export class PaginationHelper {
    static paginate(query: PaginationQuery){
        const page = Number(query.page) || DEFAULT_PAGE
        const limit = Number(query.limit) || DEFAULT_LIMIT
        const skip = (page - 1) * limit
        return {
            page,
            limit,
            skip,
            take: limit
        }
    }
}
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PaginationMeta } from "../types/pagination";

export class ResponseHelper {
    static success<T>(
        res: Response,
        message: string,
        data: T
    ){
        return res.status(StatusCodes.OK).json({
            success: true,
            message,
            data
        })
    }
    static created<T>(
        res: Response,
        message: string,
        data: T
    ){
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message,
            data
        })
    }
    static paginated<T>(res: Response, message: string, data: T, meta: PaginationMeta){
        return res.status(StatusCodes.OK).json({
            success: true,
            message,
            data,
            meta
        })
    }

}
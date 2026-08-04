import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ResponseHelper {
    static success(
        res: Response,
        message: string,
        data: unknown
    ){
        return res.json(StatusCodes.OK).json({
            success: true,
            message,
            data
        })
    }
    static created(
        res: Response,
        message: string,
        data: unknown
    ){
        return res.json(StatusCodes.CREATED).json({
            success: true,
            message,
            data
        })
    }

}
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { DashboardValidation } from "./dashboard.validation";
import { DashboardService } from "./dashboard.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class DashboardController {
    static async getDashboard(req: Request, res: Response){
        const query = validate(DashboardValidation.QUERY.getDashboard, req.query)
        const {sub} = res.locals.payload
        const result = await DashboardService.getDashboard(query, sub)
        return ResponseHelper.success(res, Message.FETCHED, result)
    }
}
import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { ReportValidation } from "./report.validation";
import { ReportService } from "./report.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class ReportController {
    static async getSalesReport(req: Request, res: Response){
        const query = validate(ReportValidation.QUERY.getSales, req.query)
        const {sub} = res.locals.payload
        const report = await ReportService.getSalesReport(query, sub)
        return ResponseHelper.success(res, Message.FETCHED, report)
    }
}
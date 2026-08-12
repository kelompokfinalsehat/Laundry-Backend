import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { BypassValidation } from "./bypass.validation";
import { BypassService } from "./bypass.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class BypassController {
    static async getBypassRequests(req: Request, res: Response){
        const query = validate(BypassValidation.QUERY.getBypassRequests, req.query)
        const {outletId} = res.locals.payload
        const result = await BypassService.getBypastRequests(query, outletId)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getBypassRequestById(req: Request, res: Response){
        const {id} = validate(BypassValidation.PARAMS.bypassId, req.params)
        const {outletId} = res.locals.payload
        const bypass = await BypassService.getBypastRequestById(id, outletId)
        return ResponseHelper.success(res, Message.FETCHED, bypass)
    }
    static async approve(req: Request, res: Response){
        const {id} = validate(BypassValidation.PARAMS.bypassId, req.params)
        const body = validate(BypassValidation.BODY.approve, req.body)
        const {sub, outletId} = res.locals.payload
        const bypass = await BypassService.approve(id, outletId, sub, body.password, body.problemNote)
        return ResponseHelper.success(res, Message.APPROVED, bypass)
    }
    static async reject(req: Request, res: Response){
        const {id} = validate(BypassValidation.PARAMS.bypassId, req.params)
        const {sub, outletId} = res.locals.payload
        const bypass = await BypassService.reject(id, outletId, sub)
        return ResponseHelper.success(res, Message.REJECTED, bypass)
    }
}
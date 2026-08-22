import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { OutletValidation } from "./outlet.validation";
import { OutletService } from "./outlet.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class OutletController {
    static async getOutlets(req: Request, res: Response){
        const query = validate(OutletValidation.QUERY.getOutlets, req.query);
        const outlets = await OutletService.getOutlets(query)
        return ResponseHelper.paginated(res, Message.FETCHED, outlets.data, outlets.meta)
    }
    static async getOutletById(req: Request, res: Response){
        const {id} = validate(OutletValidation.PARAMS.outletId, req.params)
        const outlet = await OutletService.getOutletById(id)
        return ResponseHelper.success(res, Message.FETCHED, outlet)
    }
    static async createOutlet(req: Request, res: Response){
        const body = validate(OutletValidation.BODY.createOutlet, req.body)
        const outlet = await OutletService.createOutlet(body)
        return ResponseHelper.created(res, Message.CREATED, outlet)
    }
    static async updateOutlet(req: Request, res: Response){
        const {id} = validate(OutletValidation.PARAMS.outletId, req.params)
        const body = validate(OutletValidation.BODY.updateOutlet, req.body)
        const outlet = await OutletService.updateOutlet(id, body)
        return ResponseHelper.success(res, Message.UPDATED, outlet)
    }
    static async deactivateOutlet(req: Request, res: Response){
        const {id} = validate(OutletValidation.PARAMS.outletId, req.params)
        const outlet = await OutletService.deactivateOutlet(id)
        return ResponseHelper.success(res, "Outlet deactivate successfully.", outlet)
    }
}
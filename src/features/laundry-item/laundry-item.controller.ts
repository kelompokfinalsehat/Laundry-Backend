import { Request, Response } from "express";
import { validate } from "../../validations/validation";
import { LaundryItemValidation } from "./laundry-item.validation";
import { LaundryItemService } from "./laundry-item.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class LaundryItemController {
    static async getLaundryItems(req: Request, res: Response){
        const query = validate(LaundryItemValidation.QUERY.getLaundryItems, req.query)
        const result = await LaundryItemService.getLaundryItems(query)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getLaundryItem(req: Request, res: Response){
        const {id} = validate(LaundryItemValidation.PARAMS.laundryItemId, req.params)
        const laundryItem = await LaundryItemService.getLaundryItem(id)
        return ResponseHelper.success(res, Message.FETCHED, laundryItem)
    }
    static async createLaundryItem(req: Request, res: Response){
        const body = validate(LaundryItemValidation.BODY.createLaundryItem, req.body)
        const laundryItem = await LaundryItemService.createLaundryItem(body)
        return ResponseHelper.created(res, Message.CREATED, laundryItem)
    }
    static async updateLaundryItem(req: Request, res: Response){
        const {id} = validate(LaundryItemValidation.PARAMS.laundryItemId, req.params)
        const body = validate(LaundryItemValidation.BODY.updateLaundryItem, req.body)
        const laundryItem = await LaundryItemService.updateLaundryItem(id, body)
        return ResponseHelper.success(res, Message.UPDATED, laundryItem)
    }
    static async deactivateLaundryItem(req: Request, res: Response){
        const {id} = validate(LaundryItemValidation.PARAMS.laundryItemId, req.params)
        const laundryItem = await LaundryItemService.deactivateLaundryItem(id)
        return ResponseHelper.success(res, Message.DELETED, laundryItem)
    }
}
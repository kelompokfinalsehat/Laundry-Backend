import { Request, Response } from "express";
import { PricingService } from "./pricing.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";
import { validate } from "../../validations/validate";
import { PricingValidation } from "./pricing.validation";

export class PricingController {
    static async getLaundryPricing(_req: Request, res: Response){
        const laundryPricing = await PricingService.getLaundryPricing()
        return ResponseHelper.success(res, Message.FETCHED, laundryPricing)
    }
    static async createLaundryPricing(req: Request, res: Response){
        const body = validate(PricingValidation.BODY.createOrUpdateLaundryPricing, req.body)
        const laundryPricing = await PricingService.createLaundryPricing(body)
        return ResponseHelper.created(res, Message.CREATED, laundryPricing)
    }
    static async updateLaundryPricing(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        const body = validate(PricingValidation.BODY.createOrUpdateLaundryPricing, req.body)
        const laundryPricing = await PricingService.updateLaundryPricing(id, body)
        return ResponseHelper.success(res, Message.UPDATED, laundryPricing)
    }
    static async getShippingRates(req: Request, res: Response){
        const query = validate(PricingValidation.QUERY.getShippingRates, req.query)
        const result = await PricingService.getShippingRates(query)
        return ResponseHelper.paginated(res, Message.FETCHED, result.data, result.meta)
    }
    static async getShippingRate(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        const shippingRate = await PricingService.getShippingRateById(id)
        return ResponseHelper.success(res, Message.FETCHED, shippingRate)
    }
    static async createShippingRate(req: Request, res: Response){
        const body = validate(PricingValidation.BODY.createShippingRate, req.body)
        const shippingRate = await PricingService.createShippingRate(body)
        return ResponseHelper.created(res, Message.CREATED, shippingRate)
    }
    static async updateShippingRate(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        const body = validate(PricingValidation.BODY.updateShippingRate, req.body)
        const shippingRate = await PricingService.updateShippingRate(id, body)
        return ResponseHelper.success(res, Message.UPDATED, shippingRate)
    }
    static async deactivateShippingRate(req: Request, res: Response){
        const {id} = validate(PricingValidation.PARAMS.pricingId, req.params)
        await PricingService.deactivateShippingRate(id)
        return ResponseHelper.success(res, Message.DELETED, null)
    }
}
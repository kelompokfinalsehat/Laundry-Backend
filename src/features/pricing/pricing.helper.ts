import { ResponseError } from "../../utils/errors/response-error.utils";
import { PricingRepository } from "./pricing.repository";

export class PricingHelper {
    static async findLaundryPricingOrThrow(){
        const pricing = await PricingRepository.findCurrentLaundryPricing()
        if(!pricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry pricing not found.')
        return pricing
    }
    static async findShippingRateByIdOrThrow(id: string){
        const pricing = await PricingRepository.findShippingRateById(id)
        if(!pricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Shipping rate not found.')
        return pricing
    }
}
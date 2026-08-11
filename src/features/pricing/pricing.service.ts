import { ResponseError } from "../../utils/response-error.utils";
import { PricingRepository } from "./pricing.repository";
import { CreateShippingRateBody, LaundryPricingBody, ShippingRateQuery, UpdateShippingRateBody } from "./pricing.type";

export class PricingService {
    private static async findLaundryPricingOrThrow(){
        const laundryPricing = await PricingRepository.findCurrentLaundryPricing()
        if(!laundryPricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry pricing is currently none.')
        return laundryPricing
    }
    private static async findShippingRateByIdOrThrow(id: string){
        const shippingRate = await PricingRepository.findShippingRateById(id)
        if(!shippingRate) throw new ResponseError('RESOURCE_NOT_FOUND', 'Shipping rate not found.')
        return shippingRate
    }
    static async getLaundryPricing(){
        const laundryPricing = await this.findLaundryPricingOrThrow()
        return laundryPricing
    }
    static async createLaundryPricing(body: LaundryPricingBody){
        const laundryPricing = await PricingRepository.findCurrentLaundryPricing()
        if(laundryPricing) throw new ResponseError('CONFLICT', 'Laundry price already exist.')
        return await PricingRepository.createLaundryPricing(body)
    }
    static async updateLaundryPricing(id: string, body: LaundryPricingBody){
        const laundryPricing = await PricingRepository.findLaundryPricingById(id)
        if(!laundryPricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry pricing is not found.')
        return await PricingRepository.updateLaundryPricing(id, body)
    }
    static async getShippingRates(query: ShippingRateQuery){
        return await PricingRepository.getShippingRates(query)
    }
    static async getShippingRateById(id: string){
        const shippingRate = await this.findShippingRateByIdOrThrow(id)
        return shippingRate
    }
    static async createShippingRate(body: CreateShippingRateBody){
        return await PricingRepository.createShippingRate(body)
    }
    static async updateShippingRate(id: string, body: UpdateShippingRateBody){
        await this.findShippingRateByIdOrThrow(id)
        return await PricingRepository.updateShippingRate(id, body)
    }
    static async deactivateShippingRate(id: string){
        const shippingRate = await this.findShippingRateByIdOrThrow(id)
        if(shippingRate.deletedAt) throw new ResponseError('CONFLICT', 'Shipping rate already deactivated.')
        return await PricingRepository.updateShippingRate(id, {deletedAt: new Date()})
    }
    static async getShippingRateByDistance(distance: number){
        const shippingRate = await PricingRepository.findShippingRateByDistanceMeter(distance)
        if(!shippingRate) throw new ResponseError('OUTSIDE_SERVICE_RADIUS')
        return shippingRate
    }
}
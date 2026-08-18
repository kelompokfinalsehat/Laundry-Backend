import { ResponseError } from "../../utils/errors/response-error.utils";
import { PricingHelper } from "./pricing.helper";
import { PricingRepository } from "./pricing.repository";
import { CreateShippingRateBody, LaundryPricingBody, ShippingRateQuery, UpdateShippingRateBody } from "./pricing.type";

export class PricingService {
    static async getLaundryPricing(){
        const laundryPricing = await PricingHelper.findLaundryPricingOrThrow()
        return laundryPricing
    }
    static async createLaundryPricing(body: LaundryPricingBody){
        const laundryPricing = await PricingRepository.findCurrentLaundryPricing()
        if(laundryPricing) throw new ResponseError('CONFLICT', 'Harga laundry sudah ada.')
        return await PricingRepository.createLaundryPricing(body)
    }
    static async updateLaundryPricing(id: string, body: LaundryPricingBody){
        const laundryPricing = await PricingRepository.findLaundryPricingById(id)
        if(!laundryPricing) throw new ResponseError('RESOURCE_NOT_FOUND', 'Harga laundry tidak ditemukan.')
        return await PricingRepository.updateLaundryPricing(id, body)
    }
    static async getShippingRates(query: ShippingRateQuery){
        return await PricingRepository.getShippingRates(query)
    }
    static async getShippingRateById(id: string){
        const shippingRate = await PricingHelper.findShippingRateByIdOrThrow(id)
        return shippingRate
    }
    static async createShippingRate(body: CreateShippingRateBody){
        return await PricingRepository.createShippingRate(body)
    }
    static async updateShippingRate(id: string, body: UpdateShippingRateBody){
        await PricingHelper.findShippingRateByIdOrThrow(id)
        return await PricingRepository.updateShippingRate(id, body)
    }
    static async deactivateShippingRate(id: string){
        const shippingRate = await PricingHelper.findShippingRateByIdOrThrow(id)
        if(shippingRate.deletedAt) throw new ResponseError('CONFLICT', 'Harga ongkir sudah dinonaktifkan.')
        return await PricingRepository.updateShippingRate(id, {deletedAt: new Date()})
    }
    static async getShippingRateByDistance(distance: number){
        const shippingRate = await PricingRepository.findShippingRateByDistanceMeter(distance)
        if(!shippingRate) throw new ResponseError('OUTSIDE_SERVICE_RADIUS')
        return shippingRate
    }
}
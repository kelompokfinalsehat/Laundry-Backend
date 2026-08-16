import { Prisma } from "../../../generated/prisma";
import { GeocodingService } from "../../services/geocoding.service";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { OutletHelper } from "./outlet.helper";
import { OutletRepository } from "./outlet.repository";
import { CreateOutletBody, OutletQuery, UpdateOutletBody } from "./outlet.type";

export class OutletService {
    static async getOutlets(query: OutletQuery){
        return await OutletRepository.findAll(query)
    }
    static async getOutletById(id: string){
        const outlet = await OutletHelper.findOutletByIdOrThrow(id)
        return outlet
    }
    static async createOutlet(body: CreateOutletBody){
        const {name, address} = body
        const coordinate = await GeocodingService.getCoordinate(address)
        const outletData = {
            name,
            address,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        }
        return await OutletRepository.create(outletData)
    }
    static async updateOutlet(id: string, body: UpdateOutletBody){
        const {name, address} = body
        const outlet = await OutletHelper.findOutletByIdOrThrow(id)
        const updateData: Prisma.OutletUpdateInput = {}
        if(name) updateData.name = name
        if(address && address !== outlet.address){
            const coordinate = await GeocodingService.getCoordinate(address)
            updateData.address = address
            updateData.latitude = coordinate.latitude
            updateData.longitude = coordinate.longitude
        }
        return await OutletRepository.update(id, updateData)
    }
    static async deactivateOutlet(id: string){
        const outlet = await OutletHelper.findOutletByIdOrThrow(id)
        if(!outlet.isActive) throw new ResponseError('CONFLICT', 'Outlet is already inactive.')
        const employeeCount = await OutletRepository.hasActiveEmployee(id)
        if(employeeCount > 0) throw new ResponseError('CONFLICT', 'Outlet has active employee.')
        const activeOrderCount = await OutletRepository.hasActiveOrders(id)
        if(activeOrderCount > 0) throw new ResponseError('CONFLICT', 'Outlet has active order.')
        return await OutletRepository.update(id, {isActive: false})
    }
}
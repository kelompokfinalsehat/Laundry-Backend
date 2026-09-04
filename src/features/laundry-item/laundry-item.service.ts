import { Prisma } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { LaundryItemHelper } from "./laundry-item.helper";
import { LaundryItemRepository } from "./laundry-item.repository";
import { CreateLaundryItemBody, LaundryItemQuery, UpdateLaundryItemBody } from "./laundry-item.type";

export class LaundryItemService {
    static async getLaundryItems(query: LaundryItemQuery){
        return await LaundryItemRepository.findAll(query)
    }
    static async getLaundryItem(id: string){
        const laundryItem = await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        return laundryItem
    }
    static async createLaundryItem(body: CreateLaundryItemBody){
        const existingItem = await LaundryItemRepository.findByName(body.name)
        if(existingItem) throw new ResponseError('CONFLICT', 'Laundry item dengan nama tersebut sudah ada.')
        return await LaundryItemRepository.create(body)
    }
    static async updateLaundryItem(id: string, body: UpdateLaundryItemBody){
        const laundryItem = await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        if(body.name && body.name.toLowerCase() !== laundryItem.name.toLowerCase()){
            const existingItem = await LaundryItemRepository.findByName(body.name)
            if(existingItem && existingItem.id !== id) throw new ResponseError('CONFLICT', "Laundry Item dengan nama tersebut sudah ada.")
        }
        return await LaundryItemRepository.update(id, body)
    }
    static async deactivateLaundryItem(id: string){
        await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        return await LaundryItemRepository.update(id, {deletedAt: new Date()})
    }
}
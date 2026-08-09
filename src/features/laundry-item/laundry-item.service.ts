import { Prisma } from "../../../generated/prisma";
import { ResponseError } from "../../utils/response-error.utils";
import { LaundryItemRepository } from "./laundry-item.repository";
import { CreateLaundryItemBody, LaundryItemQuery, UpdateLaundryItemBody } from "./laundry-item.type";

export class LaundryItemService {
    private static async findLaundryItemOrThrow(id: string){
        const laundryItem = await LaundryItemRepository.findById(id)
        if(!laundryItem) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry item not found.')
        return laundryItem
    }
    static async getLaundryItems(query: LaundryItemQuery){
        return await LaundryItemRepository.findAll(query)
    }
    static async getLaundryItem(id: string){
        const laundryItem = await this.findLaundryItemOrThrow(id)
        return laundryItem
    }
    static async createLaundryItem(body: CreateLaundryItemBody){
        return await LaundryItemRepository.create(body)
    }
    static async updateLaundryItem(id: string, body: UpdateLaundryItemBody){
        const {name} = body
        await this.findLaundryItemOrThrow(id)
        const updateData: Prisma.LaundryItemUpdateInput = {}
        if(name) updateData.name = name
        return await LaundryItemRepository.update(id, updateData)
    }
    static async deactivateLaundryItem(id: string){
        await this.findLaundryItemOrThrow(id)
        return await LaundryItemRepository.update(id, {deletedAt: new Date()})
    }
}
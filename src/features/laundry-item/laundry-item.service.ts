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
        return await LaundryItemRepository.create(body)
    }
    static async updateLaundryItem(id: string, body: UpdateLaundryItemBody){
        const {name} = body
        await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        const updateData: Prisma.LaundryItemUpdateInput = {}
        if(name) updateData.name = name
        return await LaundryItemRepository.update(id, updateData)
    }
    static async deactivateLaundryItem(id: string){
        await LaundryItemHelper.findLaundryItemByIdOrThrow(id)
        return await LaundryItemRepository.update(id, {deletedAt: new Date()})
    }
}
import { ResponseError } from "../../utils/errors/response-error.utils";
import { LaundryItemRepository } from "./laundry-item.repository";

export class LaundryItemHelper {
    static async findLaundryItemByIdOrThrow(id: string){
        const laundryItem = await LaundryItemRepository.findById(id)
        if(!laundryItem) throw new ResponseError('RESOURCE_NOT_FOUND', 'Laundry item not found.')
        return laundryItem
    }
}
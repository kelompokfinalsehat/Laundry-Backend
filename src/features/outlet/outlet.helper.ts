import { ResponseError } from "../../utils/errors/response-error.utils";
import { OutletRepository } from "./outlet.repository";

export class OutletHelper {
    static async findOutletByIdOrThrow(id: string){
        const outlet = await OutletRepository.findById(id)
        if(!outlet) throw new ResponseError('RESOURCE_NOT_FOUND', 'Outlet not found.')
        return outlet
    }
}
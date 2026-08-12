import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeRepository } from "../employee/employee.repository";
import { BypassHelper } from "./bypass.helper";
import { BypassRepository } from "./bypass.repository";
import { BypassQuery } from "./bypass.type";

export class BypassService {
    static async getBypastRequests(query: BypassQuery, outletId?: string){
        return BypassRepository.findAll(query, outletId)
    }
    static async getBypastRequestById(id: string, outletId?: string){
        const bypass = await BypassRepository.findById(id, outletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Bypass request not found.')
        const differences = BypassHelper.parseQuantityDifferences(bypass.quantityDiffJson)
        const orderItems = bypass.order.orderItems
        return {
            id: bypass.id,
            order: {id: bypass.order.id, orderCode: bypass.order.orderCode},
            stationType: bypass.stationType,
            worker: bypass.requestedByUser ? {id: bypass.requestedByUser.id, name: bypass.requestedByUser.name} : null,
            status: bypass.status,
            differences: differences.map(difference => {
                const orderItem = orderItems.find(item => item.id === difference.orderItemId)
                if(!orderItem) throw new ResponseError("INTERNAL_SERVER_ERROR", 'Bypass quantity is invalid.')
                return {
                    orderItemId: difference.orderItemId,
                    itemName: orderItem.laundryItem.name,
                    officialQuantity: difference.officialQuantity,
                    submittedQuantity: difference.submittedQuantity,
                    difference: difference.difference
                }
            }),
            createdAt: bypass.createdAt
        }
    }
    static async approve(id: string, outletId: string, decidedBy: string, password: string, problemNote: string){
        const bypass = await BypassRepository.findForDecision(id, outletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Bypass request not found.')
        const employee = await EmployeeRepository.findById(decidedBy)
        if(!employee || !employee.passwordHash) throw new ResponseError('INVALID_CREDENTIALS', 'Password tidak valid.')
        const validPassword = await BcryptUtil.compare(password, employee.passwordHash)
        if(!validPassword) throw new ResponseError('INVALID_CREDENTIALS', 'Password tidak valid.')
        const differences = BypassHelper.parseQuantityDifferences(bypass.quantityDiffJson)
        BypassHelper.validateDifferences(differences, bypass.order.orderItems)
        const result = await BypassRepository.approve(id, decidedBy, problemNote, differences)
        if(!result) return BypassRepository.findById(id, outletId)
        return result
    }
    static async reject(id: string, outletId: string, decidedBy: string){
        const bypass = await BypassRepository.findForDecision(id, outletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Bypass request not found.')
        const result = await BypassRepository.reject(id, decidedBy)
        if(!result) return BypassRepository.findById(id, outletId)
        return result
    }
}
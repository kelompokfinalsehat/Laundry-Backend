import { BcryptUtil } from "../../utils/Auth/bcrypt.utils";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { EmployeeRepository } from "../employee/employee.repository";
import { BypassHelper } from "./bypass.helper";
import { BypassRepository } from "./bypass.repository";
import { BypassQuery } from "./bypass.type";

export class BypassService {
    static async getBypastRequests(query: BypassQuery, sub: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
        return BypassRepository.findAll(query, employee.currentOutletId ?? undefined)
    }
    static async getBypastRequestById(id: string, sub: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(sub)
        const bypass = await BypassRepository.findById(id, employee.currentOutletId ?? undefined)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Permintaan bypass tidak ditemukan.')
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
                if(!orderItem) throw new ResponseError("INTERNAL_SERVER_ERROR", 'Kuantitas bypas tidak sesuai.')
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
    static async approve(id: string, decidedBy: string, password: string, problemNote: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(decidedBy)
        if(!employee.passwordHash) throw new ResponseError('INVALID_CREDENTIALS', 'Password tidak valid.')
        if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
        const bypass = await BypassRepository.findForDecision(id, employee.currentOutletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Permintaan bypass tidak ditemukan.')
        const validPassword = await BcryptUtil.compare(password, employee.passwordHash)
        if(!validPassword) throw new ResponseError('INVALID_CREDENTIALS', 'Password tidak valid.')
        const differences = BypassHelper.parseQuantityDifferences(bypass.quantityDiffJson)
        BypassHelper.validateDifferences(differences, bypass.order.orderItems)
        const result = await BypassRepository.approve(id, decidedBy, problemNote, differences)
        if(!result) return BypassRepository.findById(id, employee.currentOutletId)
        return result
    }
    static async reject(id: string, decidedBy: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(decidedBy)
        if(!employee.currentOutletId) throw new ResponseError('INVALID_CREDENTIALS', 'Data akun belum lengkap.')
        const bypass = await BypassRepository.findForDecision(id, employee.currentOutletId)
        if(!bypass) throw new ResponseError('RESOURCE_NOT_FOUND', 'Permintaan bypass tidak ditemukan.')
        const result = await BypassRepository.reject(id, decidedBy)
        if(!result) return BypassRepository.findById(id, employee.currentOutletId)
        return result
    }
}
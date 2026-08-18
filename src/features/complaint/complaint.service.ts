import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { ComplaintRepository } from "./complaint.repository";
import { ComplaintQuery } from "./complaint.type";

export class ComplaintService {
    static async getComplaints(query: ComplaintQuery, outletAdminId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
        return ComplaintRepository.findAll(query, employee.currentOutletId ?? undefined)
    }
    static async getComplaintById(id: string, outletAdminId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
        const complaint = await ComplaintRepository.findById(id, employee.currentOutletId ?? undefined)
        if(!complaint) throw new ResponseError('RESOURCE_NOT_FOUND', 'Complaint tidak ditemukan.')
        return complaint
    }
}
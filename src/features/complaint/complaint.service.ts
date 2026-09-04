import { ComplaintStatus } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { EmployeeHelper } from "../employee/employee.helper";
import { ComplaintRepository } from "./complaint.repository";
import { ComplaintQuery, DecideComplaintBody, DecideDTOParams } from "./complaint.type";

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
    static async decideComplaint(id: string, body: DecideComplaintBody, outletAdminId: string){
        const {decision, responseNote} = body
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(outletAdminId)
        if(!employee.currentOutletId) throw new ResponseError('FORBIDDEN', 'Outlet admin belum memiliki outlet akitf.')
        const complaint = await ComplaintRepository.findById(id, employee.currentOutletId)
        if(!complaint) throw new ResponseError('RESOURCE_NOT_FOUND', 'Complaint tidak ditemukan.')
        if(complaint.status !== ComplaintStatus.OPEN) throw new ResponseError('CONFLICT', 'Complaint ini sudah diputuskan.')
        return ComplaintRepository.decide({id, handledBy: employee.id, decision, responseNote})
    }
}
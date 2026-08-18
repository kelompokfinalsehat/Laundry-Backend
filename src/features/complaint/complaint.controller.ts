import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { ComplaintValidation } from "./complaint.validation";
import { ComplaintService } from "./complaint.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class ComplaintController {
    static async getComplaints(req: Request, res: Response){
        const query = validate(ComplaintValidation.QUERY.getComplaints, req.query)
        const {sub} = res.locals.payload
        const complaints = await ComplaintService.getComplaints(query, sub)
        return ResponseHelper.paginated(res, Message.FETCHED, complaints.data, complaints.meta)
    }
    static async getComplaintById(req: Request, res: Response){
        const {id} = validate(ComplaintValidation.PARAMS.complaintId, req.params)
        const {sub} = res.locals.payload
        const complaint = await ComplaintService.getComplaintById(id, sub)
        return ResponseHelper.success(res, Message.FETCHED, complaint)
    }
}
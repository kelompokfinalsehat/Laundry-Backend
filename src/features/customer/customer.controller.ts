import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { CustomerValidation } from "./customer.validation";
import { CustomerService } from "./customer.service";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

export class CustomerController {
    static async getCustomers(req: Request, res: Response){
        const query = validate(CustomerValidation.QUERY.getCustomers, req.query)
        const customers = await CustomerService.getCustomers(query)
        return ResponseHelper.paginated(res, Message.FETCHED, customers.data, customers.meta)
    }
    static async getCustomerById(req: Request, res: Response){
        const {id} = validate(CustomerValidation.PARAMS.customerId, req.params)
        const customer = await CustomerService.getCustomerById(id)
        return ResponseHelper.success(res, Message.FETCHED, customer)
    }
}
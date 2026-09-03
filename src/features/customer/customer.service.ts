import { ResponseError } from "../../utils/errors/response-error.utils";
import { CustomerRepository } from "./customer.repository";
import { CustomerQuery } from "./customer.type";

export class CustomerService {
    static async getCustomers(query: CustomerQuery){
        return CustomerRepository.findCustomers(query)
    }
    static async getCustomerById(id: string){
        const customer = await CustomerRepository.findCustomerById(id)
        if(!customer) throw new ResponseError('RESOURCE_NOT_FOUND', 'Customer tidak ditemukan.')
        return customer
    }
}
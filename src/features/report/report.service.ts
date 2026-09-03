import { EmployeeHelper } from "../employee/employee.helper";
import { ReportRepository } from "./report.repository";
import { EmployeePerformanceQuery, SalesQuery } from "./report.type";

export class ReportService {
    static async getSalesReport(query: SalesQuery, employeeId: string){   
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId)
        return ReportRepository.getSalesReport(query, employee.currentOutletId ?? undefined)
    }
    static async getEmployeePerformanceReport(query: EmployeePerformanceQuery, employeeId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId)
        return ReportRepository.getEmployeePerformanceReport(query, employee.currentOutletId ?? undefined)
    }
}
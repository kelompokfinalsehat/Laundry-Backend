import { EmployeeHelper } from "../employee/employee.helper";
import { DashboardRepository } from "./dashboard.repository";
import { DashboardQuery } from "./dashboard.type";

export class DashboardService {
    static async getDashboard(query: DashboardQuery, employeeId: string){
        const employee = await EmployeeHelper.findEmployeeByIdOrThrow(employeeId)
        return DashboardRepository.getDashboard(query, employee.currentOutletId ?? undefined)
    }
}
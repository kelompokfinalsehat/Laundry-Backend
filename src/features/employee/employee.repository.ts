import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { EmployeeQuery } from "./employee.type";

export class EmployeeRepository {
    private static readonly employeeInclude = Prisma.validator<Prisma.EmployeeInclude>()({currentOutlet: true})
    static async findAll(query: EmployeeQuery){
        const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
        const sortField = query.sortBy ?? "createdAt"
        const where: Prisma.EmployeeWhereInput = {}
        if(query.search){
            where.OR = [
                {name: {
                    contains: query.search,
                    mode: "insensitive"
                }},
                {email: {
                    contains: query.search,
                    mode: "insensitive"
                }}
            ]
        }
        if (query.role) where.role = query.role
        if (query.accountStatus) where.accountStatus = query.accountStatus;
        if (query.workStatus) where.workStatus = query.workStatus;
        if (query.outletId) where.currentOutletId= query.outletId;
        const [employees, totalItems] = await prisma.$transaction([
            prisma.employee.findMany({
                where,
                skip,
                take,
                include: this.employeeInclude,
                orderBy: {
                    [sortField]: query.sortOrder ?? "desc"
                },
            }),
            prisma.employee.count({where})
        ])
        return {
            data: employees,
            meta: PaginationHelper.meta(page, pageSize, totalItems)
        }
    }
    static async findById(id: string){
        return await prisma.employee.findUnique({
            where:{id},
            include: this.employeeInclude
        })
    }
    static async findByEmail(email: string){
        return await prisma.employee.findUnique({
            where: {email}
        })
    }
    static async create(data: Prisma.EmployeeCreateInput){
        return await prisma.employee.create({data, include: this.employeeInclude})
    }
    static async update(id:string, data: Prisma.EmployeeUpdateInput){
        return await prisma.employee.update({where: {id}, data, include: this.employeeInclude})
    }
}
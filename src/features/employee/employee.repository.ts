import { DriverAssignmentStatus, Prisma, Role, WorkerAssignmentStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { EmployeeQuery, OutletTeamQuery } from "./employee.type";

export class EmployeeRepository {
    private static readonly employeeInclude = Prisma.validator<Prisma.EmployeeInclude>()({currentOutlet: true})
    static async findAll(query: EmployeeQuery){
        const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
        const where: Prisma.EmployeeWhereInput = {deletedAt: null}
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
                    [query.sortBy]: query.sortOrder
                },
            }),
            prisma.employee.count({where})
        ])
        return {
            data: employees,
            meta: PaginationHelper.meta(page, pageSize, totalItems)
        }
    }
    static async findOutletTeam(query: OutletTeamQuery, outletId: string){
        const {page, pageSize, skip, take} = PaginationHelper.paginate(query)
        const where: Prisma.EmployeeWhereInput = {currentOutletId: outletId, role: {in: [Role.DRIVER, Role.WORKER]}}
        if(query.search){
            where.OR = [
                {
                    name: {
                        contains: query.search,
                        mode: "insensitive"
                    }
                },
                {
                    email: {
                        contains: query.search,
                        mode: "insensitive"
                    }
                }
            ]
        }
        if(query.role) where.role = query.role
        if(query.workStatus) where.workStatus = query.workStatus
        if(query.stationType) {
            where.workerTasks = {
                some: {
                    stationType: query.stationType,
                    status: {in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS, WorkerAssignmentStatus.ON_HOLD_BYPASS]}
                }
            }
        }
        const [employees, totalItems] = await prisma.$transaction([
            prisma.employee.findMany({
                where,
                skip,
                take,
                orderBy: {
                    [query.sortBy]: query.sortOrder
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    accountStatus: true,
                    workStatus: true,
                    workerTasks: {
                        where: {
                            status: {
                                in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.ON_HOLD_BYPASS, WorkerAssignmentStatus.IN_PROGRESS]
                            }
                        },
                        take: 1,
                        orderBy: {
                            createdAt: "desc"
                        },
                        select: {
                            id: true,
                            stationType: true,
                            status: true,
                            assignedAt: true,
                            startedAt: true
                        }
                    },
                    driverTasks: {
                        where: {
                            status: {
                                in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS]
                            }
                        },
                        take: 1,
                        orderBy: {
                            createdAt: "desc"
                        },
                        select: {
                            id: true,
                            taskType: true,
                            status: true,
                            assignedAt: true,
                            pickedUpAt: true
                        }
                    }
                }
            }),
            prisma.employee.count({
                where
            })
        ])
        return {
            data: employees,
            meta: PaginationHelper.meta(page, pageSize, totalItems)
        }
    }
    static async findById(id: string){
        return await prisma.employee.findUnique({
            where:{id, deletedAt: null},
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
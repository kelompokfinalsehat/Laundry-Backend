import { DriverAssignmentStatus, Prisma, Role, WorkerAssignmentStatus } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { PaginationHelper } from "../../helpers/pagination.helper";
import { AttendanceStatus, EmployeeQuery, OutletAttendanceQuery, OutletTeamQuery } from "./employee.type";

export class EmployeeRepository {
  private static readonly employeeInclude = Prisma.validator<Prisma.EmployeeInclude>()({ currentOutlet: true });
  static async findAll(query: EmployeeQuery) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const where: Prisma.EmployeeWhereInput = { deletedAt: null, role: { not: Role.SUPER_ADMIN } };
    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (query.role) where.role = query.role;
    if (query.accountStatus) where.accountStatus = query.accountStatus;
    if (query.workStatus) where.workStatus = query.workStatus;
    if (query.outletId) where.currentOutletId = query.outletId;
    const [employees, totalItems] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip,
        take,
        include: this.employeeInclude,
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
        omit: {
          passwordHash: true,
        },
      }),
      prisma.employee.count({ where }),
    ]);
    return {
      data: employees,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findOutletTeam(query: OutletTeamQuery, outletId: string) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const where: Prisma.EmployeeWhereInput = { currentOutletId: outletId, role: { in: [Role.DRIVER, Role.WORKER] } };
    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      ];
    }
    if (query.role) where.role = query.role;
    if (query.workStatus) where.workStatus = query.workStatus;
    if (query.stationType) {
      where.workerTasks = {
        some: {
          stationType: query.stationType,
          status: { in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.IN_PROGRESS, WorkerAssignmentStatus.ON_HOLD_BYPASS] },
        },
      };
    }
    const [employees, totalItems] = await prisma.$transaction([
      prisma.employee.findMany({
        where,
        skip,
        take,
        orderBy: {
          [query.sortBy]: query.sortOrder,
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
                in: [WorkerAssignmentStatus.ASSIGNED, WorkerAssignmentStatus.ON_HOLD_BYPASS, WorkerAssignmentStatus.IN_PROGRESS],
              },
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              stationType: true,
              status: true,
              assignedAt: true,
              startedAt: true,
            },
          },
          driverTasks: {
            where: {
              status: {
                in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS],
              },
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              taskType: true,
              status: true,
              assignedAt: true,
              pickedUpAt: true,
            },
          },
        },
      }),
      prisma.employee.count({
        where,
      }),
    ]);
    return {
      data: employees,
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findCurrentOutletAttendance(query: OutletAttendanceQuery, outletId: string) {
    const { page, pageSize, skip, take } = PaginationHelper.paginate(query);
    const selectedDate = query.date ?? new Date();
    selectedDate.setHours(7, 0, 0, 0);
    const where: Prisma.EmployeeWhereInput = {
      currentOutletId: outletId,
      role: query.role ? query.role : { in: [Role.DRIVER, Role.WORKER] },
      ...(query.search && {
        OR: [{ name: { contains: query.search, mode: "insensitive" } }, { email: { contains: query.search, mode: "insensitive" } }],
      }),
    };
    const employees = await prisma.employee.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        attendances: {
          where: {
            attendanceDate: selectedDate,
          },
          select: {
            id: true,
            attendanceDate: true,
            clockInAt: true,
            clockOutAt: true,
          },
          take: 1,
        },
      },
    });
    const attendance = employees.map((employee) => {
      const attendance = employee.attendances[0];
      let status: AttendanceStatus;
      if (!attendance?.clockInAt) status = AttendanceStatus.NOT_CLOCKED_IN;
      else if (!attendance.clockOutAt) status = AttendanceStatus.CLOCKED_IN;
      else status = AttendanceStatus.CLOCKED_OUT;
      return {
        employeeId: employee.id,
        employeeName: employee.name,
        employeeEmail: employee.email,
        role: employee.role,
        attendanceDate: attendance?.attendanceDate ?? selectedDate,
        clockInAt: attendance?.clockInAt ?? null,
        clockOutAt: attendance?.clockOutAt ?? null,
        status,
      };
    });
    const filteredAttendance = query.status ? attendance.filter((item) => item.status === query.status) : attendance;
    filteredAttendance.sort((a, b) => {
      if (query.sortBy === "name") {
        const comparison = a.employeeName.localeCompare(b.employeeName);
        return query.sortOrder === "desc" ? -comparison : comparison;
      }
      const firstValue = query.sortBy === "clockInAt" ? a.clockInAt : a.clockOutAt;
      const secondValue = query.sortBy === "clockInAt" ? b.clockInAt : b.clockOutAt;

      const firstTime = firstValue?.getTime() ?? 0;
      const secondTime = secondValue?.getTime() ?? 0;

      const comparison = firstTime - secondTime;

      return query.sortOrder === "desc" ? -comparison : comparison;
    });

    const totalItems = filteredAttendance.length;
    const data = filteredAttendance.slice(skip, skip + take);
    const summary = {
      totalEmployees: employees.length,
      notClockedIn: attendance.filter((item) => item.status === AttendanceStatus.NOT_CLOCKED_IN).length,
      clockedIn: attendance.filter((item) => item.status === AttendanceStatus.CLOCKED_IN).length,
      clockedOut: attendance.filter((item) => item.status === AttendanceStatus.CLOCKED_OUT).length,
    };
    return {
      data: {
        summary,
        data,
      },
      meta: PaginationHelper.meta(page, pageSize, totalItems),
    };
  }
  static async findById(id: string) {
    return await prisma.employee.findUnique({
      where: { id, deletedAt: null },
      include: this.employeeInclude,
    });
  }
  static async findByEmail(email: string) {
    return await prisma.employee.findUnique({
      where: { email },
    });
  }
  static async create(data: Prisma.EmployeeCreateInput) {
    return await prisma.employee.create({ data, include: this.employeeInclude });
  }
  static async update(id: string, data: Prisma.EmployeeUpdateInput) {
    return await prisma.employee.update({ where: { id }, data, include: this.employeeInclude });
  }
}

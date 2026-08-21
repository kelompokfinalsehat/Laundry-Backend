import { assign } from "nodemailer/lib/shared";
import { CustomerStatus, DriverAssignmentStatus, PickupDeliveryType, WorkStatus, type Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";

const ACTIVE_TASK_SELECT = {
  id: true,
  taskType: true,
  status: true,
  pickedUpAt: true,
  order: {
    select: {
      orderCode: true,
      pickupScheduledAt: true,
      addressSnapshot: true,
      addressPhoneSnapshot: true,
      addressLatitude: true,
      addressLongitude: true,
      customer: { select: { name: true } },
    },
  },
  outlet: {
    select: { name: true, address: true, latitude: true, longitude: true },
  },
} satisfies Prisma.DriverAssignmentSelect;

export class DriverRepository {
  static async findAvailablePaginated({
    where,
    skip,
    take,
    sortOrder,
  }: {
    where: Prisma.DriverAssignmentWhereInput;
    skip: number;
    take: number;
    sortOrder: "asc" | "desc";
  }) {
    return prisma.$transaction([
      prisma.driverAssignment.count({ where }),
      prisma.driverAssignment.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: sortOrder },
        select: { id: true, taskType: true, createdAt: true, order: { select: { id: true, orderCode: true } } },
      }),
    ]);
  }

  // Mencari tugas aktif driver yg sedang login -> Mencegah claim 2 tugas, RULES satu driver satu tugas yg boleh di-claim
  static async findActiveByDriverId(driverId: string) {
    const activeAssignment = await prisma.driverAssignment.findFirst({
      where: { driverId, status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] } },
      select: { id: true },
    });
    return activeAssignment;
  }

  static async claimTransaction({ assignmentId, driverId, outletId }: { assignmentId: string; driverId: string; outletId: string }) {
    return await prisma.$transaction(async (tx) => {
      const claim = await tx.driverAssignment.updateMany({
        where: { id: assignmentId, driverId: null, outletId: outletId, status: DriverAssignmentStatus.QUEUED, assignedAt: null },
        data: { driverId: driverId, assignedAt: new Date(), status: DriverAssignmentStatus.ASSIGNED },
      });
      if (claim.count !== 1) throw new ResponseError("ASSIGNMENT_ALREADY_CLAIMED");
      const updateWorkStatus = await tx.employee.updateMany({
        where: { id: driverId, workStatus: WorkStatus.AVAILABLE },
        data: { workStatus: WorkStatus.BUSY },
      });
      if (updateWorkStatus.count !== 1) throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
      return await tx.driverAssignment.findFirst({
        where: { id: assignmentId, driverId: driverId, status: DriverAssignmentStatus.ASSIGNED },
        select: { id: true, taskType: true, assignedAt: true, status: true },
      });
    });
  }

  static async findActiveAssignmentDetail(driverId: string) {
    const activeAssignment = await prisma.driverAssignment.findFirst({
      where: {
        driverId: driverId,
        status: { in: [DriverAssignmentStatus.ASSIGNED, DriverAssignmentStatus.IN_PROGRESS] },
      },
      select: ACTIVE_TASK_SELECT,
    });
    return activeAssignment;
  }

  static async startTransaction({ assignmentId, driverId }: { assignmentId: string; driverId: string }) {
    return prisma.$transaction(async (tx) => {
      const updateAssignment = await tx.driverAssignment.updateManyAndReturn({
        where: { id: assignmentId, driverId: driverId, status: DriverAssignmentStatus.ASSIGNED },
        data: { status: DriverAssignmentStatus.IN_PROGRESS },
        select: { id: true, taskType: true, status: true, order: { select: { id: true, orderCode: true } } },
      });
      const assignment = updateAssignment[0];
      if (!assignment) throw new ResponseError("INVALID_STATE_TRANSITION", "Perubahan status gagal");
      const expectedOrderStatus =
        assignment.taskType === PickupDeliveryType.PICKUP ? CustomerStatus.WAITING_DRIVER_PICKUP : CustomerStatus.READY_FOR_DELIVERY;
      const updateCustomerStatus = await tx.order.updateMany({
        where: { id: assignment.order.id, customerStatus: expectedOrderStatus },
        data: { customerStatus: CustomerStatus.ON_THE_WAY_TO_CUSTOMER },
      });
      if (updateCustomerStatus.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Perubahan status gagal!");
      return { id: assignment.id, taskType: assignment.taskType, status: assignment.status };
    });
  }

  static async pickupTransaction({ assignmentId, driverId }: { assignmentId: string; driverId: string }) {
    return await prisma.$transaction(async (tx) => {
      const updateAssignment = await tx.driverAssignment.updateManyAndReturn({
        where: {
          id: assignmentId,
          driverId: driverId,
          status: DriverAssignmentStatus.IN_PROGRESS,
          taskType: PickupDeliveryType.PICKUP,
          pickedUpAt: null,
        },
        data: { pickedUpAt: new Date() },
        select: { id: true, taskType: true, status: true, pickedUpAt: true, order: { select: { id: true, orderCode: true } } },
      });
      const assignment = updateAssignment[0];
      if (!assignment) throw new ResponseError("INVALID_STATE_TRANSITION", "Perubahan status gagal!");
      const updateCustomerStatus = await tx.order.updateMany({
        where: { id: assignment.order.id, customerStatus: CustomerStatus.ON_THE_WAY_TO_CUSTOMER },
        data: { customerStatus: CustomerStatus.ON_THE_WAY_TO_OUTLET },
      });
      if (updateCustomerStatus.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Perubahan status gagal");
      return { id: assignment.id, taskType: assignment.taskType, status: assignment.status, pickedUpat: assignment.pickedUpAt };
    });
  }

  static async completeDeliveryTransaction({ assignmentId, driverId }: { assignmentId: string; driverId: string }) {
    return await prisma.$transaction(async (tx) => {
      const updateAssignment = await tx.driverAssignment.updateManyAndReturn({
        where: {
          id: assignmentId,
          driverId: driverId,
          taskType: PickupDeliveryType.DELIVERY,
          status: DriverAssignmentStatus.IN_PROGRESS,
          deliveredAt: null,
        },
        data: { status: DriverAssignmentStatus.COMPLETED, deliveredAt: new Date(), completedAt: new Date() },
        select: { id: true, taskType: true, status: true, deliveredAt: true, completedAt: true, order: { select: { id: true, orderCode: true } } },
      });
      const assignment = updateAssignment[0];
      if (!assignment) throw new ResponseError("INVALID_STATE_TRANSITION", "Perubahan status gagal!");
      const updateCustomerStatus = await tx.order.updateMany({
        where: { id: assignment.order.id, customerStatus: CustomerStatus.ON_THE_WAY_TO_CUSTOMER },
        data: { customerStatus: CustomerStatus.WAITING_CUSTOMER_CONFIRMATION },
      });
      if (updateCustomerStatus.count !== 1) throw new ResponseError("INVALID_STATE_TRANSITION", "Perubahan status gagal");
      await tx.employee.update({ where: { id: driverId, workStatus: WorkStatus.BUSY }, data: { workStatus: WorkStatus.AVAILABLE } });
      return { id: assignment.id, taskType: assignment.taskType, status: assignment.status, deliveredAt: assignment.deliveredAt };
    });
  }

  static async findHistoryPaginated({
    where,
    skip,
    take,
    sortOrder,
  }: {
    where: Prisma.DriverAssignmentWhereInput;
    skip: number;
    take: number;
    sortOrder: "asc" | "desc";
  }) {
    return prisma.$transaction([
      prisma.driverAssignment.count({ where }),
      prisma.driverAssignment.findMany({
        where,
        skip,
        take,
        orderBy: { completedAt: sortOrder },
        select: { id: true, taskType: true, completedAt: true, order: { select: { id: true, orderCode: true } } },
      }),
    ]);
  }

  static async findCompleteByDetail({ driverId, assignmentId }: { driverId: string; assignmentId: string }) {
    const assignment = await prisma.driverAssignment.findFirst({
      where: { id: assignmentId, driverId: driverId, status: DriverAssignmentStatus.COMPLETED },
      select: {
        id: true,
        status: true,
        taskType: true,
        assignedAt: true,
        pickedUpAt: true,
        deliveredAt: true,
        completedAt: true,
        order: { select: { orderCode: true, addressSnapshot: true, addressPhoneSnapshot: true, customer: { select: { name: true } } } },
        outlet: { select: { name: true, address: true } },
      },
    });
    return assignment;
  }
}

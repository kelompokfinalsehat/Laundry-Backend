import { Prisma, AccountStatus, DriverAssignmentStatus, Role } from "../../../generated/prisma";
import { DriverAssignment, Employee, PickupDeliveryType } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export const ACTIVE_TASK_SELECT = {
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

export type ActiveAssignmentData = Prisma.DriverAssignmentGetPayload<{ select: typeof ACTIVE_TASK_SELECT }>;
export interface BaseTaskResponse {
  id: string;
  taskType: PickupDeliveryType;
  status: DriverAssignmentStatus;
  orderCode: string;
  state: string;
  action: string | null;
}

export interface CustomerDestination {
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
}
export class DriverHelper {
  // CHECKER UMUM untuk beberapa function
  static assertDriver(driver: Employee | null): asserts driver is Employee {
    if (!driver) throw new ResponseError("RESOURCE_NOT_FOUND", "Akun tidak ditemukan");
    if (driver.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (driver.role !== Role.DRIVER) throw new ResponseError("FORBIDDEN");
    if (driver.currentOutletId === null)
      throw new ResponseError("INVALID_STATE_TRANSITION", "Akun belum terdaftar di outlet");
  }

  //  CHECKER untuk Claim Assignment
  // -> AssignmentId VALID, OUTLET sama dengan Driver, QUEUED belum diambil
  static assertClaimableAssignment(
    assignment: DriverAssignment | null,
    driverOutletId: string,
  ): asserts assignment is DriverAssignment {
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak ditemukan!");
    if (assignment.outletId !== driverOutletId) throw new ResponseError("OUTLET_SCOPE_FORBIDDEN");
    if (assignment.status !== DriverAssignmentStatus.QUEUED || assignment.driverId !== null)
      throw new ResponseError("ASSIGNMENT_ALREADY_CLAIMED");
  }

  // DATE-HELPER
  static getAttendanceDateWIB(date: Date = new Date()) {
    const dateWIB = date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
    return new Date(`${dateWIB}T00:00:00.000Z`); // Mendapat Tanggal YY}YY-MM-DD
  }

  // TASK STATE dan ACTION -> Method /active
  private static getAssignmentState(assignment: ActiveAssignmentData) {
    // PICKUP
    if (assignment.taskType === PickupDeliveryType.PICKUP) {
      if (assignment.status === DriverAssignmentStatus.ASSIGNED) return "PICKUP_ASSIGNED";
      if (assignment.pickedUpAt !== null) return "PICKUP_TO_OUTLET";
      return "PICKUP_TO_CUSTOMER";
    }
    // DELIVERY
    if (assignment.status === DriverAssignmentStatus.ASSIGNED) return "DELIVERY_ASSIGNED";
    return "DELIVERY_TO_CUSTOMER";
  }

  private static getAssignmentAction(state: string) {
    if (state === "PICKUP_ASSIGNED") return "START_PICKUP";
    if (state === "PICKUP_TO_CUSTOMER") return "CONFIRM_PICKUP";
    if (state === "PICKUP_TO_OUTLET") return null;
    if (state === "DELIVERY_ASSIGNED") return "START_DELIVERY";
    if (state === "DELIVERY_TO_CUSTOMER") return "COMPLETE_DELIVERY";
    return null;
  }

  private static getBaseResponse(assignment: ActiveAssignmentData, state: string) {
    return {
      id: assignment.id,
      taskType: assignment.taskType,
      status: assignment.status,
      orderCode: assignment.order.orderCode,
      state,
      action: this.getAssignmentAction(state),
    };
  }
  private static getCustomerDest(assignment: ActiveAssignmentData) {
    return {
      name: assignment.order.customer.name,
      phone: assignment.order.addressPhoneSnapshot,
      latitude: Number(assignment.order.addressLatitude),
      longitude: Number(assignment.order.addressLongitude),
    };
  }

  static buildActiveResponse(assignment: ActiveAssignmentData) {
    const state = this.getAssignmentState(assignment);
    const base = this.getBaseResponse(assignment, state);
    const customerDest = this.getCustomerDest(assignment);
    const outletDest = { outletName: assignment.outlet.name, address: assignment.outlet.address };
    // LOGIC untuk delivery
    if (assignment.taskType === PickupDeliveryType.DELIVERY) {
      return { ...base, destination: customerDest };
    }
    // LOGIC untuk pickup
    if (state === "PICKUP_TO_OUTLET") {
      return { ...base, destination: outletDest };
    }
    if (state === "PICKUP_ASSIGNED") {
      return { ...base, destination: customerDest, pickupScheduledAt: assignment.order.pickupScheduledAt };
    }
    return { ...base, destination: customerDest };
  }

  // CHECKER untuk /start-task
  static assertStartableAssignment(
    assignment: DriverAssignment | null,
    currentDriverId: string,
  ): asserts assignment is DriverAssignment {
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak ditemukan");
    if (assignment.driverId !== currentDriverId) throw new ResponseError("FORBIDDEN");
    if (assignment.status !== DriverAssignmentStatus.ASSIGNED) throw new ResponseError("INVALID_STATE_TRANSITION");
  }

  static assertPickupableAssignment(
    assignment: DriverAssignment | null,
    currentDriverId: string,
  ): asserts assignment is DriverAssignment {
    if (!assignment) throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas tidak ditemukan!");
    if (assignment.driverId !== currentDriverId) throw new ResponseError("FORBIDDEN");
    if (assignment.status !== DriverAssignmentStatus.IN_PROGRESS) throw new ResponseError("INVALID_STATE_TRANSITION");
    if (assignment.pickedUpAt !== null) throw new ResponseError("CONFLICT");
  }
}

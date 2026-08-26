import { AccountStatus, DriverAssignmentStatus, Role } from "../../../generated/prisma";
import { Employee, PickupDeliveryType } from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";
import type { DriverActiveAssignmentDetail } from "./driver.types";

export class DriverHelper {
  // CHECKER UMUM untuk beberapa function
  static assertDriver(driver: Employee | null): asserts driver is Employee & { currentOutletId: string } {
    if (!driver) throw new ResponseError("RESOURCE_NOT_FOUND", "Data tidak ditemukan!");
    if (driver.accountStatus !== AccountStatus.ACTIVE) throw new ResponseError("ACCOUNT_NOT_ACTIVE");
    if (driver.role !== Role.DRIVER) throw new ResponseError("FORBIDDEN");
    if (driver.currentOutletId === null) throw new ResponseError("INVALID_STATE_TRANSITION", "Driver belum memiliki outlet aktif!");
  }

  // DATE-HELPER
  static getAttendanceDateWIB(date: Date = new Date()) {
    const dateWIB = date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
    return new Date(`${dateWIB}T00:00:00.000Z`); // Mendapat Tanggal YY}YY-MM-DD
  }

  // TASK STATE dan ACTION -> Method /active
  private static getAssignmentState(assignment: DriverActiveAssignmentDetail) {
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

  private static getBaseResponse(assignment: DriverActiveAssignmentDetail, state: string) {
    return {
      id: assignment.id,
      taskType: assignment.taskType,
      status: assignment.status,
      order: {
        id: assignment.order.id,
        orderCode: assignment.order.orderCode,
      },
      state,
      action: this.getAssignmentAction(state),
    };
  }
  private static getCustomerDestination(assignment: DriverActiveAssignmentDetail) {
    return {
      name: assignment.order.customer.name,
      address: assignment.order.addressSnapshot,
      phone: assignment.order.addressPhoneSnapshot,
      latitude: Number(assignment.order.addressLatitude),
      longitude: Number(assignment.order.addressLongitude),
    };
  }

  static buildActiveResponse(assignment: DriverActiveAssignmentDetail) {
    const state = this.getAssignmentState(assignment);
    const base = this.getBaseResponse(assignment, state);
    const customerDest = this.getCustomerDestination(assignment);
    const outletDest = {
      name: assignment.outlet.name,
      address: assignment.outlet.address,
      latitude: Number(assignment.outlet.latitude),
      longitude: Number(assignment.outlet.longitude),
    };
    // LOGIC untuk delivery
    if (assignment.taskType === PickupDeliveryType.DELIVERY) {
      return { ...base, destination: customerDest };
    }
    // LOGIC untuk pickup
    if (state === "PICKUP_TO_OUTLET") {
      return { ...base, destination: outletDest, message: "Menunggu konfirmasi dari Outlet Admin" };
    }
    if (state === "PICKUP_ASSIGNED") {
      return { ...base, destination: customerDest, pickupScheduledAt: assignment.order.pickupScheduledAt };
    }
    return { ...base, destination: customerDest };
  }

  static getMonthRange(period: string) {
    const year = Number(period.slice(0, 4));
    const month = Number(period.slice(5, 7));
    const WIB_OFFSET = 7 * 60 * 60 * 1000;
    const startDate = new Date(Date.UTC(year, month - 1, 1) - WIB_OFFSET);
    const endDate = new Date(Date.UTC(year, month, 1) - WIB_OFFSET);
    return { startDate, endDate };
  }
}

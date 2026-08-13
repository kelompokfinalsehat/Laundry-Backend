import {
  AccountStatus,
  DriverAssignmentStatus,
  PickupDeliveryType,
  Role,
  type Attendance,
  type DriverAssignment,
  type Employee,
  type WorkStatus,
} from "../../../generated/prisma";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class DriverChecker {
  // driver checker umum sesuai rules:
  /*
  Rules : 
  1. Employee memang ada.
  2. Acc masih ACTIVE.
  3. Rolenya memang DRIVER.
  4. Driver telah ditempatkan di Outlet  
  */
  static verifyDriver(driver: Employee | null): asserts driver is Employee {
    if (!driver) {
      throw new ResponseError("RESOURCE_NOT_FOUND", "Akun tidak ditemukan");
    }
    if (driver.accountStatus !== AccountStatus.ACTIVE) {
      throw new ResponseError("ACCOUNT_NOT_ACTIVE", "Akun anda tidak aktif!");
    }
    if (driver.role !== Role.DRIVER) {
      throw new ResponseError("FORBIDDEN", "Role anda tidak diijinkan mengakses fitur!");
    }
    if (driver.currentOutletId === null) {
      throw new ResponseError(
        "INVALID_STATE_TRANSITION",
        "Akun belum terdaftar di outlet, silahkan hubungi admin outlet!",
      );
    }
  }

  static verifyWorkStatus(driver: Employee, expectedWorkStatus: WorkStatus) {
    if (driver.workStatus !== expectedWorkStatus) {
      throw new ResponseError("WORK_STATUS_NOT_AVAILABLE");
    }
  }

  // Checker untuk CLAIM ASSIGNMENT
  /*Rulesnya : 
  1. Assignment valid bila id ditemukan
  2. Outletnya sama dengan Driver.
  3. Statusnya masih QUEUED dan belum mempunyai driverId
   */

  static verifyAssignmentToClaim(
    assignment: DriverAssignment | null,
    driverOutletId: string,
  ): asserts assignment is DriverAssignment {
    if (!assignment) {
      throw new ResponseError("RESOURCE_NOT_FOUND", "Tugas dengan ID tersebut tidak ditemukan!");
    }
    if (assignment.outletId !== driverOutletId) {
      throw new ResponseError("OUTLET_SCOPE_FORBIDDEN");
    }
    if (assignment.status !== DriverAssignmentStatus.QUEUED || assignment.driverId !== null) {
      throw new ResponseError("ASSIGNMENT_ALREADY_CLAIMED");
    }
  }

  static activeTaskState(assignment: {
    taskType: PickupDeliveryType;
    status: DriverAssignmentStatus;
    pickedUpAt: Date | null;
  }) {
    if (assignment.taskType === PickupDeliveryType.PICKUP) {
      if (assignment.status === DriverAssignmentStatus.ASSIGNED) {
        return "PICKUP_ASSIGNED";
      }
      if (assignment.pickedUpAt === null) {
        // Active task type hanya ada ASSIGNED & IN PROGRESS, Maka sudah pasti IN PROGRESS
        return "PICKUP_TO_CUSTOMER";
      }
      return "PICKUP_TO_OUTLET";
    }

    if (assignment.status === DriverAssignmentStatus.ASSIGNED) {
      return "DELIVERY_ASSIGNED";
    }
    return "DELIVERY_TO_CUSTOMER";
  }
  static activeTaskAction(state: string) {
    if (state === "PICKUP_ASSIGNED") return "START_PICKUP";
    if (state === "PICKUP_TO_CUSTOMER") return "CONFIRM_PICKUP";
    if (state === "PICKUP_TO_OUTLET") return null; // menunggu outlet admin input, driver tidak punya aksi lagi
    if (state === "DELIVERY_ASSIGNED") return "START_DELIVERY";
    if (state === "DELIVERY_TO_CUSTOMER") return "COMPLETE_DELIVERY";
    return null;
 }
}

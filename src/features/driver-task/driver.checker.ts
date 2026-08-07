import { AccountStatus, Role, type Employee } from "../../../generated/prisma";
import { ResponseError } from "../../utils/response-error.utils";

export class DriverChecker {
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
}

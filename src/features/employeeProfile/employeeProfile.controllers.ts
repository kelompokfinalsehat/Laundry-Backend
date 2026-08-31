import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { validate } from "../../validations/validate";
import { EmployeeProfileService } from "./employeeProfile.service";
import { EmployeeProfileValidation } from "./employeeProfile.validation";

export class EmployeeProfileController {
  static async getProfile(_req: Request, res: Response) {
    const payload = res.locals.payload;
    const result = await EmployeeProfileService.getProfile({ employeeId: payload.sub });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile berhasil diterima",
      data: result,
    });
  }

  static async updateProfile(req: Request, res: Response) {
    const payload = res.locals.payload;

    const { body } = validate(EmployeeProfileValidation.UPDATE_PROFILE, {
      body: req.body,
    });
    const result = await EmployeeProfileService.updateProfile({ employeeId: payload.sub, body });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Update profile berhasil dilakukan.",
      data: result,
    });
  }

  static async updateProfilePhoto(req: Request, res: Response) {
    const payload = res.locals.payload;
    const file = req.file;
    if (!file) throw new ResponseError("RESOURCE_NOT_FOUND", "File foto wajib diunggah.");
    const result = await EmployeeProfileService.updateProfilePhoto({ employeeId: payload.sub, file });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Foto profil berhasil diperbarui.",
      data: result,
    });
  }
}

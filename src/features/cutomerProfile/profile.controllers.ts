import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { ProfileCustomerValidation } from "./profile.validation";
import { CustomerProfileService } from "./profile.service";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class CustomerProfileController {
  static async updateCustomerProfile(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(ProfileCustomerValidation.UPDATE_PROFILE, {
      body: req.body,
    });

    const result = await CustomerProfileService.updateCustomerProfile(payload, {
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "Update profile berhasil dilakukan.",
    });
  }
  static async updateCustomerProfilePhoto(req: Request, res: Response) {
    const payload = res.locals.payload;
    const file = req.file;

    if (!file) {
      throw new ResponseError(
        "RESOURCE_NOT_FOUND",
        "File foto wajib diunggah. diunggah",
      );
    }

    const result = await CustomerProfileService.updateCustomerProfilePhoto(
      payload,
      file,
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "Foto profil baru berhasil di update",
    });
  }
  static async requestEmailChange(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(ProfileCustomerValidation.UPDATE_EMAIL, {
      body: req.body,
    });

    const result = await CustomerProfileService.requestEmailChange(payload, {
      body,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      massage: "Link konfirmasi telah dikirim ke email baru kamu.",
    });
  }
  static async confirmEmailChange(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(ProfileCustomerValidation.CONFIRM_EMAIL, {
      body: req.body,
    });

    const result = await CustomerProfileService.confirmEmailChange(payload, {
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      message: "perubahan email berahasil dilakukan ",
    });
  }
}

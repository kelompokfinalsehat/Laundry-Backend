import { Request, Response } from "express";
<<<<<<< HEAD

export class CustomerProfileController {
  static async updateCustomerProfile(req: Request, res: Response) {
   
  }
  static async updateCustomerProfilePhoto(req: Request, res: Response) {
     const payload = res.locals.payload;
    const file = req.file
=======
import { validate } from "../../validations/validate";
import { ProfileCustomerValidation } from "./profile.validation";
import { CustomerProfileService } from "./profile.service";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "../../utils/errors/response-error.utils";

export class CustomerProfileController {
  static async updateCustomerProfile(req: Request, res: Response) {
    const payload = res.locals.payload;
    console.log(payload);
    const { body } = validate(ProfileCustomerValidation.UPDATE_PROFILE, {
      body: req.body,
    });

    const result = await CustomerProfileService.updateCustomerProfile(payload, {
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
      massage: "Update profile berhasil dilakukan.",
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
      massage: "Foto profil baru berhasil di update",
    });
>>>>>>> a3c40c7 (feat(customer-profile): implement update profile and profile photo)
  }
  static async requestEmailChange(req: Request, res: Response) {}
  static async confirmEmailChange(req: Request, res: Response) {}
}

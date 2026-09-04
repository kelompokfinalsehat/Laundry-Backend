import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { AddressValidation } from "./address.validation";
import { AddressService } from "./address.services";
import { StatusCodes } from "http-status-codes";

export class AddressController {
  static async create(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { body } = validate(AddressValidation.CREATE_ADDRESS, {
      body: req.body,
    });

    const address = await AddressService.create(payload, { body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: "Alamat baru berhasil di tambahkan.",
    });
  }
  static async getAddress(req: Request, res: Response) {
    const payload = res.locals.payload;
    
    const address = await AddressService.getAddress(payload);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: "List alamat berhasil didapatkan",
    });
  }
  static async update(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params, body } = validate(AddressValidation.UPDATE_ADDRESS, {
      params: req.params,
      body: req.body,
    });

   const address =  await AddressService.update(payload, { params, body });

   return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: "Alamat berhasil di perbarui.",
    });
  }
  static async delete(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(AddressValidation.ADDRESS_ID, {
      params: req.params,
    });

   const address = await AddressService.delete(payload,{params})

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: `${address} berhasil di hapus dari alamat anda`,
    });
  }
  static async setPrimary(req: Request, res: Response) {
    const payload = res.locals.payload;
    const { params } = validate(AddressValidation.ADDRESS_ID, {
      params: req.params,
    });

    const address = await AddressService.setPrimary(payload,{params})

    return res.status(StatusCodes.OK).json({
      success: true,
      data: address,
      message: `${address} berhasil dijadikan sebagai alamat utama`,
    });
  }
}

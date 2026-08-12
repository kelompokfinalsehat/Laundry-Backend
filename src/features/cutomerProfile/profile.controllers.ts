import { Request, Response } from "express";

export class CustomerProfileController {
  static async updateCustomerProfile(req: Request, res: Response) {
   
  }
  static async updateCustomerProfilePhoto(req: Request, res: Response) {
     const payload = res.locals.payload;
    const file = req.file
  }
  static async requestEmailChange(req: Request, res: Response) {}
  static async confirmEmailChange(req: Request, res: Response) {}
}

import { Request, Response } from "express";
import { AuthCustomerValidation } from "./AuthCustomer.validation";
import { validate } from "../../validations/validate";
import { AuthCustomerService } from "./authCustomer.services";
import { StatusCodes } from "http-status-codes";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";

export class AuthCustomerController {
  static async register(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.REGISTER_CUSTOMER, {
      body: req.body,
    });
    const result = await AuthCustomerService.register({ body });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: result,
    });
  }

  static async verifyCustomerEmail(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.VERIFY_EMAIL_CUSTOMER, {
      body: req.body,
    });

    const result = await AuthCustomerService.verifyCustomerEmail({
      body,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async resendVerification(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.REGISTER_CUSTOMER, {
      body: req.body,
    });

    const result = await AuthCustomerService.resendVerification({ body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async login(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.LOGIN_CUSTOMER, {
      body: req.body,
    });

    const customer = await AuthCustomerService.login({ body });

    const accessToken = JWTUtil.signAccessToken({
      sub: customer.id,
      accountType: "customer",
      role: customer.role,
    });

    const refreshToken = await RefreshTokenService.issue({
      customerId: customer.id,
    });

    AuthCookieUtil.setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: { user: customer, homeUrl: "/beranda" },
      massage: "login berhasil",
    });
  }

  static async loginGoogle(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.GOOGLE_LOGIN, {
      body: req.body,
    });

    const customer = await AuthCustomerService.loginGoogle({ body });

    const accessToken = JWTUtil.signAccessToken({
      sub: customer.id,
      accountType: "customer",
      role: customer.role,
    });

    const refreshToken = await RefreshTokenService.issue({
      customerId: customer.id,
    });

    AuthCookieUtil.setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: { user: customer, homeUrl: "/beranda" },
    });
  }

  static async forgotPassword(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.FORGOT_PASSWORD, {
      body: req.body,
    });

   const result = await AuthCustomerService.forgotPassword({body})
    
   return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async resetPassword(req: Request, res: Response) {
    const { body } = validate(AuthCustomerValidation.RESET_PASSWORD, {
      body: req.body,
    });

    const result = await AuthCustomerService.resetPassword({body})

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }
}

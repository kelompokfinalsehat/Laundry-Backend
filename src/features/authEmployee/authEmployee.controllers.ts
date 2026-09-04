import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { AuthEmployeeValidation } from "./authEmployee.validation";
import { AuthEmployeeService } from "./authEmployee.services";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";
import { StatusCodes } from "http-status-codes";

export class AuthEmployeeController {
  static async login(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.LOGIN_EMPLOYEE, {
      body: req.body,
    });
     const employee = await AuthEmployeeService.login({ body });
    const accessToken = JWTUtil.signAccessToken({
      sub: employee.id,
      accountType: "employee",
      role: employee.role,
    });

    const refreshToken = await RefreshTokenService.issue({
      employeeId: employee.id,
    });

    AuthCookieUtil.setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: employee,
      message: "login berhasil",
    });
  }

  static async acceptInvitation(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.ACCEPT_INVITATION, {
      body: req.body,
    });

    const result = await AuthEmployeeService.acceptInvitation({ body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async forgotPassword(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.FORGOT_PASSWORD, {
      body: req.body,
    });

    const result = await AuthEmployeeService.forgotPassword({ body });

    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }

  static async resetPasword(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.RESET_PASSWORD, {
      body: req.body,
    });

    const result = await AuthEmployeeService.resetPasword({ body });
    return res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  }
}

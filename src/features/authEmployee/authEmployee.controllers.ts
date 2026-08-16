import { Request, Response } from "express";
import { validate } from "../../validations/validate";
import { AuthEmployeeValidation } from "./authEmployee.validation";
import { AuthEmployeeService } from "./authEmployee.services";
import { JWTUtil } from "../../utils/Auth/jwt.utils";
import { RefreshTokenService } from "../../utils/Auth/refreshToken.utils";
import { AuthCookieUtil } from "../../utils/Auth/cookie.utils";
import { ResponseHelper } from "../../helpers/response.helper";
import { Message } from "../../constants/message.constant";

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
      employeeId: employee.id
    })

    AuthCookieUtil.setAuthCookies(res, accessToken,refreshToken)
    return ResponseHelper.success(res, "Login Berhasil", employee)
  }

  static async acceptInvitation(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.ACCEPT_INVITATION, {
      body: req.body,
    });

    await AuthEmployeeService.acceptInvitation({ body });
    return ResponseHelper.success(res, "Berhasil set password.", null)
  }

  static async forgotPassword(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.FORGOT_PASSWORD, {
      body: req.body,
    });

    await AuthEmployeeService.forgotPassword({ body });
    return ResponseHelper.success(res, "Link reset password telah dikirim ke email.", null)
  }

  static async resetPasword(req: Request, res: Response) {
    const { body } = validate(AuthEmployeeValidation.RESET_PASSWORD, {
      body: req.body,
    });

    await AuthEmployeeService.resetPasword({ body });
    return ResponseHelper.success(res, "Reset password berhasil.", null)
  }
}

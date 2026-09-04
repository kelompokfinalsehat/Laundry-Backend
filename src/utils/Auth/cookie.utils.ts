import { Response } from "express";
import { TOKEN_MAX_AGE_MS } from "../../configs/env.config";

export class AuthCookieUtil {
  private static readonly isProd = process.env.NODE_ENV === "production";

  static setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? "none" : "strict",
      path: "/",
      maxAge: TOKEN_MAX_AGE_MS,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? "none" : "strict",
      path: "/",
      maxAge: TOKEN_MAX_AGE_MS,
    });
  }

  static clearAuthCookies(res: Response): void {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? "none" : "strict",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? "none" : "strict",
      path: "/",
    });
  }
}
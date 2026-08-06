import { Response } from "express";

export class AuthCookieUtil {
  private static readonly isProd = process.env.NODE_ENV === "production";

  private static readonly ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;
  private static readonly REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

  static setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      maxAge: this.ACCESS_TOKEN_MAX_AGE,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      maxAge: this.REFRESH_TOKEN_MAX_AGE,
      path: "/api/v1/auth",
    });
  }

  static clearAuthCookies(res: Response): void {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      path: "/api/v1/auth",
    });
  }
}
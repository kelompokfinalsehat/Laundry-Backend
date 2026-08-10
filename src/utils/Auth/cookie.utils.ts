import { Response } from "express";
import { ACCESS_TOKEN_MAX_AGE_MS, REFRESH_TOKEN_MAX_AGE_MS } from "../../configs/env.config";

export class AuthCookieUtil {
  private static readonly isProd = process.env.NODE_ENV === "production";

  static setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      maxAge: ACCESS_TOKEN_MAX_AGE_MS,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: this.isProd,
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE_MS,
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
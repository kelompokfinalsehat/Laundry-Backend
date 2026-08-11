import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../../configs/env.config";
import { ResponseError } from "../errors/response-error.utils";

export type GoogleProfile = {
  email: string;
  name: string;
  emailVerified: boolean;
};

export class GoogleAuthService {
  private static readonly client = new OAuth2Client(GOOGLE_CLIENT_ID);

  /**
   * Verifikasi idToken ke server Google (bukan cuma decode payload-nya doang
   * di sisi kita) — ini yang memastikan token beneran diterbitkan Google
   * buat client ID kita, bukan dipalsukan / dipakai buat aplikasi lain.
   */
  static async verifyIdToken(idToken: string): Promise<GoogleProfile> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new ResponseError("INVALID_TOKEN", "Google token tidak valid.");
    }

    return {
      email: payload.email,
      name: payload.name ?? "",
      emailVerified: payload.email_verified ?? false,
    };
  }
}

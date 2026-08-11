import crypto from "crypto";

export class AuthTokenUtil {
  private static readonly TOKEN_BYTES = 32;

  static generateRawToken(): string {
    return crypto.randomBytes(this.TOKEN_BYTES).toString("hex");
  }

  static hashToken(rawToken: string): string {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
  }

  static addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  static generateTokenPair(): { rawToken: string; tokenHash: string } {
    const rawToken = this.generateRawToken();
    const tokenHash = this.hashToken(rawToken);
    return { rawToken, tokenHash };
  }
}
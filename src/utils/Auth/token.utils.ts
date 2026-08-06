import crypto from "crypto";

export class AuthTokenUtil {
  private static readonly TOKEN_BYTES = 32;

  /**
   * Generate raw token acak untuk dikirim ke user (email verification,
   * password reset, account invitation). JANGAN disimpan langsung ke DB
   * — simpan hasil hashToken()-nya saja.
   */
  static generateRawToken(): string {
    return crypto.randomBytes(this.TOKEN_BYTES).toString("hex");
  }

  /**
   * Hash raw token sebelum disimpan ke database. Raw token yang dikirim
   * ke user TIDAK PERNAH disimpan utuh, hanya hash-nya (mirip penyimpanan
   * password).
   */
  static hashToken(rawToken: string): string {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
  }

  /**
   * Hitung tanggal kedaluwarsa token, `hours` jam dari `date`.
   */
  static addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  /**
   * Shortcut: generate raw token + hash-nya sekaligus, dipakai bareng
   * saat membuat AuthToken baru (raw dikirim ke user, hash disimpan ke DB).
   */
  static generateTokenPair(): { rawToken: string; tokenHash: string } {
    const rawToken = this.generateRawToken();
    const tokenHash = this.hashToken(rawToken);
    return { rawToken, tokenHash };
  }
}
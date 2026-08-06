import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../errors/response-error.utils";
import { AuthTokenUtil } from "./token.utils";

const REFRESH_TOKEN_EXPIRY_HOURS = 30 * 24; // 30 hari

export type TokenOwner =
  | { customerId: string; employeeId?: undefined }
  | { employeeId: string; customerId?: undefined };

export class RefreshTokenService {
  private static readonly EXPIRY_HOURS = REFRESH_TOKEN_EXPIRY_HOURS;

  /**
   * Convert TokenOwner jadi object Prisma-safe — cuma menyertakan key
   * yang benar-benar terisi, supaya cocok dengan exactOptionalPropertyTypes.
   */
  private static toOwnerFields(
    owner: TokenOwner,
  ): { customerId: string } | { employeeId: string } {
    return owner.customerId
      ? { customerId: owner.customerId }
      : { employeeId: owner.employeeId! };
  }

  /**
   * Menerbitkan refresh token baru untuk owner (customer/employee).
   */
  static async issue(owner: TokenOwner): Promise<string> {
    const rawToken = AuthTokenUtil.generateRawToken();
    const tokenHash = AuthTokenUtil.hashToken(rawToken);
    const expiresAt = AuthTokenUtil.addHours(new Date(), this.EXPIRY_HOURS);

    await prisma.refreshToken.create({
      data: {
        ...this.toOwnerFields(owner),
        tokenHash,
        expiresAt,
      },
    });

    return rawToken;
  }

  /**
   * Validasi refresh token, lalu ROTATE: token lama di-revoke, token baru
   * diterbitkan. Melempar AppError kalau token nggak valid/expired/revoked —
   * pesannya dibedakan biar controller bisa nentuin respons yang tepat
   * (paksa login ulang vs sekadar tolak).
   */
  static async rotate(
    rawToken: string,
  ): Promise<{ owner: TokenOwner; newRawToken: string }> {
    const tokenHash = AuthTokenUtil.hashToken(rawToken);
    const record = await prisma.refreshToken.findUnique({ where: { tokenHash } });

    const isValid = record && !record.revokedAt && record.expiresAt > new Date();

    if (!isValid) {
      throw new ResponseError(
        "TOKEN_EXPIRED",
        "Sesi berakhir, silakan login ulang.",
      );
    }

    const owner: TokenOwner = record.customerId
      ? { customerId: record.customerId }
      : { employeeId: record.employeeId! };

    const [, newRawToken] = await prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: { id: record.id },
        data: { revokedAt: new Date() },
      });

      const raw = AuthTokenUtil.generateRawToken();

      await tx.refreshToken.create({
        data: {
          ...this.toOwnerFields(owner),
          tokenHash: AuthTokenUtil.hashToken(raw),
          expiresAt: AuthTokenUtil.addHours(new Date(), this.EXPIRY_HOURS),
        },
      });

      return [null, raw] as const;
    });

    return { owner, newRawToken };
  }

  /**
   * Revoke satu refresh token (dipakai saat logout).
   * Pakai updateMany, bukan update — biar nggak error kalau tokennya udah
   * nggak ada/nggak valid (logout tetap harus "berhasil" dari sisi user).
   */
  static async revoke(rawToken: string): Promise<void> {
    const tokenHash = AuthTokenUtil.hashToken(rawToken);

    await prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}
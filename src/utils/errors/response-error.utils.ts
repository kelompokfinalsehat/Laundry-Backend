/**
 * response-error.util.ts
 *
 * Class error yang dipakai di seluruh aplikasi. Cukup panggil dengan SATU
 * key dari errors.ts, status HTTP dan error code otomatis ikut.
 *
 * Contoh pemakaian paling umum (pakai pesan default dari errors.ts):
 *
 *   throw new ResponseError('CLOCK_OUT_BLOCKED');
 *
 * Contoh dengan pesan custom (kalau butuh detail spesifik untuk kasus ini):
 *
 *   throw new ResponseError(
 *     'QUANTITY_MISMATCH',
 *     'Kaos: seharusnya 5, yang diinput 4.'
 *   );
 *
 * Contoh dengan detail per-field (khusus VALIDATION_ERROR, biar frontend bisa
 * highlight input mana yang salah):
 *
 *   throw new ResponseError(
 *     'VALIDATION_ERROR',
 *     undefined,
 *     { email: ['Format email tidak valid.'] }
 *   );
 */

import { AppErrors, AppErrorKey } from "./errors";

export class ResponseError extends Error {
  statusCode: number;
  code: string;
  fields?: Record<string, string[]>;

  constructor(
    errorKey: AppErrorKey,
    customMessage?: string,
    fields?: Record<string, string[]>,
  ) {
    const definition = AppErrors[errorKey];

    super(customMessage ?? definition.message);

    this.statusCode = definition.status;
    this.code = definition.code;

    // Hanya di-assign kalau benar-benar ada nilainya, supaya property
    // "fields" tidak pernah ter-set sebagai undefined secara eksplisit
    // (wajib karena exactOptionalPropertyTypes: true di tsconfig).
    if (fields !== undefined) {
      this.fields = fields;
    }

    // Wajib untuk custom Error class di TypeScript yang di-compile ke ES5/CommonJS,
    // supaya `instanceof ResponseError` tetap benar setelah error di-throw/catch.
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

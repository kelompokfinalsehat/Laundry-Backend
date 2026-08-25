/**
 * ATURAN TIM:
 * - Jangan bikin ResponseError manual dengan status/code baru di luar file ini.
 * - Kalau butuh kasus error baru, tambahkan entrinya DI SINI dulu, baru dipakai.
 * - Pesan default boleh di-override per pemanggilan kalau butuh detail spesifik
 *   (lihat contoh pemakaian di response-error.util.ts).
 */

import { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";

export const AppErrors = {
  // ===== Authentication & Token =====
  AUTHENTICATION_REQUIRED: {
    code: "AUTHENTICATION_REQUIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Anda belum login atau sesi telah berakhir.",
  },

  INVALID_CREDENTIALS: {
    code: "INVALID_CREDENTIALS",
    status: StatusCodes.UNAUTHORIZED,
    message: "Email atau password salah.",
  },
  ACCOUNT_NOT_ACTIVE: {
    code: "ACCOUNT_NOT_ACTIVE",
    status: StatusCodes.FORBIDDEN,
    message: "Akun Anda belum aktif atau telah dinonaktifkan.",
  },
  EMAIL_NOT_VERIFIED: {
    code: "EMAIL_NOT_VERIFIED",
    status: StatusCodes.FORBIDDEN,
    message: "Email Anda belum diverifikasi.",
  },
  CURRENT_PASSWORD_INVALID: {
    code: "CURRENT_PASSWORD_INVALID",
    status: StatusCodes.FORBIDDEN,
    message: "Password saat ini salah.",
  },

  GOOGLE_ACCOUNT_NO_PASSWORD: {
    code: "GOOGLE_ACCOUNT_NO_PASSWORD",
    status: StatusCodes.FORBIDDEN,
    message: "Akun ini terdaftar via Google. Silakan login dengan Google.",
  },

  GOOGLE_ACCOUNT_EMAIL_LOCKED: {
    code: "GOOGLE_ACCOUNT_EMAIL_LOCKED",
    status: StatusCodes.FORBIDDEN,
    message: "Email akun Google tidak dapat diganti dari sini.",
  },
  ACCESS_TOKEN_EXPIRED: {
    code: "ACCESS_TOKEN_EXPIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Sesi kedaluwarsa. Silakan perbarui sesi Anda.",
  },
  ACCESS_TOKEN_REQUIRED: {
    code: "ACCESS_TOKEN_REQUIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token tidak ditemukan. Silakan perbarui sesi Anda.",
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token tidak valid.",
  },
  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token telah kedaluwarsa. Silakan minta ulang.",
  },
  TOKEN_ALREADY_USED: {
    code: "TOKEN_ALREADY_USED",
    status: StatusCodes.UNAUTHORIZED,
    message: "Token sudah pernah digunakan.",
  },
  EMAIL_ALREADY_REGISTERED: {
    code: "EMAIL_ALREADY_REGISTERED",
    status: StatusCodes.CONFLICT,
    message: "Email sudah terdaftar.",
  },
  INVALID_PAYMENT_SIGNATURE: {
    code: "INVALID_PAYMENT_SIGNATURE",
    status: StatusCodes.UNAUTHORIZED,
    message: "Signature webhook tidak valid.",
  },

  // ===== Authorization / Scope =====
  FORBIDDEN: {
    code: "FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "Anda tidak memiliki akses untuk melakukan aksi ini.",
  },
  OUTLET_SCOPE_FORBIDDEN: {
    code: "OUTLET_SCOPE_FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "Anda hanya dapat mengakses data outlet Anda sendiri.",
  },

  // ===== Resource & Validasi Umum =====
  RESOURCE_NOT_FOUND: {
    code: "RESOURCE_NOT_FOUND",
    status: StatusCodes.NOT_FOUND,
    message: "Data tidak ditemukan.",
  },
  VALIDATION_ERROR: {
    code: "VALIDATION_ERROR",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Data yang dikirim tidak valid.",
  },
  CONFLICT: {
    code: "CONFLICT",
    status: StatusCodes.CONFLICT,
    message: "Terjadi konflik data.",
  },
  DUPLICATE_REQUEST: {
    code: "DUPLICATE_REQUEST",
    status: StatusCodes.CONFLICT,
    message: "Request ini sudah pernah diproses sebelumnya.",
  },
  INVALID_STATE_TRANSITION: {
    code: "INVALID_STATE_TRANSITION",
    status: StatusCodes.CONFLICT,
    message: "Status saat ini tidak mengizinkan aksi tersebut.",
  },

  // ===== File Upload =====
  FILE_TYPE_NOT_ALLOWED: {
    code: "FILE_TYPE_NOT_ALLOWED",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Tipe file tidak diizinkan.",
  },
  FILE_TOO_LARGE: {
    code: "FILE_TOO_LARGE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Ukuran file melebihi batas maksimum.",
  },
  // ===== Lokasi & Outlet (BR-LOC) =====
  OUTLET_NOT_AVAILABLE: {
    code: "OUTLET_NOT_AVAILABLE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Tidak ada outlet aktif yang dapat melayani lokasi Anda.",
  },
  OUTSIDE_SERVICE_RADIUS: {
    code: "OUTSIDE_SERVICE_RADIUS",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Alamat berada di luar  jangkauan layanan (maks. 10 km).",
  },
  PRICING_NOT_AVAILABLE: {
    code: "PRICING_NOT_AVAILABLE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Master harga belum tersedia.",
  },
  INVALID_PICKUP_DATE: {
    code: "INVALID_PICKUP_DATE",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Tanggal tidak dapat di proses",
  },

  // ===== Payment & Bill (BR-PAY, BR-PRICE) =====
  PAYMENT_NOT_READY: {
    code: "PAYMENT_NOT_READY",
    status: StatusCodes.CONFLICT,
    message: "Order belum dapat dibayar. Menunggu proses outlet selesai.",
  },
  PAYMENT_ALREADY_PAID: {
    code: "PAYMENT_ALREADY_PAID",
    status: StatusCodes.CONFLICT,
    message: "Tagihan ini sudah lunas.",
  },

  // ===== Driver / Worker Assignment (BR-DRV, BR-WRK) =====
  ACTIVE_ASSIGNMENT_EXISTS: {
    code: "ACTIVE_ASSIGNMENT_EXISTS",
    status: StatusCodes.CONFLICT,
    message: "Anda masih memiliki tugas aktif yang belum selesai.",
  },
  QUANTITY_MISMATCH: {
    code: "QUANTITY_MISMATCH",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Quantity yang diinput tidak sesuai dengan data resmi.",
  },
  BYPASS_ALREADY_DECIDED: {
    code: "BYPASS_ALREADY_DECIDED",
    status: StatusCodes.CONFLICT,
    message: "Request bypass ini sudah diputuskan sebelumnya.",
  },

  // ===== Attendance (BR-ATT) =====
  ATTENDANCE_ALREADY_CLOCKED_IN: {
    code: "ATTENDANCE_ALREADY_CLOCKED_IN",
    status: StatusCodes.CONFLICT,
    message: "Anda sudah melakukan absen datang hari ini.",
  },
  ATTENDANCE_NOT_CLOCKED_IN: {
    code: "ATTENDANCE_NOT_CLOCKED_IN",
    status: StatusCodes.CONFLICT,
    message: "Anda belum melakukan absen datang hari ini.",
  },
  CLOCK_OUT_BLOCKED: {
    code: "CLOCK_OUT_BLOCKED",
    status: StatusCodes.CONFLICT,
    message: "Tidak dapat absen pulang karena masih ada tugas aktif.",
  },

  // ===== Komplain (BR-CMP) =====
  COMPLAINT_NOT_ALLOWED: {
    code: "COMPLAINT_NOT_ALLOWED",
    status: StatusCodes.CONFLICT,
    message: "Komplain tidak dapat diajukan untuk order ini.",
  },

  // ===== Internal Server Error =====
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
  },

  // ===== Address error =====
  GEOCODING_FAILED: {
    code: "GEOCODING_FAILED",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "tidak dapat mendapatkan alamat",
  },

  ADDRESS_LIMIT_REACHED: {
    code: "ADDRESS_LIMIT_REACHED",
    status: StatusCodes.CONFLICT,
    message: "tidak dapat menyimpan alamat",
  },

  LOCATION_PERMISSION_REQUIRED: {
    code: "LOCATION_PERMISSION_REQUIRED",
    status: StatusCodes.UNPROCESSABLE_ENTITY,
    message: "Izin lokasi browser diperlukan untuk request pickup.",
  },

  ADDRESS_FORBIDDEN: {
    code: "ADDRESS_FORBIDDEN",
    status: StatusCodes.FORBIDDEN,
    message: "alamat tidak ditemukan",
  },
} as const;

export type AppErrorKey = keyof typeof AppErrors;

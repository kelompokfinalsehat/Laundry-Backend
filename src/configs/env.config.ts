import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT as string) || 8001;
export const API_PREFIX = process.env.API_PREFIX;

// ===== cors ===== //
export const WHITE_LIST = (process.env.WHITE_LIST ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// ===== node mailer ===== //
export const NODEMAILER_GOOGLE_APP_PASSWORD =
  process.env.NODEMAILER_GOOGLE_APP_PASSWORD;
export const NODEMAILER_GOOGLE_APP_USER_EMAIL =
  process.env.NODEMAILER_GOOGLE_APP_USER_EMAIL;

// ===== google client ===== //
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// ===== cloudynary ===== //
export const CLOUDINARY_CLOUD_NAME = process.env
  .CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET = process.env
  .CLOUDINARY_API_SECRET as string;

// ===== jwt & token ===== //
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 30 hari
export const EMAIL_VERIFICATION_EXPIRY_HOURS = 1;
export const PASSWORD_RESET_EXPIRY_HOURS = 1;

// ==== opencage ===== //
export const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;
export const OPENCAGE_BASE_URL = process.env.OPENCAGE_BASE_URL;

// ===== api rajaOngkir ===== //
export const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY;

// ===== midtrans ===== //
export const MIDTRANS_MERCHANT_ID = process.env.MIDTRANS_MERCHANT_ID;
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
export const MIDTRANS_IS_PRODUCTION =
  process.env.MIDTRANS_IS_PRODUCTION === "true";
export const MIDTRANS_SNAP_BASE_URL = MIDTRANS_IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1/transactions"
  : "https://app.sandbox.midtrans.com/snap/v1/transactions";

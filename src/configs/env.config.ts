import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT as string) || 8001;
export const API_PREFIX = process.env.API_PREFIX;
export const WHITE_LIST = (process.env.WHITE_LIST ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const NODEMAILER_GOOGLE_APP_PASSWORD =
  process.env.NODEMAILER_GOOGLE_APP_PASSWORD;
export const NODEMAILER_GOOGLE_APP_USER_EMAIL =
  process.env.NODEMAILER_GOOGLE_APP_USER_EMAIL;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 30 hari
export const EMAIL_VERIFICATION_EXPIRY_HOURS = 1;
export const PASSWORD_RESET_EXPIRY_HOURS = 1;

export const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

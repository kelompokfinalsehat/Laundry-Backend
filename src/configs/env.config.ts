import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT as string) || 8001;
export const API_PREFIX = process.env.API_PREFIX;
export const WHITE_LIST = (process.env.WHITE_LIST ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const NODEMAILER_GOOGLE_APP_PASSWORD =
  process.env.NODEMAILER_GOOGLE_APP_PASSWORD;
export const NODEMAILER_GOOGLE_APP_USER_EMAIL =
  process.env.NODEMAILER_GOOGLE_APP_USER_EMAIL;
export const JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY;
export const EMAIL_VERIFICATION_EXPIRY_HOURS = 1;
export const PASSWORD_RESET_EXPIRY_HOURS = 1;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

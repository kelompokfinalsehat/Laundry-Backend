import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = parseInt(process.env.PORT as string) || 8001;
export const API_PREFIX = process.env.API_PREFIX;
export const WHITE_LIST = (process.env.WHITE_LIST ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

import crypto from "crypto";

export function generateOrderCode(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `PL-${datePart}-${randomPart}`;
}

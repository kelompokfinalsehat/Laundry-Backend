import crypto from "crypto";
import { MIDTRANS_SERVER_KEY, MIDTRANS_SNAP_BASE_URL } from "../configs/env.config";


type CreateTransactionParams = {
  gatewayOrderId: string; // order_id unik per attempt, BUKAN Order.id — Midtrans menolak reuse
  amount: number;
  customerName: string;
  customerEmail: string;
};

type CreateTransactionResult = { token: string; redirectUrl: string };

export class MidtransClient {
  static async createTransaction({
    gatewayOrderId,
    amount,
    customerName,
    customerEmail,
  }: CreateTransactionParams): Promise<CreateTransactionResult> {
    const authHeader = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");

    const res = await fetch(MIDTRANS_SNAP_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: gatewayOrderId,
          gross_amount: Math.round(amount),
        },
        customer_details: {
          first_name: customerName,
          email: customerEmail,
        },
      }),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      throw new Error(`Midtrans createTransaction gagal: ${res.status} ${JSON.stringify(errorBody)}`);
    }

    const json = await res.json();
    return { token: json.token, redirectUrl: json.redirect_url };
  }

  /**
   * BR-PAY-02: "Payment status hanya diperbarui dari webhook Midtrans yang
   * signaturenya valid." Formula resmi Midtrans:
   * SHA512(order_id + status_code + gross_amount + ServerKey)
   */
  static verifySignature(payload: {
    order_id: string;
    status_code: string;
    gross_amount: string;
    signature_key: string;
  }): boolean {
    const expected = crypto
      .createHash("sha512")
      .update(payload.order_id + payload.status_code + payload.gross_amount + MIDTRANS_SERVER_KEY)
      .digest("hex");

    return expected === payload.signature_key;
  }
}
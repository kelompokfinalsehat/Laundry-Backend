import * as z from "zod";

export class PaymentValidation {
  static readonly ORDER_ID = z.object({
    params: z.object({
      id: z.string().uuid("ID order tidak valid"),
    }),
  });

  static readonly MIDTRANS_WEEBHOOK = z.object({
    payload: z.object({
      order_id: z.string().min(1),
      status_code: z.string().min(1),
      gross_amount: z.string().min(1),
      signature_key: z.string().min(1),
      transaction_status: z.string().min(1),
      transaction_id: z.string().optional(),
    }),
  });
}

export type OrderIdInput = z.infer<typeof PaymentValidation.ORDER_ID>;
export type MidtransWebhookInput = z.infer<
  typeof PaymentValidation.MIDTRANS_WEEBHOOK
>;

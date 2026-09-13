export type MidtransStatusResult = {
  orderId: string;
  transactionStatus: string; 
  statusCode: string;
  statusMessage: string;
  fraudStatus?: string;
  grossAmount: string;
  paymentType?: string;
  transactionTime?: string;
};
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { userPayload } from "../../validations/validate";
import { OrderIdInput } from "./payments.validations";




export class PaymentRepository {
    static async getOwnedOrderWithBill(payload:userPayload,{params}:OrderIdInput) {
  const order = await prisma.order.findFirst({
    where: { id: params.id, customerId: payload.sub },
    include: { bill: true, customer: true },
  });
 
  if (!order) {
    throw new ResponseError("ORDER_FORBIDDEN");
  }
  if (!order.bill) {
    throw new ResponseError("BILL_NOT_FOUND");
  }
 
  return order;
}
}
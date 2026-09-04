import { userPayload } from "../../validations/validate";
import { OrderDetailHelper } from "./orderDetail.helpers";
import { OrderListHelper } from "./orderList.helpers";
import {
  DetailOrderInput,
  ListOrderInput,
} from "./order.validation";

export class OrderQueryService {
  static getList(
    payload: userPayload,
    input: ListOrderInput,
  ) {
    return OrderListHelper.getList(
      payload.sub,
      input.query,
    );
  }

  static getDetail(
    payload: userPayload,
    input: DetailOrderInput,
  ) {
    return OrderDetailHelper.getDetail(
      payload.sub,
      input.params.id,
    );
  }
}
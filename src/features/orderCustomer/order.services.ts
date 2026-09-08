import { userPayload } from "../../validations/validate";
import {
  CreateOrderInput,
  DetailOrderInput,
  ListOrderInput,
} from "./order.validation";
import { OrderCreateService } from "./orderCreate.service";
import { OrderQueryService } from "./orderQuery.service";

export class OrderService {
  static create(payload: userPayload, input: CreateOrderInput) {
    return OrderCreateService.create(payload, input);
  }

  static getListOrder(payload: userPayload, input: ListOrderInput) {
    return OrderQueryService.getList(payload, input);
  }

  static getDetailOrder(payload: userPayload, input: DetailOrderInput) {
    return OrderQueryService.getDetail(payload, input);
  }
}
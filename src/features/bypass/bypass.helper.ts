import { ResponseError } from "../../utils/errors/response-error.utils";
import { QuantityDifference } from "./bypass.type";

type differenceType = {
  items: QuantityDifference[]
}

export class BypassHelper {
  static parseQuantityDifferences(value: string | null): QuantityDifference[] {
    if (!value) return [];
    try {
      const parsed: differenceType = JSON.parse(value);
      if (!Array.isArray(parsed.items)) throw new Error();
      return parsed.items;
    } catch {
      throw new ResponseError(
        "INTERNAL_SERVER_ERROR",
        "Invalid bypass quantity data.",
      );
    }
  }
  static validateDifferences(differences: QuantityDifference[], orderItems: {id: string, quantity: number}[]){
    const orderItemMap = new Map(orderItems.map(item => [item.id, item.quantity]))
    for(const difference of differences){
        const officialQuantity = orderItemMap.get(difference.orderItemId)
        if(officialQuantity === undefined) throw new ResponseError('INTERNAL_SERVER_ERROR', 'Bypass quantity item is invalid.')
        if(difference.officialQuantity !== officialQuantity) throw new ResponseError('CONFLICT', 'Bypass quantity is no longer valid.')
        if(!Number.isInteger(difference.submittedQuantity) || difference.submittedQuantity < 0) throw new ResponseError('INTERNAL_SERVER_ERROR', 'Invalid submitted quantity.')
        if(difference.difference !== difference.submittedQuantity - difference.officialQuantity) throw new ResponseError('INTERNAL_SERVER_ERROR', 'Invalid quantity difference.')
    }
  }
}

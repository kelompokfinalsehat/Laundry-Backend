import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { userPayload } from "../../validations/validate";
import { OrderHelper } from "./order.helpers";
import { OrderCreateHelper } from "./orderCreate.helpers";
import { CreateOrderInput } from "./order.validation";

export class OrderCreateService {
  static async create(
    payload: userPayload,
    { body }: CreateOrderInput,
  ) {
    const customer = await this.getVerifiedCustomer(
      payload.sub,
    );

    const pickupScheduledAt =
      OrderHelper.buildPickupScheduledAt(
        body.pickupDate,
        body.pickupTime,
      );

    const address = await this.getCustomerAddress(
      payload.sub,
      body.addressId,
    );

    await OrderCreateHelper.assertNoDuplicateOrder(
      customer.id,
      address.formattedAddress,
      pickupScheduledAt,
    );

    const nearestOutlet =
      await OrderCreateHelper.findNearestOutlet(
        Number(address.latitude),
        Number(address.longitude),
      );

    return OrderCreateHelper.createTransaction({
      customerId: customer.id,
      body,
      address,
      pickupScheduledAt,
      nearestOutlet,
    });
  }

  private static async getVerifiedCustomer(
    customerId: string,
  ) {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new ResponseError(
        "ACCOUNT_NOT_ACTIVE",
        "Customer tidak ditemukan.",
      );
    }

    if (!customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_NOT_VERIFIED",
        "Email kamu belum diverifikasi.",
      );
    }

    return customer;
  }

  private static async getCustomerAddress(
    customerId: string,
    addressId: string,
  ) {
    const address = await prisma.customerAddress.findFirst({
      where: {
        id: addressId,
        customerId,
        deletedAt: null,
      },
    });

    if (!address) {
      throw new ResponseError(
        "ADDRESS_FORBIDDEN",
        "Alamat tidak ditemukan atau bukan milik kamu.",
      );
    }

    return address;
  }
}
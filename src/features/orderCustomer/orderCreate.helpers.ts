import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { GeocodingUtil } from "../../utils/geocoding.util";
import { generateOrderCode } from "../../utils/orderCustomer/order.code";
import { CreateOrderInput } from "./order.validation";

const SERVICE_RADIUS_METERS = 10_000;

export class OrderCreateHelper {
  static async assertNoDuplicateOrder(
    customerId: string,
    addressSnapshot: string,
    pickupScheduledAt: Date,
  ) {
    const startOfDay = new Date(pickupScheduledAt);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(pickupScheduledAt);
    endOfDay.setHours(23, 59, 59, 999);

    const existingOrder = await prisma.order.findFirst({
      where: {
        customerId,
        addressSnapshot,
        pickupScheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingOrder) {
      throw new ResponseError(
        "DUPLICATE_REQUEST",
        "Alamat ini sudah memiliki request pickup pada tanggal tersebut.",
      );
    }
  }

  static async findNearestOutlet(
    latitude: number,
    longitude: number,
  ) {
    const outlets = await prisma.outlet.findMany({
      where: {
        isActive: true,
        deletedAt: null,
        staffOnDuty: {
          some: {
            role: "OUTLET_ADMIN",
            accountStatus: "ACTIVE",
          },
        },
      },
    });

    if (outlets.length === 0) {
      throw new ResponseError(
        "OUTLET_NOT_AVAILABLE",
        "Tidak ada outlet aktif yang bisa melayani saat ini.",
      );
    }

    let nearestOutlet: (typeof outlets)[number] | null =
      null;

    let nearestDistance = Infinity;

    for (const outlet of outlets) {
      const distance =
        GeocodingUtil.haversineDistanceMeters(
          latitude,
          longitude,
          Number(outlet.latitude),
          Number(outlet.longitude),
        );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestOutlet = outlet;
      }
    }

    if (
      !nearestOutlet ||
      nearestDistance > SERVICE_RADIUS_METERS
    ) {
      throw new ResponseError(
        "OUTSIDE_SERVICE_RADIUS",
        "Tidak ada outlet dalam radius 10 km dari alamat ini.",
      );
    }

    return {
      outlet: nearestOutlet,
      distance: nearestDistance,
    };
  }

 static async createTransaction({
  customerId,
  body,
  address,
  pickupScheduledAt,
  nearestOutlet,
}: {
  customerId: string;
  body: CreateOrderInput["body"];
  address: Prisma.CustomerAddressGetPayload<{}>;
  pickupScheduledAt: Date;
  nearestOutlet: {
    outlet: {
      id: string;
    };
    distance: number;
  };
}) {
    const orderCode = generateOrderCode();

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderCode,
          customerId,
          outletId: nearestOutlet.outlet.id,
          addressSnapshot: address.formattedAddress,
          addressPhoneSnapshot: address.phone,
          addressLatitude: Number(address.latitude),
          addressLongitude: Number(address.longitude),
          distanceMeters: nearestOutlet.distance,
          pickupDate: new Date(body.pickupDate),
          pickupScheduledAt,
          customerStatus: "SCHEDULED",
        },
      });

      await tx.driverAssignment.create({
        data: {
          orderId: created.id,
          outletId: created.outletId,
          taskType: "PICKUP",
          status: "QUEUED",
        },
      });

      return created;
    });

    return {
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      outletId: order.outletId,
      distanceMeters: nearestOutlet.distance,
      pickupDate: order.pickupDate,
      pickupScheduledAt: order.pickupScheduledAt,
    };
  }
}
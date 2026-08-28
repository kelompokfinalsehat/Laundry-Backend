import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../configs/prisma-client.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import { GeocodingUtil } from "../../utils/geocoding.util";
import { generateOrderCode } from "../../utils/orderCustomer/order.code";
import { userPayload } from "../../validations/validate";
import { CUSTOMER_STATUS_LABELS, ORDER_STATUS_GROUPS } from "./order.constans";
import { OrderHelper } from "./order.helpers";
import {
  CreateOrderInput,
  DetailOrderInput,
  ListOrderInput,
} from "./order.validation";

const SERVICE_RADIUS_METERS = 10_000;
export class OrderService {
  static async create(payload: userPayload, { body }: CreateOrderInput) {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: payload.sub },
    });

    // BR-AUTH-01: user belum terverifikasi tidak dapat membuat request pickup.
    if (!customer.isEmailVerified) {
      throw new ResponseError(
        "EMAIL_NOT_VERIFIED",
        "Email kamu belum diverifikasi.",
      );
    }

    if (!body.locationPermissionGranted) {
      throw new ResponseError("LOCATION_PERMISSION_REQUIRED");
    }

    // ini di comment supaya bisa di tes kapanpun
    // const now = new Date();
    // OrderHelper.assertWithinRequestWindow(now);

    const pickupScheduledAt = OrderHelper.buildPickupScheduledAt(
      body.pickupDate,
      body.pickupTime,
    );

    const address = await prisma.customerAddress.findFirst({
      where: { id: body.addressId, customerId: payload.sub, deletedAt: null },
    });

    if (!address) {
      throw new ResponseError(
        "ADDRESS_FORBIDDEN",
        "Alamat tidak ditemukan atau bukan milik kamu.",
      );
    }

    const activeOutlets = await prisma.outlet.findMany({
      where: {
        isActive: true,
        deletedAt: null,
        staffOnDuty: {
          some: { role: "OUTLET_ADMIN", accountStatus: "ACTIVE" },
        },
      },
    });

    if (activeOutlets.length === 0) {
      throw new ResponseError(
        "OUTLET_NOT_AVAILABLE",
        "Tidak ada outlet aktif yang bisa melayani saat ini.",
      );
    }

    let nearestOutlet: (typeof activeOutlets)[number] | null = null;
    let nearestDistance = Infinity;

    for (const outlet of activeOutlets) {
      const distance = GeocodingUtil.haversineDistanceMeters(
        Number(address.latitude),
        Number(address.longitude),
        Number(outlet.latitude),
        Number(outlet.longitude),
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestOutlet = outlet;
      }

      if (!nearestOutlet || nearestDistance > SERVICE_RADIUS_METERS) {
        throw new ResponseError(
          "OUTSIDE_SERVICE_RADIUS",
          "Tidak ada outlet dalam radius 10 km dari alamat ini.",
        );
      }

      const orderCode = generateOrderCode();

      const order = await prisma.$transaction(async (tx) => {
        const created = await tx.order.create({
          data: {
            orderCode,
            customerId: payload.sub,
            outletId: nearestOutlet!.id,
            addressSnapshot: address.formattedAddress,
            addressPhoneSnapshot: address.phone,
            addressLatitude: address.latitude,
            addressLongitude: address.longitude,
            distanceMeters: nearestDistance,
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
        distanceMeters: nearestDistance,
        pickupDate: order.pickupDate,
        pickupScheduledAt: order.pickupScheduledAt,
      };
    }
  }
  static async getListOrder(payload: userPayload, { query }: ListOrderInput) {
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;
    const where: Prisma.OrderWhereInput = { customerId: payload.sub };

    if (query.statusGroup) {
      where.customerStatus = { in: ORDER_STATUS_GROUPS[query.statusGroup] };
    }

    if (query.search) {
      where.orderCode = {
        contains: query.search,
        mode: "insensitive",
      };
    }
    if (query.startDate || query.endDate) {
      where.pickupDate = {
        ...(query.startDate && {
          gte: new Date(`${query.startDate}T00:00:00`),
        }),
        ...(query.endDate && {
          lte: new Date(`${query.endDate}T23:59:59.999`),
        }),
      };
    }
    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { [query.sortBy]: query.sortOrder },
        include: {
          bill: { select: { totalAmount: true, paymentStatus: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const data = orders.map((order) => ({
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      customerStatusLabel: CUSTOMER_STATUS_LABELS[order.customerStatus],
      pickupDate: order.pickupDate,
      totalAmount: order.bill?.totalAmount ?? null,
      paymentStatus: order.bill?.paymentStatus ?? null,
    }));

    return {
      data,
      meta: {
        page: query.page,
        limit: take,
        totalData: totalOrders,
        totalPage: Math.ceil(totalOrders / take),
      },
    };
  }

  static async getDetailOrder(
    payload: userPayload,
    { params }: DetailOrderInput,
  ) {
    const order = await prisma.order.findFirst({
      where: { id: params.id, customerId: payload.sub },
      include: {
        bill: true,
        orderItems: { include: { laundryItem: true } },
        driverAssignments: true,
        workerAssignments: true,
        complaint: true,
      },
    });

    if (!order) {
      throw new ResponseError(
        "FORBIDDEN",
        "Order tidak ditemukan atau bukan milik kamu.",
      );
    }
    return {
      id: order.id,
      orderCode: order.orderCode,
      customerStatus: order.customerStatus,
      customerStatusLabel: CUSTOMER_STATUS_LABELS[order.customerStatus],
      addressSnapshot: order.addressSnapshot,
      addressPhoneSnapshot: order.addressPhoneSnapshot,
      pickupDate: order.pickupDate,
      pickupScheduledAt: order.pickupScheduledAt,
      bill: order.bill,
      orderItems: order.orderItems,
      complaint: order.complaint,
      timeline: OrderHelper.buildTimeline(order),
      allowedActions: {
        canPay: order.bill !== null && order.bill.paymentStatus !== "PAID",
        canConfirmReceived:
          order.customerStatus === "WAITING_CUSTOMER_CONFIRMATION",
        canFileComplaint:
          order.customerStatus === "WAITING_CUSTOMER_CONFIRMATION" &&
          !order.complaint,
      },
    };
  }
}

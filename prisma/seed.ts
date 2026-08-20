import {
  Prisma,
  Role,
  AuthProvider,
  AccountStatus,
  WorkStatus,
  CustomerStatus,
  BillPaymentStatus,
  PickupDeliveryType,
  DriverAssignmentStatus,
  WorkerAssignmentStatus,
  StationType,
  PaymentTransactionStatus,
} from "../generated/prisma";
import { prisma } from "../src/configs/prisma-client.config";
import { BcryptUtil } from "../src/utils/Auth/bcrypt.utils";

const RUN_ID = Date.now().toString();
const PASSWORD = "password123";

const money = (value: number) => new Prisma.Decimal(value);

type OutletContext = {
  outlet: {
    id: string;
    name: string;
    address: string;
    latitude: Prisma.Decimal;
    longitude: Prisma.Decimal;
  };
  admin: {
    id: string;
    email: string;
  };
  workers: { id: string; email: string }[];
  drivers: { id: string; email: string }[];
};

const orderStatuses: CustomerStatus[] = [
  CustomerStatus.SCHEDULED,
  CustomerStatus.WAITING_DRIVER_PICKUP,
  CustomerStatus.ON_THE_WAY_TO_OUTLET,
  CustomerStatus.ARRIVED_AT_OUTLET,
  CustomerStatus.WASHING,
  CustomerStatus.WASHING,
  CustomerStatus.IRONING,
  CustomerStatus.IRONING,
  CustomerStatus.PACKING,
  CustomerStatus.PACKING,
  CustomerStatus.WAITING_PAYMENT,
  CustomerStatus.WAITING_PAYMENT,
  CustomerStatus.READY_FOR_DELIVERY,
  CustomerStatus.READY_FOR_DELIVERY,
  CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
  CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
  CustomerStatus.RECEIVED_BY_CUSTOMER,
  CustomerStatus.RECEIVED_BY_CUSTOMER,
  CustomerStatus.RECEIVED_BY_CUSTOMER,
  CustomerStatus.RECEIVED_BY_CUSTOMER,
];


function hasStatus(
  status: CustomerStatus,
  statuses: CustomerStatus[],
): boolean {
  return statuses.includes(status);
}

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function getOrderCreatedAt(outletIndex: number, orderIndex: number) {
  const now = new Date();

  // Three orders on today's date for DAY report testing.
  if (orderIndex < 3) {
    const date = new Date(now);
    date.setHours(8 + orderIndex * 4, 0, 0, 0);
    date.setMinutes(date.getMinutes() + outletIndex * 5);
    return date;
  }

  // Nine orders in the current month for MONTH report testing.
  if (orderIndex < 12) {
    const date = new Date(now);
    date.setDate(
      Math.max(1, now.getDate() - (orderIndex - 2)),
    );
    date.setHours(9 + (orderIndex % 8), 15, 0, 0);
    return date;
  }

  // Eight orders spread across previous months for YEAR report testing.
  const monthIndex = (orderIndex - 12) % 7;
  const date = new Date(
    now.getFullYear(),
    monthIndex,
    5 + (orderIndex % 10),
    10 + (orderIndex % 6),
    0,
    0,
  );

  return date;
}

function getPickupDate(createdAt: Date) {
  const date = new Date(createdAt);
  date.setHours(0, 0, 0, 0);
  return date;
}

async function createBill(params: {
  orderId: string;
  pricing: {
    id: string;
    pricePerKg: Prisma.Decimal;
  };
  shippingRate: {
    id: string;
    price: Prisma.Decimal;
  };
  createdAt: Date;
  paid: boolean;
}) {
  const weightKg = money(
    3 + (Math.abs(params.orderId.charCodeAt(0)) % 6),
  );

  const totalAmount = money(
    Number(params.pricing.pricePerKg) * Number(weightKg) +
      Number(params.shippingRate.price),
  );

  const bill = await prisma.bill.create({
    data: {
      orderId: params.orderId,
      laundryPricingId: params.pricing.id,
      pricePerKgSnapshot: params.pricing.pricePerKg,
      shippingRateId: params.shippingRate.id,
      shippingFeeSnapshot: params.shippingRate.price,
      weightKg,
      totalAmount,
      paymentStatus: params.paid
        ? BillPaymentStatus.PAID
        : BillPaymentStatus.UNPAID,
      createdAt: params.createdAt,
      updatedAt: params.createdAt,
    },
  });

  if (params.paid) {
    const paidAt = addHours(params.createdAt, 1);

    await prisma.payment.create({
      data: {
        billId: bill.id,
        gatewayOrderId: `SEED-SALES-${RUN_ID}-${params.orderId}`,
        midtransTransactionId: `SEED-MIDTRANS-${RUN_ID}-${params.orderId}`,
        amount: totalAmount,
        status: PaymentTransactionStatus.SETTLEMENT,
        isFinal: true,
        paidAt,
        createdAt: paidAt,
        updatedAt: paidAt,
      },
    });
  }

  return bill;
}

async function createWorkerAssignments(
  outlet: OutletContext,
  orderId: string,
  createdAt: Date,
  status: CustomerStatus,
  orderIndex: number,
) {
  const worker1 = outlet.workers[orderIndex % 5]!;
  const worker2 = outlet.workers[(orderIndex + 1) % 5]!;
  const worker3 = outlet.workers[(orderIndex + 2) % 5]!;

  const createAssignment = async (params: {
    workerId: string | null;
    stationType: StationType;
    status: WorkerAssignmentStatus;
    offsetHours: number;
    durationHours?: number;
  }) => {
    const assignmentCreatedAt = addHours(
      createdAt,
      params.offsetHours,
    );

    const active =
      params.status === WorkerAssignmentStatus.IN_PROGRESS;

    const completed =
      params.status === WorkerAssignmentStatus.COMPLETED;

    await prisma.workerAssignment.create({
      data: {
        orderId,
        workerId: params.workerId,
        outletId: outlet.outlet.id,
        stationType: params.stationType,
        assignedAt:
          params.workerId && params.status !== WorkerAssignmentStatus.QUEUED
            ? assignmentCreatedAt
            : null,
        startedAt:
          active || completed
            ? addHours(assignmentCreatedAt, 1)
            : null,
        completedAt: completed
          ? addHours(
              assignmentCreatedAt,
              params.durationHours ?? 2,
            )
          : null,
        status: params.status,
        createdAt: assignmentCreatedAt,
        updatedAt: completed
          ? addHours(
              assignmentCreatedAt,
              params.durationHours ?? 2,
            )
          : assignmentCreatedAt,
      },
    });
  };

  if (status === CustomerStatus.ARRIVED_AT_OUTLET) {
    await createAssignment({
      workerId: null,
      stationType: StationType.WASHING,
      status: WorkerAssignmentStatus.QUEUED,
      offsetHours: 4,
    });
    return;
  }

  if (
    hasStatus(status, [
      CustomerStatus.WASHING,
      CustomerStatus.IRONING,
      CustomerStatus.PACKING,
      CustomerStatus.WAITING_PAYMENT,
      CustomerStatus.READY_FOR_DELIVERY,
      CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
      CustomerStatus.RECEIVED_BY_CUSTOMER,
    ])
  ) {
    const washingCompleted =
      !hasStatus(status, [
        CustomerStatus.WASHING,
      ]);

    await createAssignment({
      workerId: worker1.id,
      stationType: StationType.WASHING,
      status: washingCompleted
        ? WorkerAssignmentStatus.COMPLETED
        : WorkerAssignmentStatus.IN_PROGRESS,
      offsetHours: 4,
    });
  }

  if (
    hasStatus(status, [
      CustomerStatus.IRONING,
      CustomerStatus.PACKING,
      CustomerStatus.WAITING_PAYMENT,
      CustomerStatus.READY_FOR_DELIVERY,
      CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
      CustomerStatus.RECEIVED_BY_CUSTOMER,
    ])
  ) {
    const ironingCompleted =
      status !== CustomerStatus.IRONING;

    await createAssignment({
      workerId: worker2.id,
      stationType: StationType.IRONING,
      status: ironingCompleted
        ? WorkerAssignmentStatus.COMPLETED
        : WorkerAssignmentStatus.IN_PROGRESS,
      offsetHours: 7,
    });
  }

  if (
    hasStatus(status, [
      CustomerStatus.PACKING,
      CustomerStatus.WAITING_PAYMENT,
      CustomerStatus.READY_FOR_DELIVERY,
      CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
      CustomerStatus.RECEIVED_BY_CUSTOMER,
    ])
  ) {
    const packingCompleted =
      status !== CustomerStatus.PACKING;

    await createAssignment({
      workerId: worker3.id,
      stationType: StationType.PACKING,
      status: packingCompleted
        ? WorkerAssignmentStatus.COMPLETED
        : WorkerAssignmentStatus.IN_PROGRESS,
      offsetHours: 10,
    });
  }
}

async function createDriverAssignments(
  outlet: OutletContext,
  orderId: string,
  createdAt: Date,
  status: CustomerStatus,
  orderIndex: number,
) {
  const driver = outlet.drivers[orderIndex % 5]!;

  const pickupRelevant = hasStatus(status, [
    CustomerStatus.WAITING_DRIVER_PICKUP,
    CustomerStatus.ON_THE_WAY_TO_OUTLET,
    CustomerStatus.ARRIVED_AT_OUTLET,
    CustomerStatus.WASHING,
    CustomerStatus.IRONING,
    CustomerStatus.PACKING,
    CustomerStatus.WAITING_PAYMENT,
    CustomerStatus.READY_FOR_DELIVERY,
    CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
    CustomerStatus.RECEIVED_BY_CUSTOMER,
  ]);

  if (pickupRelevant) {
    const queued =
      status === CustomerStatus.WAITING_DRIVER_PICKUP;

    const completed = hasStatus(status, [
      CustomerStatus.ARRIVED_AT_OUTLET,
      CustomerStatus.WASHING,
      CustomerStatus.IRONING,
      CustomerStatus.PACKING,
      CustomerStatus.WAITING_PAYMENT,
      CustomerStatus.READY_FOR_DELIVERY,
      CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
      CustomerStatus.RECEIVED_BY_CUSTOMER,
    ]);

    const created = addHours(createdAt, 1);

    await prisma.driverAssignment.create({
      data: {
        orderId,
        outletId: outlet.outlet.id,
        driverId: queued ? null : driver.id,
        taskType: PickupDeliveryType.PICKUP,
        assignedAt: queued ? null : created,
        pickedUpAt: completed
          ? addHours(created, 1)
          : null,
        completedAt: completed
          ? addHours(created, 1)
          : null,
        status: queued
          ? DriverAssignmentStatus.QUEUED
          : completed
            ? DriverAssignmentStatus.COMPLETED
            : DriverAssignmentStatus.IN_PROGRESS,
        createdAt: created,
        updatedAt: completed
          ? addHours(created, 1)
          : created,
      },
    });
  }

  const deliveryRelevant = hasStatus(status, [
    CustomerStatus.READY_FOR_DELIVERY,
    CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
    CustomerStatus.RECEIVED_BY_CUSTOMER,
  ]);

  if (deliveryRelevant) {
    const queued =
      status === CustomerStatus.READY_FOR_DELIVERY;

    const completed =
      status === CustomerStatus.RECEIVED_BY_CUSTOMER;

    const created = addHours(createdAt, 20);

    await prisma.driverAssignment.create({
      data: {
        orderId,
        outletId: outlet.outlet.id,
        driverId: queued ? null : driver.id,
        taskType: PickupDeliveryType.DELIVERY,
        assignedAt: queued ? null : created,
        deliveredAt: completed
          ? addHours(created, 4)
          : null,
        completedAt: completed
          ? addHours(created, 4)
          : null,
        status: queued
          ? DriverAssignmentStatus.QUEUED
          : completed
            ? DriverAssignmentStatus.COMPLETED
            : DriverAssignmentStatus.IN_PROGRESS,
        createdAt: created,
        updatedAt: completed
          ? addHours(created, 4)
          : created,
      },
    });
  }
}

async function createOutlet(
  outletIndex: number,
  passwordHash: string,
): Promise<OutletContext> {
  const outlet = await prisma.outlet.create({
    data: {
      name: `Seed Sales Outlet ${outletIndex + 1} ${RUN_ID}`,
      address:
        outletIndex === 0
          ? "Jl. Seed Sales No. 1, Tangerang"
          : "Jl. Seed Sales No. 2, Tangerang",
      latitude: money(-6.175392 + outletIndex * 0.02),
      longitude: money(106.824964 + outletIndex * 0.02),
      isActive: true,
    },
  });

  const admin = await prisma.employee.create({
    data: {
      name: `Seed Outlet Admin ${outletIndex + 1}`,
      email: `seed.sales.admin${outletIndex + 1}.${RUN_ID}@example.com`,
      passwordHash,
      role: Role.OUTLET_ADMIN,
      accountStatus: AccountStatus.ACTIVE,
      workStatus: WorkStatus.OFF_DUTY,
      currentOutletId: outlet.id,
    },
  });

  const workers = await Promise.all(
    Array.from({ length: 5 }, (_, index) =>
      prisma.employee.create({
        data: {
          name: `Seed Outlet ${outletIndex + 1} Worker ${index + 1}`,
          email: `seed.sales.worker${outletIndex + 1}.${index + 1}.${RUN_ID}@example.com`,
          passwordHash,
          role: Role.WORKER,
          accountStatus: AccountStatus.ACTIVE,
          workStatus: WorkStatus.AVAILABLE,
          currentOutletId: outlet.id,
        },
      }),
    ),
  );

  const drivers = await Promise.all(
    Array.from({ length: 5 }, (_, index) =>
      prisma.employee.create({
        data: {
          name: `Seed Outlet ${outletIndex + 1} Driver ${index + 1}`,
          email: `seed.sales.driver${outletIndex + 1}.${index + 1}.${RUN_ID}@example.com`,
          passwordHash,
          role: Role.DRIVER,
          accountStatus: AccountStatus.ACTIVE,
          workStatus: WorkStatus.AVAILABLE,
          currentOutletId: outlet.id,
        },
      }),
    ),
  );

  return {
    outlet,
    admin,
    workers,
    drivers,
  };
}

async function createOrder(params: {
  outlet: OutletContext;
  customerId: string;
  pricing: {
    id: string;
    pricePerKg: Prisma.Decimal;
  };
  shippingRate: {
    id: string;
    price: Prisma.Decimal;
  };
  laundryItems: { id: string }[];
  outletIndex: number;
  orderIndex: number;
}) {
  const status = orderStatuses[params.orderIndex]!;
  const createdAt = getOrderCreatedAt(
    params.outletIndex,
    params.orderIndex,
  );

  const pickupDate = getPickupDate(createdAt);

  const pickupScheduledAt = addHours(createdAt, 1);

  const order = await prisma.order.create({
    data: {
      orderCode:
        `SEED-SALES-${RUN_ID}-O${params.outletIndex + 1}-${String(
          params.orderIndex + 1,
        ).padStart(2, "0")}`,

      customerId: params.customerId,
      outletId: params.outlet.outlet.id,

      addressSnapshot:
        `${params.outlet.outlet.address} - Customer ${params.orderIndex + 1}`,

      addressPhoneSnapshot:
        `0812${String(
          10000000 +
            params.outletIndex * 1000000 +
            params.orderIndex,
        ).padStart(8, "0")}`,

      addressLatitude: params.outlet.outlet.latitude,
      addressLongitude: params.outlet.outlet.longitude,

      distanceMeters: money(
        1000 + params.orderIndex * 250,
      ),

      pickupDate,
      pickupScheduledAt,
      customerStatus: status,

      receivedAt:
        status === CustomerStatus.RECEIVED_BY_CUSTOMER
          ? addHours(createdAt, 30)
          : null,

      receivedBy:
        status === CustomerStatus.RECEIVED_BY_CUSTOMER
          ? params.outlet.admin.id
          : null,

      createdAt,
      updatedAt: createdAt,
    },
  });

  await prisma.orderItem.createMany({
    data: [
      {
        orderId: order.id,
        laundryItemId: params.laundryItems[0]!.id,
        quantity: 2 + (params.orderIndex % 4),
      },
      {
        orderId: order.id,
        laundryItemId: params.laundryItems[1]!.id,
        quantity: 1 + (params.orderIndex % 3),
      },
      {
        orderId: order.id,
        laundryItemId: params.laundryItems[2]!.id,
        quantity: 1 + (params.orderIndex % 2),
      },
    ],
  });

  const billEligible = !!hasStatus(status, [
    CustomerStatus.SCHEDULED,
    CustomerStatus.WAITING_DRIVER_PICKUP,
    CustomerStatus.ON_THE_WAY_TO_OUTLET,
  ]);

  // 14 PAID + 3 UNPAID + 3 without Bill per outlet.
  const paid =
    billEligible &&
    (params.orderIndex >= 8 ||
      params.orderIndex === 3 ||
      params.orderIndex === 4);

  if (billEligible) {
    await createBill({
      orderId: order.id,
      pricing: params.pricing,
      shippingRate: params.shippingRate,
      createdAt: addHours(createdAt, 3),
      paid,
    });
  }

  await createWorkerAssignments(
    params.outlet,
    order.id,
    createdAt,
    status,
    params.orderIndex,
  );

  await createDriverAssignments(
    params.outlet,
    order.id,
    createdAt,
    status,
    params.orderIndex,
  );

  return {
    order,
    status,
    paid,
    billCreated: billEligible,
  };
}

async function main() {
  console.log("🌱 Seeding Sales Report test data...");
  console.log(`Run ID: ${RUN_ID}`);

  const passwordHash = await BcryptUtil.hash(PASSWORD);

  // Existing master data only.
  const pricing = await prisma.laundryPricing.findFirst({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });

  const shippingRate = await prisma.shippingRate.findFirst({
    where: { deletedAt: null },
    orderBy: { maxDistanceMeters: "asc" },
  });

  const laundryItems = await prisma.laundryItem.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "asc" },
    take: 3,
  });

  if (!pricing) {
    throw new Error(
      "Tidak ditemukan LaundryPricing ACTIVE/available. Seed tidak membuat pricing baru.",
    );
  }

  if (!shippingRate) {
    throw new Error(
      "Tidak ditemukan ShippingRate ACTIVE/available. Seed tidak membuat shipping rate baru.",
    );
  }

  if (laundryItems.length < 3) {
    throw new Error(
      "Minimal membutuhkan 3 LaundryItem existing.",
    );
  }

  console.log(`Pricing     : ${pricing.pricePerKg}/kg`);
  console.log(
    `Shipping    : ${shippingRate.price} (<= ${shippingRate.maxDistanceMeters}m)`,
  );
  console.log(
    `LaundryItem : ${laundryItems.map((item) => item.name).join(", ")}`,
  );

  // 20 customers, reused across 40 orders.
  const customers = await Promise.all(
    Array.from({ length: 20 }, (_, index) =>
      prisma.customer.create({
        data: {
          name: `Seed Sales Customer ${index + 1}`,
          email: `seed.sales.customer${index + 1}.${RUN_ID}@example.com`,
          passwordHash,
          authProvider: AuthProvider.EMAIL,
          isEmailVerified: true,
          phone: `0812${String(20000000 + index).padStart(8, "0")}`,
        },
      }),
    ),
  );

  const outlets = [
    await createOutlet(0, passwordHash),
    await createOutlet(1, passwordHash),
  ];

  const summary: {
    outlet: string;
    orders: number;
    paidBills: number;
    unpaidBills: number;
    noBill: number;
    completedOrders: number;
  }[] = [];

  for (let outletIndex = 0; outletIndex < outlets.length; outletIndex++) {
    const outlet = outlets[outletIndex]!;

    let paidBills = 0;
    let unpaidBills = 0;
    let noBill = 0;
    let completedOrders = 0;

    for (let orderIndex = 0; orderIndex < 20; orderIndex++) {
      const customer =
        customers[(outletIndex * 10 + orderIndex) % customers.length]!;

      const result = await createOrder({
        outlet,
        customerId: customer.id,
        pricing: {
          id: pricing.id,
          pricePerKg: pricing.pricePerKg,
        },
        shippingRate: {
          id: shippingRate.id,
          price: shippingRate.price,
        },
        laundryItems: laundryItems.map((item) => ({
          id: item.id,
        })),
        outletIndex,
        orderIndex,
      });

      if (!result.billCreated) {
        noBill++;
      } else if (result.paid) {
        paidBills++;
      } else {
        unpaidBills++;
      }

      if (
        result.status === CustomerStatus.RECEIVED_BY_CUSTOMER
      ) {
        completedOrders++;
      }
    }

    summary.push({
      outlet: outlet.outlet.name,
      orders: 20,
      paidBills,
      unpaidBills,
      noBill,
      completedOrders,
    });
  }

  console.log("\n==============================================");
  console.log("✅ SALES REPORT SEED SELESAI");
  console.log("==============================================");

  for (const item of summary) {
    console.log(`\n${item.outlet}`);
    console.log(`  Orders          : ${item.orders}`);
    console.log(`  PAID bills      : ${item.paidBills}`);
    console.log(`  UNPAID bills    : ${item.unpaidBills}`);
    console.log(`  Without bill    : ${item.noBill}`);
    console.log(`  Completed order : ${item.completedOrders}`);
  }

  console.log("\nLogin Outlet Admin:");
  for (const outlet of outlets) {
    console.log(`  ${outlet.admin.email}`);
  }

  console.log(`Password: ${PASSWORD}`);

  console.log("\nUntuk Sales Report:");
  console.log(
    "  DAY   -> period=DAY&date=YYYY-MM-DD",
  );
  console.log(
    "  MONTH -> period=MONTH&year=YYYY&month=MM",
  );
  console.log(
    "  YEAR  -> period=YEAR&year=YYYY",
  );
}

main()
  .catch((error) => {
    console.error("\n❌ Seed gagal:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import {
  PrismaClient,
  Prisma,
  Role,
  AccountStatus,
  WorkStatus,
  CustomerStatus,
  BillPaymentStatus,
  PickupDeliveryType,
  DriverAssignmentStatus,
  WorkerAssignmentStatus,
  StationType,
  BypassStatus,
  PaymentTransactionStatus,
} from "../generated/prisma";
import { BcryptUtil } from "../src/utils/Auth/bcrypt.utils";

const prisma = new PrismaClient();

const money = (value: number) => new Prisma.Decimal(value);

async function main() {
  console.log("🌱 Seeding Feature 2 test data...");

  // ============================================================
  // EXISTING DATA
  // ============================================================

  const customer = await prisma.customer.findFirst({
    where: {
      deletedAt: null,
    },
  });

  const outlet = await prisma.outlet.findFirst({
    where: {
      isActive: true,
      deletedAt: null,
    },
  });

  const laundryItems = await prisma.laundryItem.findMany({
    where: {
      deletedAt: null,
    },
    take: 3,
  });

  const pricing = await prisma.laundryPricing.findFirst({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const shippingRate = await prisma.shippingRate.findFirst({
    where: {
      deletedAt: null,
    },
    orderBy: {
      maxDistanceMeters: "asc",
    },
  });

  if (!customer) {
    throw new Error("Tidak ditemukan Customer existing.");
  }

  if (!outlet) {
    throw new Error("Tidak ditemukan Outlet active existing.");
  }

  if (laundryItems.length < 3) {
    throw new Error(
      "Minimal membutuhkan 3 LaundryItem existing.",
    );
  }

  if (!pricing) {
    throw new Error(
      "Tidak ditemukan LaundryPricing existing.",
    );
  }

  if (!shippingRate) {
    throw new Error(
      "Tidak ditemukan ShippingRate existing.",
    );
  }

  // ============================================================
  // EXISTING EMPLOYEE
  // ============================================================

  let workers = await prisma.employee.findMany({
  where: {
    role: Role.WORKER,
    accountStatus: AccountStatus.ACTIVE,
    currentOutletId: outlet.id,
  },
  take: 3,
});

if (workers.length < 3) {
  const workerNeeded = 3 - workers.length;

  console.log(
    `⚠️ Worker existing hanya ${workers.length}. Membuat ${workerNeeded} worker dummy...`,
  );

  for (let i = 1; i <= workerNeeded; i++) {
    const workerNumber = workers.length + i;

    const worker = await prisma.employee.create({
      data: {
        name: `Seed Worker ${workerNumber}`,
        email: `seed.worker${workerNumber}@example.com`,
        passwordHash: await BcryptUtil.hash("password123"),

        role: Role.WORKER,

        accountStatus:
          AccountStatus.ACTIVE,

        workStatus:
          WorkStatus.AVAILABLE,

        currentOutletId:
          outlet.id,
      },
    });

    workers.push(worker);
  }
}

  let drivers = await prisma.employee.findMany({
  where: {
    role: Role.DRIVER,
    accountStatus: AccountStatus.ACTIVE,
    currentOutletId: outlet.id,
  },
  take: 2,
});

if (drivers.length < 2) {
  const driverNeeded = 2 - drivers.length;

  console.log(
    `⚠️ Driver existing hanya ${drivers.length}. Membuat ${driverNeeded} driver dummy...`,
  );

  for (let i = 1; i <= driverNeeded; i++) {
    const driverNumber = drivers.length + i;

    const driver = await prisma.employee.create({
      data: {
        name: `Seed Driver ${driverNumber}`,
        email: `seed.driver${driverNumber}@example.com`,
        passwordHash: await BcryptUtil.hash("password123"),

        role: Role.DRIVER,

        accountStatus:
          AccountStatus.ACTIVE,

        workStatus:
          WorkStatus.AVAILABLE,

        currentOutletId:
          outlet.id,
      },
    });

    drivers.push(driver);
  }
}

  if (workers.length < 3) {
    throw new Error(
      "Minimal membutuhkan 3 Worker ACTIVE pada outlet tersebut.",
    );
  }

  if (drivers.length < 2) {
    throw new Error(
      "Minimal membutuhkan 2 Driver ACTIVE pada outlet tersebut.",
    );
  }

  // Narrowing untuk TypeScript
  const existingCustomer = customer;
  const existingOutlet = outlet;

  const laundryItem1 = laundryItems[0];
  const laundryItem2 = laundryItems[1];
  const laundryItem3 = laundryItems[2];

  const worker1 = workers[0];
  const worker2 = workers[1];
  const worker3 = workers[2];

  const driver1 = drivers[0];
  const driver2 = drivers[1];

  if (
    !laundryItem1 ||
    !laundryItem2 ||
    !laundryItem3 ||
    !worker1 ||
    !worker2 ||
    !worker3 ||
    !driver1 ||
    !driver2
  ) {
    throw new Error(
      "Data existing tidak memenuhi kebutuhan seed.",
    );
  }

  console.log("\n📦 Existing data");
  console.log(`Customer : ${existingCustomer.email}`);
  console.log(`Outlet   : ${existingOutlet.name}`);
  console.log(
    `Workers  : ${worker1.name}, ${worker2.name}, ${worker3.name}`,
  );
  console.log(
    `Drivers  : ${driver1.name}, ${driver2.name}`,
  );

  // ============================================================
  // HELPER CREATE ORDER
  // ============================================================

  async function createOrder(
    number: number,
    status: CustomerStatus,
  ) {
    const order = await prisma.order.create({
      data: {
        orderCode: `SEED-F2-${Date.now()}-${number}`,

        customerId: existingCustomer.id,
        outletId: existingOutlet.id,

        addressSnapshot:
          "Jl. Dummy Testing No. 123, Tangerang",

        addressPhoneSnapshot:
          "081234567890",

        addressLatitude:
          money(-6.175392),

        addressLongitude:
          money(106.824964),

        distanceMeters:
          money(3500),

        pickupDate: new Date(),

        pickupScheduledAt: new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ),

        customerStatus: status,
      },
    });

    await prisma.orderItem.createMany({
      data: [
        {
          orderId: order.id,
          laundryItemId: laundryItem1?.id!,
          quantity: 5,
        },
        {
          orderId: order.id,
          laundryItemId: laundryItem2?.id!,
          quantity: 3,
        },
        {
          orderId: order.id,
          laundryItemId: laundryItem3?.id!,
          quantity: 2,
        },
      ],
    });

    return order;
  }

  // ============================================================
  // ORDER 1
  //
  // ARRIVED_AT_OUTLET
  // Bill UNPAID
  // Washing QUEUED
  // Worker belum claim
  // ============================================================

  const order1 = await createOrder(
    1,
    CustomerStatus.ARRIVED_AT_OUTLET,
  );

  const bill1 = await prisma.bill.create({
    data: {
      orderId: order1.id,

      laundryPricingId: pricing.id,
      pricePerKgSnapshot: pricing.pricePerKg,

      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,

      weightKg: money(5.5),

      totalAmount: money(
        Number(pricing.pricePerKg) * 5.5 +
          Number(shippingRate.price),
      ),

      paymentStatus:
        BillPaymentStatus.UNPAID,
    },
  });

  const workerAssignment1 =
    await prisma.workerAssignment.create({
      data: {
        orderId: order1.id,
        outletId: existingOutlet.id,

        stationType:
          StationType.WASHING,

        workerId: null,

        status:
          WorkerAssignmentStatus.QUEUED,
      },
    });

  await prisma.notification.create({
    data: {
      targetRole: Role.WORKER,
      outletId: existingOutlet.id,

      title: "Job washing baru",

      message:
        "Ada job washing baru menunggu di daftar tugas.",
    },
  });

  // Payment attempt PENDING
  await prisma.payment.create({
    data: {
      billId: bill1.id,

      gatewayOrderId:
        `SEED-PAY-${Date.now()}-1`,

      midtransTransactionId: null,

      amount: bill1.totalAmount!,

      status:
        PaymentTransactionStatus.PENDING,

      isFinal: false,
    },
  });

  // ============================================================
  // ORDER 2
  //
  // WASHING
  // Worker ASSIGNED
  // ============================================================

  const order2 = await createOrder(
    2,
    CustomerStatus.WASHING,
  );

  await prisma.bill.create({
    data: {
      orderId: order2.id,

      laundryPricingId: pricing.id,
      pricePerKgSnapshot: pricing.pricePerKg,

      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,

      weightKg: money(6),

      totalAmount: money(
        Number(pricing.pricePerKg) * 6 +
          Number(shippingRate.price),
      ),

      paymentStatus:
        BillPaymentStatus.UNPAID,
    },
  });

  const workerAssignment2 =
    await prisma.workerAssignment.create({
      data: {
        orderId: order2.id,
        outletId: existingOutlet.id,

        stationType:
          StationType.WASHING,

        workerId: worker1.id,

        assignedAt:
          new Date(Date.now() - 60 * 60 * 1000),

        status:
          WorkerAssignmentStatus.ASSIGNED,
      },
    });

  await prisma.employee.update({
    where: {
      id: worker1.id,
    },
    data: {
      workStatus: WorkStatus.BUSY,
    },
  });

  // ============================================================
  // ORDER 3
  //
  // WASHING
  // ON_HOLD_BYPASS
  // Bypass PENDING
  // ============================================================

  const order3 = await createOrder(
    3,
    CustomerStatus.WASHING,
  );

  await prisma.bill.create({
    data: {
      orderId: order3.id,

      laundryPricingId: pricing.id,
      pricePerKgSnapshot: pricing.pricePerKg,

      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,

      weightKg: money(4.5),

      totalAmount: money(
        Number(pricing.pricePerKg) * 4.5 +
          Number(shippingRate.price),
      ),

      paymentStatus:
        BillPaymentStatus.UNPAID,
    },
  });

  const workerAssignment3 =
    await prisma.workerAssignment.create({
      data: {
        orderId: order3.id,
        outletId: existingOutlet.id,

        stationType:
          StationType.WASHING,

        workerId: worker2.id,

        assignedAt:
          new Date(Date.now() - 90 * 60 * 1000),

        status:
          WorkerAssignmentStatus.ON_HOLD_BYPASS,
      },
    });

  // Worker dilepas ketika bypass
  await prisma.employee.update({
    where: {
      id: worker2.id,
    },
    data: {
      workStatus:
        WorkStatus.AVAILABLE,

      availableSinceAt:
        new Date(),
    },
  });

  await prisma.bypassRequest.create({
    data: {
      orderId: order3.id,

      workerAssignmentId:
        workerAssignment3.id,

      stationType:
        StationType.WASHING,

      requestedBy:
        worker2.id,

      quantityDiffJson:
        JSON.stringify({
          items: [
            {
              orderItemId: laundryItem1.id,
              officialQuantity: 5,
              actualQuantity: 6,
              difference: 1,
            },
            {
              orderItemId: laundryItem2.id,
              officialQuantity: 3,
              actualQuantity: 2,
              difference: -1,
            },
          ],
        }),

      status:
        BypassStatus.PENDING,
    },
  });

  // ============================================================
  // ORDER 4
  //
  // PACKING COMPLETED
  // Bill PAID
  // Delivery QUEUED
  // ============================================================

  const order4 = await createOrder(
    4,
    CustomerStatus.READY_FOR_DELIVERY,
  );

  const bill4 = await prisma.bill.create({
    data: {
      orderId: order4.id,

      laundryPricingId: pricing.id,
      pricePerKgSnapshot: pricing.pricePerKg,

      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,

      weightKg: money(7),

      totalAmount: money(
        Number(pricing.pricePerKg) * 7 +
          Number(shippingRate.price),
      ),

      paymentStatus:
        BillPaymentStatus.PAID,
    },
  });

  await prisma.workerAssignment.create({
    data: {
      orderId: order4.id,
      outletId: existingOutlet.id,

      stationType:
        StationType.PACKING,

      workerId: worker3.id,

      assignedAt:
        new Date(Date.now() - 3 * 60 * 60 * 1000),

      startedAt:
        new Date(Date.now() - 2 * 60 * 60 * 1000),

      completedAt:
        new Date(Date.now() - 60 * 60 * 1000),

      status:
        WorkerAssignmentStatus.COMPLETED,
    },
  });

  const driverAssignment1 =
    await prisma.driverAssignment.create({
      data: {
        orderId: order4.id,

        outletId:
          existingOutlet.id,

        driverId: null,

        taskType:
          PickupDeliveryType.DELIVERY,

        status:
          DriverAssignmentStatus.QUEUED,
      },
    });

  await prisma.payment.create({
    data: {
      billId: bill4.id,

      gatewayOrderId:
        `SEED-PAY-${Date.now()}-4`,

      midtransTransactionId:
        `SEED-MIDTRANS-${Date.now()}-4`,

      amount:
        bill4.totalAmount!,

      status:
        PaymentTransactionStatus.CAPTURE,

      isFinal: true,

      paidAt:
        new Date(Date.now() - 90 * 60 * 1000),
    },
  });

  await prisma.notification.create({
    data: {
      targetRole: Role.DRIVER,

      outletId:
        existingOutlet.id,

      title:
        "Delivery job baru",

      message:
        "Ada job delivery baru menunggu di daftar tugas.",
    },
  });

  // ============================================================
  // ORDER 5
  //
  // ON_THE_WAY_TO_CUSTOMER
  // Driver ASSIGNED
  // ============================================================

  const order5 = await createOrder(
    5,
    CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
  );

  const bill5 = await prisma.bill.create({
    data: {
      orderId: order5.id,

      laundryPricingId: pricing.id,
      pricePerKgSnapshot: pricing.pricePerKg,

      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,

      weightKg: money(3.5),

      totalAmount: money(
        Number(pricing.pricePerKg) * 3.5 +
          Number(shippingRate.price),
      ),

      paymentStatus:
        BillPaymentStatus.PAID,
    },
  });

  await prisma.workerAssignment.create({
    data: {
      orderId: order5.id,
      outletId: existingOutlet.id,

      stationType:
        StationType.PACKING,

      workerId: worker3.id,

      assignedAt:
        new Date(Date.now() - 5 * 60 * 60 * 1000),

      startedAt:
        new Date(Date.now() - 4 * 60 * 60 * 1000),

      completedAt:
        new Date(Date.now() - 3 * 60 * 60 * 1000),

      status:
        WorkerAssignmentStatus.COMPLETED,
    },
  });

  await prisma.driverAssignment.create({
    data: {
      orderId: order5.id,

      outletId:
        existingOutlet.id,

      driverId:
        driver1.id,

      taskType:
        PickupDeliveryType.DELIVERY,

      assignedAt:
        new Date(Date.now() - 60 * 60 * 1000),

      status:
        DriverAssignmentStatus.ASSIGNED,
    },
  });

  await prisma.payment.create({
    data: {
      billId: bill5.id,

      gatewayOrderId:
        `SEED-PAY-${Date.now()}-5`,

      midtransTransactionId:
        `SEED-MIDTRANS-${Date.now()}-5`,

      amount:
        bill5.totalAmount!,

      status:
        PaymentTransactionStatus.SETTLEMENT,

      isFinal: true,

      paidAt:
        new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
  });

  await prisma.employee.update({
    where: {
      id: driver1.id,
    },
    data: {
      workStatus:
        WorkStatus.BUSY,
    },
  });

  // ============================================================
  // ORDER 6
  //
  // WAITING_PAYMENT
  // PACKING COMPLETED
  // Bill UNPAID
  // ============================================================

  const order6 = await createOrder(
    6,
    CustomerStatus.WAITING_PAYMENT,
  );

  const bill6 = await prisma.bill.create({
    data: {
      orderId: order6.id,

      laundryPricingId: pricing.id,
      pricePerKgSnapshot: pricing.pricePerKg,

      shippingRateId: shippingRate.id,
      shippingFeeSnapshot: shippingRate.price,

      weightKg: money(8),

      totalAmount: money(
        Number(pricing.pricePerKg) * 8 +
          Number(shippingRate.price),
      ),

      paymentStatus:
        BillPaymentStatus.UNPAID,
    },
  });

  await prisma.workerAssignment.create({
    data: {
      orderId: order6.id,

      outletId:
        existingOutlet.id,

      stationType:
        StationType.PACKING,

      workerId:
        worker3.id,

      assignedAt:
        new Date(Date.now() - 6 * 60 * 60 * 1000),

      startedAt:
        new Date(Date.now() - 5 * 60 * 60 * 1000),

      completedAt:
        new Date(Date.now() - 4 * 60 * 60 * 1000),

      status:
        WorkerAssignmentStatus.COMPLETED,
    },
  });

  // Payment attempt gagal, supaya bisa test retry
  await prisma.payment.create({
    data: {
      billId:
        bill6.id,

      gatewayOrderId:
        `SEED-PAY-${Date.now()}-6`,

      midtransTransactionId:
        `SEED-MIDTRANS-${Date.now()}-6`,

      amount:
        bill6.totalAmount!,

      status:
        PaymentTransactionStatus.DENY,

      isFinal: true,
    },
  });

  // ============================================================
  // RESET WORK STATUS DATA TEST
  // ============================================================

  await prisma.employee.updateMany({
    where: {
      id: {
        in: [
          worker1.id,
          worker2.id,
          worker3.id,
          driver1.id,
          driver2.id,
        ],
      },
    },
    data: {
      workStatus:
        WorkStatus.AVAILABLE,

      availableSinceAt:
        new Date(),
    },
  });

  // Worker1 sebenarnya masih punya ASSIGNED job,
  // jadi kembalikan BUSY.
  await prisma.employee.update({
    where: {
      id: worker1.id,
    },
    data: {
      workStatus:
        WorkStatus.BUSY,
    },
  });

  // Driver1 punya ASSIGNED delivery,
  // jadi BUSY.
  await prisma.employee.update({
    where: {
      id: driver1.id,
    },
    data: {
      workStatus:
        WorkStatus.BUSY,
    },
  });

  // ============================================================
  // SUMMARY
  // ============================================================

  console.log("\n========================================");
  console.log("✅ SEED FEATURE 2 SELESAI");
  console.log("========================================");

  console.log("\nORDERS");
  console.log("Order 1:", order1.id);
  console.log("Order 2:", order2.id);
  console.log("Order 3:", order3.id);
  console.log("Order 4:", order4.id);
  console.log("Order 5:", order5.id);
  console.log("Order 6:", order6.id);

  console.log("\nASSIGNMENTS");
  console.log(
    "Worker Assignment 1:",
    workerAssignment1.id,
  );
  console.log(
    "Worker Assignment 2:",
    workerAssignment2.id,
  );
  console.log(
    "Worker Assignment 3:",
    workerAssignment3.id,
  );
  console.log(
    "Delivery Assignment:",
    driverAssignment1.id,
  );

  console.log("\nSCENARIO");
  console.log(
    "1. ARRIVED_AT_OUTLET + WASHING QUEUED",
  );
  console.log(
    "2. WASHING + WORKER ASSIGNED",
  );
  console.log(
    "3. ON_HOLD_BYPASS + PENDING BYPASS",
  );
  console.log(
    "4. READY_FOR_DELIVERY + DELIVERY QUEUED + PAID",
  );
  console.log(
    "5. ON_THE_WAY_TO_CUSTOMER + DRIVER ASSIGNED",
  );
  console.log(
    "6. WAITING_PAYMENT + PACKING COMPLETED + UNPAID",
  );

  console.log("\n========================================");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed gagal:");
    console.error(error);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
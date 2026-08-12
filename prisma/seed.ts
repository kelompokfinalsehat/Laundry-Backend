import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

const uuid = () => crypto.randomUUID();

async function main() {
    const passwordHash = await bcrypt.hash(
        "Password123!",
        10,
    );

    const result = await prisma.$transaction(
        async (tx) => {
            const outletId = uuid();
            const customerId = uuid();
            const outletAdminId = uuid();
            const driverId = uuid();
            const workerId = uuid();
            const addressId = uuid();
            const laundryItem1Id = uuid();
            const laundryItem2Id = uuid();
            const pricingId = uuid();
            const shipping3KmId = uuid();
            const shipping6KmId = uuid();
            const shipping10KmId = uuid();
            const orderId = uuid();
            const assignmentId = uuid();

            /*
             * OUTLET
             */

            const outlet = await tx.outlet.create({
                data: {
                    id: outletId,
                    name: `Outlet Test ${outletId.slice(0, 8)}`,
                    address:
                        "Jl. Dr. Wahidin Sudirohusodo, Kel. Batangkaluku, Kec. Somba Opu, Kab. Gowa",
                    latitude: -5.2050000,
                    longitude: 119.4540000,
                    isActive: true,
                },
            });

            /*
             * CUSTOMER
             */

            const customer = await tx.customer.create({
                data: {
                    id: customerId,
                    role: "CUSTOMER",
                    name: `Customer Test ${customerId.slice(0, 8)}`,
                    email: `customer-${customerId}@test.com`,
                    passwordHash,
                    authProvider: "EMAIL",
                    isEmailVerified: true,
                    phone: "081234567890",
                },
            });

            /*
             * OUTLET ADMIN
             */

            const outletAdmin =
                await tx.employee.create({
                    data: {
                        id: outletAdminId,
                        role: "OUTLET_ADMIN",
                        name: `Outlet Admin ${outletAdminId.slice(0, 8)}`,
                        email: `admin-${outletAdminId}@test.com`,
                        passwordHash,
                        phone: "081234567891",
                        accountStatus: "ACTIVE",
                        workStatus: "AVAILABLE",
                        availableSinceAt: new Date(),
                        currentOutletId: outlet.id,
                    },
                });

            /*
             * DRIVER
             */

            const driver = await tx.employee.create({
                data: {
                    id: driverId,
                    role: "DRIVER",
                    name: `Driver ${driverId.slice(0, 8)}`,
                    email: `driver-${driverId}@test.com`,
                    passwordHash,
                    phone: "081234567892",
                    accountStatus: "ACTIVE",
                    workStatus: "BUSY",
                    currentOutletId: outlet.id,
                },
            });

            /*
             * WORKER
             *
             * Tidak ada stationType di Employee.
             */

            const worker = await tx.employee.create({
                data: {
                    id: workerId,
                    role: "WORKER",
                    name: `Worker ${workerId.slice(0, 8)}`,
                    email: `worker-${workerId}@test.com`,
                    passwordHash,
                    phone: "081234567893",
                    accountStatus: "ACTIVE",
                    workStatus: "AVAILABLE",
                    availableSinceAt: new Date(),
                    currentOutletId: outlet.id,
                },
            });

            /*
             * CUSTOMER ADDRESS
             */

            const address =
                await tx.customerAddress.create({
                    data: {
                        id: addressId,
                        customerId: customer.id,
                        label: "Rumah",
                        formattedAddress:
                            "Jl. Dr. Wahidin Sudirohusodo, Kel. Batangkaluku, Kec. Somba Opu, Kab. Gowa",
                        latitude: -5.2050000,
                        longitude: 119.4540000,
                        phone: "081234567890",
                        isPrimary: true,
                    },
                });

            /*
             * LAUNDRY ITEMS
             */

            const tshirt =
                await tx.laundryItem.create({
                    data: {
                        id: laundryItem1Id,
                        name: `Kaos Test ${laundryItem1Id.slice(0, 8)}`,
                    },
                });

            const pants =
                await tx.laundryItem.create({
                    data: {
                        id: laundryItem2Id,
                        name: `Celana Test ${laundryItem2Id.slice(0, 8)}`,
                    },
                });

            /*
             * LAUNDRY PRICING
             */

            const pricing =
                await tx.laundryPricing.create({
                    data: {
                        id: pricingId,
                        pricePerKg: 7000,
                    },
                });

            /*
             * SHIPPING RATE
             */

            const shipping3Km =
                await tx.shippingRate.create({
                    data: {
                        id: shipping3KmId,
                        maxDistanceMeters: 3000,
                        price: 5000,
                    },
                });

            const shipping6Km =
                await tx.shippingRate.create({
                    data: {
                        id: shipping6KmId,
                        maxDistanceMeters: 6000,
                        price: 10000,
                    },
                });

            const shipping10Km =
                await tx.shippingRate.create({
                    data: {
                        id: shipping10KmId,
                        maxDistanceMeters: 10000,
                        price: 15000,
                    },
                });

                const now = new Date();

            /*
             * ORDER
             *
             * Driver sudah mengambil laundry.
             * Order masih ON_THE_WAY_TO_OUTLET.
             */

            const pickupDate = new Date(now);
            pickupDate.setHours(0, 0, 0, 0);

            const pickupScheduledAt = new Date(
                now.getTime() - 60 * 60 * 1000,
            );

            const order = await tx.order.create({
                data: {
                    id: orderId,
                    orderCode: `TEST-${orderId.slice(0, 8)}`,
                    customerId: customer.id,
                    outletId: outlet.id,

                    addressSnapshot:
                        address.formattedAddress,

                    addressPhoneSnapshot:
                        address.phone,

                    addressLatitude:
                        address.latitude,

                    addressLongitude:
                        address.longitude,

                    distanceMeters: 2500,

                    pickupDate,
                    pickupScheduledAt,

                    customerStatus:
                        "ON_THE_WAY_TO_OUTLET",
                },
            });

            /*
             * DRIVER ASSIGNMENT
             *
             * Driver sudah:
             * ASSIGNED → IN_PROGRESS
             * dan laundry sudah diambil.
             */

            const assignment =
                await tx.driverAssignment.create({
                    data: {
                        id: assignmentId,
                        orderId: order.id,
                        driverId: driver.id,
                        outletId: outlet.id,

                        taskType: "PICKUP",

                        assignedAt: new Date(
                            now.getTime() - 70 * 60 * 1000,
                        ),

                        departedAt: new Date(
                            now.getTime() - 50 * 60 * 1000,
                        ),

                        pickedUpAt: new Date(
                            now.getTime() - 20 * 60 * 1000,
                        ),

                        status: "IN_PROGRESS",
                    },
                });

            return {
                outlet,
                customer,
                outletAdmin,
                driver,
                worker,
                address,
                tshirt,
                pants,
                pricing,
                shipping3Km,
                shipping6Km,
                shipping10Km,
                order,
                assignment,
            };
        },
    );

    console.log("\n=================================");
    console.log("SEED SUCCESS");
    console.log("=================================");

    console.log("\nOUTLET");
    console.log("ID:", result.outlet.id);

    console.log("\nOUTLET ADMIN");
    console.log("ID:", result.outletAdmin.id);
    console.log("Email:", result.outletAdmin.email);
    console.log("Password: Password123!");

    console.log("\nDRIVER");
    console.log("ID:", result.driver.id);
    console.log("Email:", result.driver.email);
    console.log("Password: Password123!");
    console.log("WorkStatus:", result.driver.workStatus);

    console.log("\nWORKER");
    console.log("ID:", result.worker.id);
    console.log("Email:", result.worker.email);
    console.log("Password: Password123!");
    console.log("WorkStatus:", result.worker.workStatus);

    console.log("\nCUSTOMER");
    console.log("ID:", result.customer.id);
    console.log("Email:", result.customer.email);
    console.log("Password: Password123!");

    console.log("\nORDER");
    console.log("ID:", result.order.id);
    console.log("OrderCode:", result.order.orderCode);
    console.log(
        "CustomerStatus:",
        result.order.customerStatus,
    );

    console.log("\nDRIVER ASSIGNMENT");
    console.log("ID:", result.assignment.id);
    console.log("TaskType:", result.assignment.taskType);
    console.log("Status:", result.assignment.status);

    console.log("\nLAUNDRY ITEMS");
    console.log("Kaos:", result.tshirt.id);
    console.log("Celana:", result.pants.id);

    console.log("\nLAUNDRY PRICING");
    console.log(
        "Price/Kg:",
        result.pricing.pricePerKg.toString(),
    );

    console.log("\nSHIPPING RATES");
    console.log(
        "3 KM:",
        result.shipping3Km.price.toString(),
    );
    console.log(
        "6 KM:",
        result.shipping6Km.price.toString(),
    );
    console.log(
        "10 KM:",
        result.shipping10Km.price.toString(),
    );

    console.log("\n=================================");
    console.log("READY FOR RECEIVE TEST");
    console.log("=================================");
}

main()
    .catch((error) => {
        console.error("\nSEED FAILED");
        console.error(error);
        console.error(
            "\nTransaction rolled back. No seed data was committed.",
        );
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
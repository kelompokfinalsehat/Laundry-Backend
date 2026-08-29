import { prisma } from "../../configs/prisma-client.config";


/**
 * BR-PAY-03: kalau Bill jadi PAID setelah Packing selesai (dan Order bukan
 * OVERDUE), buat DriverAssignment DELIVERY berstatus QUEUED. Kalau Packing
 * baru selesai belakangan sementara Bill udah PAID duluan, job delivery
 * dibuat pas station itu yang selesai (dipanggil dari worker-assignment
 * service, bukan dari sini — file ini cuma "pintu masuk" umum yang aman
 * dipanggil dari kedua arah, idempotent).
 */
export class DriverQueueService {
  static async enqueueDeliveryIfEligible(orderId: string): Promise<void> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        bill: true,
        workerAssignments: { where: { stationType: "PACKING" } },
        driverAssignments: { where: { taskType: "DELIVERY" } },
      },
    });

    if (!order || !order.bill) return;
    if (order.customerStatus === "OVERDUE") return; // BR-PAY-04: terminal, tidak diproses lagi
    if (order.bill.paymentStatus !== "PAID") return;

    const packingCompleted = order.workerAssignments.some((w) => w.status === "COMPLETED");
    if (!packingCompleted) return;

    // Idempotency guard: job delivery buat order ini udah ada, jangan bikin dobel.
    const hasDeliveryJob = order.driverAssignments.length > 0;
    if (hasDeliveryJob) return;

    await prisma.$transaction(async (tx) => {
      // Re-cek di dalam transaction, jaga-jaga ada race condition dua
      // trigger (webhook & worker-completion) jalan nyaris bersamaan.
      const existing = await tx.driverAssignment.findFirst({
        where: { orderId, taskType: "DELIVERY" },
      });
      if (existing) return;

      await tx.driverAssignment.create({
        data: {
          orderId,
          outletId: order.outletId,
          taskType: "DELIVERY",
          status: "QUEUED",
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { customerStatus: "READY_FOR_DELIVERY" },
      });
    });
  }
}

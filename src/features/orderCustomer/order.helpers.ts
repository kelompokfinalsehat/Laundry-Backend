import { ResponseError } from "../../utils/errors/response-error.utils";
import {
  CUSTOMER_STATUS_LABELS,
  CUSTOMER_STATUS_ORDER,
} from "./order.constans";

const OPERATIONAL_START_HOUR = 8; // BR-OUTLET-01
const OPERATIONAL_END_HOUR = 19; // BR-PICKUP-01 (jendela request, bukan jam tutup outlet 20.00)

const JAKARTA_OFFSET_HOURS = 7; // WIB = UTC+7, tanpa DST

function toJakartaTime(now: Date): Date {
  return new Date(now.getTime() + JAKARTA_OFFSET_HOURS * 60 * 60 * 1000);
}

export class OrderHelper {
  static assertWithinRequestWindow(now: Date) {
    const jakartaTime = toJakartaTime(now);
    const day = jakartaTime.getUTCDay(); // pakai getUTCDay, bukan getDay
    const hour = jakartaTime.getUTCHours(); // pakai getUTCHours, bukan getHours

    const isMondayToSaturday = day >= 1 && day <= 6;
    const isWithinHours =
      hour >= OPERATIONAL_START_HOUR && hour < OPERATIONAL_END_HOUR;

    if (!isMondayToSaturday || !isWithinHours) {
      throw new ResponseError(
        "OUTLET_NOT_AVAILABLE",
        "Request pickup hanya bisa dibuat Senin-Sabtu, pukul 08.00-19.00.",
      );
    }
  }

  static buildPickupScheduledAt(pickupDate: string, pickupTime: string): Date {
    // NOTE: konstruksi naive, asumsi server jalan di timezone yang sama
    // dengan operasional outlet (WIB/Asia-Jakarta). Kalau server di-deploy
    // di timezone lain, ini perlu di-convert eksplisit.
    const scheduledAt = new Date(`${pickupDate}T${pickupTime}:00`);

    if (Number.isNaN(scheduledAt.getTime())) {
      throw new ResponseError(
        "INVALID_PICKUP_DATE",
        "Tanggal atau jam pickup tidak valid.",
      );
    }

    const day = scheduledAt.getDay();
    if (day === 0) {
      // BR-PICKUP-02: tanggal pickup hanya boleh Senin-Sabtu.
      throw new ResponseError(
        "INVALID_PICKUP_DATE",
        "Tanggal pickup tidak boleh hari Minggu.",
      );
    }

    if (scheduledAt.getTime() <= Date.now()) {
      throw new ResponseError(
        "INVALID_PICKUP_DATE",
        "Tanggal/jam pickup harus di masa depan.",
      );
    }

    return scheduledAt;
  }

  static buildTimeline(order: {
    customerStatus: string;
    createdAt: Date;
    receivedAt: Date | null;
    driverAssignments: {
      taskType: string;
      pickedUpAt: Date | null;
      deliveredAt: Date | null;
    }[];
    workerAssignments: {
      stationType: string;
      startedAt: Date | null;
      completedAt: Date | null;
    }[];
    bill: { paidAt: Date | null } | null;
  }) {
    // Ambil timestamp dari field yang KEBETULAN ada — bukan riwayat lengkap
    // asli (nggak ada tabel status history di v2.1), lihat catatan di atas.
    const pickup = order.driverAssignments.find((a) => a.taskType === "PICKUP");
    const delivery = order.driverAssignments.find(
      (a) => a.taskType === "DELIVERY",
    );
    const washing = order.workerAssignments.find(
      (w) => w.stationType === "WASHING",
    );
    const ironing = order.workerAssignments.find(
      (w) => w.stationType === "IRONING",
    );
    const packing = order.workerAssignments.find(
      (w) => w.stationType === "PACKING",
    );

    const timestampByStatus: Record<string, Date | null> = {
      SCHEDULED: order.createdAt,
      ON_THE_WAY_TO_OUTLET: pickup?.pickedUpAt ?? null,
      ARRIVED_AT_OUTLET: order.receivedAt,
      WASHING: washing?.startedAt ?? null,
      IRONING: ironing?.startedAt ?? null,
      PACKING: packing?.startedAt ?? null,
      ON_THE_WAY_TO_CUSTOMER: delivery?.deliveredAt
        ? null
        : (delivery?.pickedUpAt ?? null),
      RECEIVED_BY_CUSTOMER:
        order.bill?.paidAt && delivery?.deliveredAt
          ? delivery.deliveredAt
          : null,
    };

    const currentIndex = CUSTOMER_STATUS_ORDER.indexOf(
      order.customerStatus as (typeof CUSTOMER_STATUS_ORDER)[number],
    );

    return CUSTOMER_STATUS_ORDER.map((status, index) => ({
      status,
      label: CUSTOMER_STATUS_LABELS[status],
      timestamp: timestampByStatus[status] ?? null,
      isCompleted: currentIndex >= 0 && index < currentIndex,
      isCurrent: status === order.customerStatus,
    }));
  }

  static getTodayInJakarta(now: Date = new Date()): string {
  const jakartaTime = toJakartaTime(now);
  const yyyy = jakartaTime.getUTCFullYear();
  const mm = String(jakartaTime.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(jakartaTime.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
}

import { CustomerStatus } from "../../../generated/prisma";


export const ORDER_STATUS_GROUPS = {
  BELUM_BAYAR: [
    CustomerStatus.WAITING_PAYMENT,
    CustomerStatus.OVERDUE,
  ],
  SEDANG_DIPROSES: [
    CustomerStatus.SCHEDULED,
    CustomerStatus.WAITING_DRIVER_PICKUP,
    CustomerStatus.ON_THE_WAY_TO_OUTLET,
    CustomerStatus.ARRIVED_AT_OUTLET,
    CustomerStatus.WASHING,
    CustomerStatus.IRONING,
    CustomerStatus.PACKING,
  ],
  DIKIRIM: [
    CustomerStatus.READY_FOR_DELIVERY,
    CustomerStatus.ON_THE_WAY_TO_CUSTOMER,
    CustomerStatus.WAITING_CUSTOMER_CONFIRMATION,
  ],
  SELESAI: [
    CustomerStatus.RECEIVED_BY_CUSTOMER,
  ],
} as const satisfies Record<string, CustomerStatus[]>;

export type OrderStatusGroupKey = keyof typeof ORDER_STATUS_GROUPS;

// Label untuk ditampilkan di tab UI, biar frontend tidak hardcode string terpisah
export const ORDER_STATUS_GROUP_LABELS: Record<OrderStatusGroupKey, string> = {
  BELUM_BAYAR: "Belum Bayar",
  SEDANG_DIPROSES: "Sedang Diproses",
  DIKIRIM: "Dikirim",
  SELESAI: "Selesai",
};

export const CUSTOMER_STATUS_LABELS: Record<string, string> = {
  SCHEDULED: "Menunggu Jadwal Pickup",
  WAITING_DRIVER_PICKUP: "Menunggu Penjemputan Driver",
  ON_THE_WAY_TO_OUTLET: "Laundry Sedang Menuju Outlet",
  ARRIVED_AT_OUTLET: "Laundry Telah Sampai Outlet",
  WASHING: "Laundry Sedang Dicuci",
  IRONING: "Laundry Sedang Disetrika",
  PACKING: "Laundry Sedang Di Packing",
  WAITING_PAYMENT: "Menunggu Pembayaran",
  OVERDUE: "Pembayaran Terlambat", // terminal — BR-PAY-04
  READY_FOR_DELIVERY: "Laundry Siap Diantar",
  ON_THE_WAY_TO_CUSTOMER: "Laundry Sedang Dikirim Menuju Customer",
  WAITING_CUSTOMER_CONFIRMATION: "Menunggu Konfirmasi Customer",
  RECEIVED_BY_CUSTOMER: "Laundry Telah Diterima Customer / Selesai", // terminal normal
};
 
/**
 * Urutan progres normal. TIDAK ADA status CANCELLED — BR-PICKUP-03 (v2.2):
 * "Setelah request dibuat, customer tidak dapat membatalkan atau mengubah
 * pickup." Tidak ada endpoint cancel, status CANCELLED, atau cancel reason.
 */
export const CUSTOMER_STATUS_ORDER = [
  "SCHEDULED",
  "WAITING_DRIVER_PICKUP",
  "ON_THE_WAY_TO_OUTLET",
  "ARRIVED_AT_OUTLET",
  "WASHING",
  "IRONING",
  "PACKING",
  "WAITING_PAYMENT",
  "READY_FOR_DELIVERY",
  "ON_THE_WAY_TO_CUSTOMER",
  "WAITING_CUSTOMER_CONFIRMATION",
  "RECEIVED_BY_CUSTOMER",
] as const;
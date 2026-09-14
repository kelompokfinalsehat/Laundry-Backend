export function mapStatusToUserMessage(transactionStatus: string): string {
  switch (transactionStatus) {
    case "settlement":
    case "capture":
      return "Pembayaran berhasil";
    case "pending":
      return "Pembayaran sedang diproses";
    case "expire":
      return "Pembayaran telah kedaluwarsa";
    case "cancel":
      return "Pembayaran dibatalkan";
    case "deny":
      return "Pembayaran ditolak";
    default:
      return "Status pembayaran tidak diketahui";
  }
}
import * as zod from "zod";

// Schema dasar buat page & limit, dipakai SEMUA endpoint list.
// Angka default dan batas maksimum ini SENGAJA ditaruh di satu tempat,
// biar kalau nanti tim sepakat ganti (misal maxlimit dari 100 jadi
// 50), cukup diubah di sini, tidak perlu ubah satu-satu di tiap module.
export const paginationSchema = zod.object({
  page: zod.coerce.number().int().min(1).default(1),
  pageSize: zod.coerce.number().int().min(1).max(100).default(10),
});

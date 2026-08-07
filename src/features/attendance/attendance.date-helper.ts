export const getAttendanceDateWIB = (date: Date = new Date()): Date => {
  const dateWIB = date.toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
  return new Date(`${dateWIB}T00:00:00.000Z`);
};

export function getMingguIni() {
  const hariIni = getAttendanceDateWIB();
  const urutanHari = hariIni.getUTCDate(); // begitu udah dapet hariini, dia dikembaliin ke urutannya dalam minggu

  let selisihKeHariSenin: number;
  if (urutanHari === 0) {
    selisihKeHariSenin = 6;
  } else {
    selisihKeHariSenin = urutanHari - 1;
  }

  const hariSenin = new Date(hariIni);
  hariSenin.setUTCDate(hariIni.getUTCDate() - selisihKeHariSenin);

  const hariMinggu = new Date(hariSenin);
  hariMinggu.setUTCDate(hariSenin.getUTCDate() + 6);

  return { gte: hariSenin, lte: hariMinggu };
}

export function getBulanIni() {
  const getHariIni = getAttendanceDateWIB();

  const tahunIni = getHariIni.getUTCFullYear();
  const bulanIni = getHariIni.getUTCMonth();

  const tanggalAwalBulan = new Date(Date.UTC(tahunIni, bulanIni, 1));
  const tanggalAkhirBulan = new Date(Date.UTC(tahunIni, bulanIni + 1, 0));

  return { gte: tanggalAwalBulan, lte: tanggalAkhirBulan };
}

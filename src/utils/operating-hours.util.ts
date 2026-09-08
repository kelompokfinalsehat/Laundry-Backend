import { ResponseError } from "./errors/response-error.utils";

export class OperatingHoursUtil {
  static assertOperatingHour() {
    const nowWib = new Date(Date.now() + 7 * 60 * 60 * 1000);

    const day = nowWib.getDay();
    const hour = nowWib.getUTCHours();

    const isWorkingDay = day >= 1 && day <= 5;
    const isWorkingHour = hour >= 8 && hour <= 19;
    if(!isWorkingDay || !isWorkingHour) throw new ResponseError('FORBIDDEN',"Operasional hanya tersedia pada hari Senin-Jumat pukul 08.00-19.00")
  }
}

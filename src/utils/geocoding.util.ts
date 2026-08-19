import { OPENCAGE_API_KEY } from "../configs/env.config";
import { ResponseError } from "./errors/response-error.utils";

const OPENCAGE_BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

type GeocodeResult = {
  latitude: number;
  longitude: number;
};

export class GeocodingUtil {
  static async geocode(formattedAddress: string): Promise<GeocodeResult> {
    if (!OPENCAGE_API_KEY) {
      throw new Error("OPENCAGE_API_KEY belum dikonfigurasi");
    }

    const params = new URLSearchParams({
      q: formattedAddress,
      key: OPENCAGE_API_KEY,
      countrycode: "id",
      limit: "1",
      no_annotations: "1",
    });

    let res: Response;
    try {
      res = await fetch(`${OPENCAGE_BASE_URL}?${params.toString()}`);
    } catch (error) {
      console.error("OpenCage request error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memproses alamat. Coba tulis alamat lebih lengkap.",
      );
    }

    if (!res.ok) {
      const body = await res.text();
      console.error("OpenCage HTTP error:", res.status, body);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memproses alamat. Coba tulis alamat lebih lengkap.",
      );
    }

    const json = await res.json();
    const firstResult = json?.results?.[0];

    if (!firstResult) {
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Alamat tidak ditemukan. Coba tulis alamat lebih lengkap.",
      );
    }

    if (firstResult.confidence < 5) {
      console.warn(
        "Geocode confidence rendah:",
        formattedAddress,
        "confidence:",
        firstResult.confidence,
        "formatted:",
        firstResult.formatted,
      );
    }

    return {
      latitude: firstResult.geometry.lat,
      longitude: firstResult.geometry.lng,
    };
  }
}
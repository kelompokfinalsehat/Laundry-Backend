
import {
  OPENCAGE_API_KEY,
} from "../configs/env.config";
import { ResponseError } from "./errors/response-error.utils";

const OPENCAGE_BASE_URL = "https://api.opencagedata.com/geocode/v1/json";

type GeocodeResult = { latitude: number; longitude: number };

export class GeocodingUtil {
  static async geocode(formattedAddress: string): Promise<GeocodeResult> {
    const url = `${OPENCAGE_BASE_URL}?q=${encodeURIComponent(formattedAddress)}&key=${OPENCAGE_API_KEY}&limit=1&no_annotations=1`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new ResponseError("GEOCODING_FAILED", "Gagal memproses alamat. Coba tulis alamat lebih lengkap.");
    }

    const json = await res.json();
    const firstResult = json?.results?.[0];

    if (!firstResult) {
      throw new ResponseError("GEOCODING_FAILED", "Alamat tidak ditemukan. Coba tulis alamat lebih lengkap.");
    }

    return {
      latitude: firstResult.geometry.lat,
      longitude: firstResult.geometry.lng,
    };
  }
}
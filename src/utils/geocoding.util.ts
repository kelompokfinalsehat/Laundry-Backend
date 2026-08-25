import { isAxiosError } from "axios";
import { opencageClient } from "../configs/axios.config";
import { ResponseError } from "./errors/response-error.utils";
import haversine from "haversine-distance";

type GeocodeResult = {
  latitude: number;
  longitude: number;
};

export class GeocodingUtil {
  static async geocode(formattedAddress: string): Promise<GeocodeResult> {
    let res;

    try {
      res = await opencageClient.get("/json", {
        params: {
          q: formattedAddress,
          countrycode: "id",
          language: "id",
          limit: 5,
          no_annotations: 1,
        },
      });
      console.log(
        "OpenCage results:",
        JSON.stringify(res.data.results, null, 2),
      );
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          "OpenCage HTTP error:",
          error.response?.status,
          error.response?.data,
        );
      } else {
        console.error("OpenCage request error:", error);
      }

      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memproses alamat. Coba tulis alamat lebih lengkap.",
      );
    }

    const results = res.data?.results ?? [];

    if (!results.length) {
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Alamat tidak ditemukan. Coba tulis alamat lebih lengkap.",
      );
    }

    const result =
      results.find(
        (item: any) =>
          item.components?._type === "house" ||
          item.components?._type === "building",
      ) ??
      results.find((item: any) => item.components?._type === "road") ??
      results[0];

    return {
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
    };
  }
  static haversineDistanceMeters(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    return haversine({ lat: lat1, lon: lng1 }, { lat: lat2, lon: lng2 });
  }
}

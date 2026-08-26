// services/region.service.ts
import { rajaOngkirClient } from "../../configs/axios.config";
import { ResponseError } from "../../utils/errors/response-error.utils";
import {
  RegionCitiesInput,
  RegionDistrictInput,
  RegionSubDistrictInput,
} from "./region.validations";

// catatan: saat naik ke production console.error ganti jadi logger

export class RegionService {
  static async getProvinces() {
    try {
      const res = await rajaOngkirClient.get("/destination/province");
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getProvinces error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memuat daftar provinsi.",
      );
    }
  }

  static async getCities({ params }: RegionCitiesInput) {
    try {
      const res = await rajaOngkirClient.get(
        `/destination/city/${params.provinceId}`,
      );
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getCities error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memuat daftar kota/kabupaten.",
      );
    }
  }

  static async getDistricts({ params }: RegionDistrictInput) {
    try {
      const res = await rajaOngkirClient.get(
        `/destination/district/${params.cityId}`,
      );
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getDistricts error:", error);
      throw new ResponseError(
        "GEOCODING_FAILED",
        "Gagal memuat daftar kecamatan.",
      );
    }
  }
  static async getSubDistrict({ params }: RegionSubDistrictInput) {
    try {
      const res = await rajaOngkirClient.get(
        `/destination/sub-district/${params.districtId}`,
      );
      return res.data.data as { id: number; name: string }[];
    } catch (error) {
      console.error("RajaOngkir getSubDistricts error:", error);
      throw new ResponseError("GEOCODING_FAILED", "Gagal memuat Kelurahan");
    }
  }
}

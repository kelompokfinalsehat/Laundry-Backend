import { z } from "zod";

export class RegionValidation {
  static readonly GET_CITIES = z.object({
    params: z.object({
      provinceId: z.string().regex(/^\d+$/, "ID provinsi tidak valid"),
    }),
  });

  static readonly GET_DISTRICTS = z.object({
    params: z.object({
      cityId: z.string().regex(/^\d+$/, "ID kota/kabupaten tidak valid"),
    }),
  });

  static readonly GET_SUB_DISTRICTS = z.object({
    params: z.object({
      districtId: z.string().regex(/^\d+$/, "ID kecamatan tidak valid"),
    }),
  });

  static readonly PREVIEW_LOCATION = z.object({
    body: z.object({
      provinceName: z.string().min(1),
      cityName: z.string().min(1),
      districtName: z.string().min(1),
      subDistrictName: z.string().min(1),
      zipCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit angka"),
      streetDetail: z.string().min(10, "Detail alamat terlalu pendek"),
    }),
  });
}

export type RegionCitiesInput = z.infer<typeof RegionValidation.GET_CITIES>;
export type RegionDistrictInput = z.infer<
  typeof RegionValidation.GET_DISTRICTS
>;
export type RegionSubDistrictInput = z.infer<
  typeof RegionValidation.GET_SUB_DISTRICTS
>;
export type PreviewlocationInput = z.infer<
  typeof RegionValidation.PREVIEW_LOCATION
>;

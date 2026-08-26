import axios from "axios";
import { OPENCAGE_API_KEY, RAJAONGKIR_API_KEY } from "./env.config";

export const opencageClient = axios.create({
  baseURL: "https://api.opencagedata.com/geocode/v1",
  params: {
    key: OPENCAGE_API_KEY,
    countrycode: "id",
    limit: 1,
    no_annotations: 1,
  },
});

export const rajaOngkirClient = axios.create({
  baseURL: "https://rajaongkir.komerce.id/api/v1",
  headers: {
    key: RAJAONGKIR_API_KEY,
  },
});
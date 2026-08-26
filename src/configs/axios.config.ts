import axios from "axios";
import { OPENCAGE_API_KEY, RAJAONGKIR_API_KEY } from "./env.config";
export const rajaOngkirClient = axios.create({
  baseURL: "https://rajaongkir.komerce.id/api/v1",
  headers: {
    key: RAJAONGKIR_API_KEY,
  },
});
import { OPENCAGE_BASE_URL } from "./env.config";

export const opencageClient = axios.create({
    baseURL: OPENCAGE_BASE_URL,
    timeout: 10000
})
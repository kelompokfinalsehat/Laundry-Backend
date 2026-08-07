import axios from "axios";
import { OPENCAGE_BASE_URL } from "./env.config";

export const opencageClient = axios.create({
    baseURL: OPENCAGE_BASE_URL,
    timeout: 10000
})
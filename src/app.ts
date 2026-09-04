import express from "express";
import routes from "./routes";
import cors from "cors";
import {
  API_PREFIX,
  NODE_ENV,
  PORT,
  WHITE_LIST,
} from "./configs/env.config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import cookieParser from "cookie-parser";
import { startAutoConfirmJob } from "./features/orderActionCustomer/autoConfirm.job";
import { logger } from "./configs/logger.config";
import { ResponseError } from "./utils/errors/response-error.utils";

const app = express();

/**
 * Request logger
 * Harus diletakkan paling awal supaya semua request
 * termasuk OPTIONS/preflight tercatat.
 */
app.use((req, _res, next) => {
  logger.info(
    `[REQUEST] ${req.method} ${req.originalUrl} | Origin: ${
      req.headers.origin ?? "-"
    }`,
  );

  next();
});

/**
 * CORS
 */
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || WHITE_LIST.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(
        new ResponseError(
          "CORS_NOT_ALLOWED",
          `Origin ${origin} tidak diizinkan mengakses API ini.`,
        ),
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

/**
 * API routes
 */
app.use(`${API_PREFIX}/v1`, routes);

/**
 * Error handler harus paling akhir
 */
app.use(errorHandler);

/**
 * Development server
 *
 * startAutoConfirmJob hanya dijalankan sekali
 * ketika server development benar-benar start.
 */
// if (NODE_ENV === "development") {
//   app.listen(PORT, () => {
//     logger.info(
//       `[🔌LaundryApp] Application is running on port: ${PORT}`,
//     );

//     logger.info(
//       "[⏰AutoConfirm] Starting auto confirmation job...",
//     );

//     startAutoConfirmJob();
//   });
// }

export default app;
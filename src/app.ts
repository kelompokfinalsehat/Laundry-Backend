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

import { MorganMiddleware } from "./middlewares/morgan.middleware";

const app = express();


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

      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);


app.use(express.json());
app.use(cookieParser());

app.use(MorganMiddleware.handler());
/**
 * API routes
 */
app.use(`${API_PREFIX}/v1`, routes);

/**
 * Error handler harus paling akhir
 */
app.use(errorHandler);

if (
  (NODE_ENV === "development" || NODE_ENV === "production") 
) {
  startAutoConfirmJob();
}
/**
 * Development server
 *
 * startAutoConfirmJob hanya dijalankan sekali
 * ketika server development benar-benar start.
 */
// if (NODE_ENV === "development") {
//   app.listen(PORT, () => {
//     logger.info(`[🔌LaundryApp] Application is running on port: ${PORT}`);

//     startAutoConfirmJob();
//   });
// }

export default app;
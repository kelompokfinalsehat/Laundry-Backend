import express from 'express';
import routes from "./routes";
import cors from "cors";
import { API_PREFIX, NODE_ENV, PORT, WHITE_LIST } from './configs/env.config';
import { errorHandler } from './middlewares/error-handler.middleware';
import cookieParser from 'cookie-parser';



const app = express();

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

app.use(`${API_PREFIX}/v1`, routes);

app.use(errorHandler);

if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`[🔌LaundryApp] Application is running on port: ${PORT}`);
  });
}



export default app;
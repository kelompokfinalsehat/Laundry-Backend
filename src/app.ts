import express from 'express';
import routes from "./routes";
import cors from "cors";
import { API_PREFIX, NODE_ENV, PORT, WHITE_LIST } from './configs/env.config';
import { ErrorMiddleware } from './middlewares/error.midleware';



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

app.use(`${API_PREFIX}/v1`, routes);

app.use(ErrorMiddleware);

if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`[🔌LaundryApp] Application is running on port: ${PORT}`);
  });
}



export default app;
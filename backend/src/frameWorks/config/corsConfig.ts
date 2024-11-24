import cors from "cors";
import { config } from "./envConfig";

export const corsOptions: cors.CorsOptions = {
  origin: config.CORS_ORIGIN,
  // origin: [config.CORS_ORIGIN!, config.CORS_ORIGIN2!],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

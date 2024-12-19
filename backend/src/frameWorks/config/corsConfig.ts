import cors from "cors";
import { config } from "./envConfig";

export const corsOptions: cors.CorsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

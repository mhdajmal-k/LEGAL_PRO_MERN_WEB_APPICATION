import express from "express";
import http from "http";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "../config/corsConfig";
import { connectToDatabase } from "../database/mongoDbCongig";
import { config } from "../config/envConfig";
import routes from "./routers/routers";
import { errorHandler } from "../middleware/errorHandiler";
import helmet from "helmet";
import morgan from "morgan";
import { apiLimiter } from "../config/rateLimit";

const app = express();
const server = http.createServer(app);

dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(apiLimiter);
routes(app);
connectToDatabase();
app.use(errorHandler);

server.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});

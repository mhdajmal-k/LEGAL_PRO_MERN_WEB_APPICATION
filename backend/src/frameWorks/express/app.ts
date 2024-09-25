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

const app = express();
const server = http.createServer(app);
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));
app.use(cookieParser());

routes(app);
connectToDatabase();
app.use(errorHandler);

server.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});

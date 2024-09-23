import express from "express";
import http from "http";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import { corsOptions } from "../config/corsConfig";
import { connectToDatabase } from "../database/mongoDbCongig";
import { config } from "../config/envConfig";
import routes from "./routers/routers";

const app = express();
const server = http.createServer(app);
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsOptions));

routes(app);
connectToDatabase();

server.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});

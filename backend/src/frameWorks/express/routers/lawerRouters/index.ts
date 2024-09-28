import { Express, Router } from "express";
import { lawyerAuthRouter } from "./authRouters";

export const lawyerRouter = Router();

lawyerRouter.use("/", lawyerAuthRouter);

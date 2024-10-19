import { Express, Router } from "express";
import { lawyerAuthRouter } from "./authRouters";
import { slotRoute } from "./slotRutes";

export const lawyerRouter = Router();

lawyerRouter.use("/", lawyerAuthRouter);
lawyerRouter.use("/slot", slotRoute);

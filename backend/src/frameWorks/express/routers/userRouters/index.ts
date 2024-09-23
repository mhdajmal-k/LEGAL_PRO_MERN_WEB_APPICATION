import { Express, Router } from "express";
import { authRouter } from "./authRouters";

export const userRouter = Router();

userRouter.use("/user", authRouter);

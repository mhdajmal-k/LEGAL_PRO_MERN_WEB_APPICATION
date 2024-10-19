import { Express, Router } from "express";
import { authRouter } from "./authRouters";
import { profileRoute } from "./profileRoutes";
import multer from "multer";
import { authorization } from "../../../middleware/authMilddlewere";
import { userLawyerRoute } from "./userLawyerRoute";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const userRouter = Router();

userRouter.use("/user", authRouter);
userRouter.use("/user/Profile", profileRoute);
userRouter.use("/user/lawyers", userLawyerRoute);

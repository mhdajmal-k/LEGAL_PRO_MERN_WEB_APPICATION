import { Router } from "express";
import { authRouter } from "./authRouters";
import { profileRoute } from "./profileRoutes";
import multer from "multer";
import { userLawyerRoute } from "./userLawyerRoute";

import { appointmentRoute } from "./appoinemnetRoute";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const userRouter = Router();

userRouter.use("/user", authRouter);
userRouter.use("/user/Profile", profileRoute);
userRouter.use("/user/lawyers", userLawyerRoute);
userRouter.use("/user/appointment", appointmentRoute);

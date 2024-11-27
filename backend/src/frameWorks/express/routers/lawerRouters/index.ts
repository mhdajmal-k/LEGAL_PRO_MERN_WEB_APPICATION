import { Router } from "express";
import { lawyerAuthRouter } from "./authRouters";
import { slotRoute } from "./slotRutes";
import { lawyerAppointmentRoute } from "./appointmentRoute";
import { blogRoute } from "./blogRoutes";

export const lawyerRouter = Router();

lawyerRouter.use("/", lawyerAuthRouter);
lawyerRouter.use("/slot", slotRoute);
lawyerRouter.use("/appointment", lawyerAppointmentRoute);
lawyerRouter.use("/blog", blogRoute);

import { Express, Router } from "express";
import { lawyerAuthRouter } from "./authRouters";
import { slotRoute } from "./slotRutes";
import { lawyerAppointmentRoute } from "./appointmentRoute";

export const lawyerRouter = Router();

lawyerRouter.use("/", lawyerAuthRouter);
lawyerRouter.use("/slot", slotRoute);
lawyerRouter.use("/appointment", lawyerAppointmentRoute);

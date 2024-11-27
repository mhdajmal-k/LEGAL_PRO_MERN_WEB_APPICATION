import { Application } from "express";
import { userRouter } from "./userRouters";
import { lawyerRouter } from "./lawerRouters";
import { adminRouter } from "./adminRouters";

const routes = (app: Application) => {
  app.use("/api", userRouter);
  app.use("/api/lawyer", lawyerRouter);
  app.use("/api/admin", adminRouter);
};
export default routes;

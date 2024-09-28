import { connect } from "http2";

import { Application } from "express";
import { userRouter } from "./userRouters";
import { lawyerRouter } from "./lawerRouters";

const routes: Function = (app: Application) => {
  app.use("/api", userRouter);
  app.use("/api/lawyer", lawyerRouter);
};
export default routes;

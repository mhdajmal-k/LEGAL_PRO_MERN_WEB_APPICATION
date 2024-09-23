import { connect } from "http2";

import { Application } from "express";
import { userRouter } from "./userRouters";

const routes: Function = (app: Application) => {
  app.use("/api", userRouter);
};
export default routes;

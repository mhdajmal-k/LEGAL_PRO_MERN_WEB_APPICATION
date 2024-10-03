import { Request, Response, NextFunction } from "express";
export interface CustomError extends Error {
  statusCode?: number;
  statusMessage?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || res.statusCode || 500;
  console.log(errStatus, "is the status code ddddddddddddddddddddddddd");
  const errMsg = res.statusMessage || err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

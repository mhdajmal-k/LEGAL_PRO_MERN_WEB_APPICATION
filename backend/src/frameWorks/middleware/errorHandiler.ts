import { Request, Response, NextFunction } from "express";
export interface CustomError extends Error {
  statusCode?: number;
  statusMessage?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const errStatus = err.statusCode || res.statusCode || 500;
  const errMsg =
    err.message || res.statusMessage || err || "Something went wrong";

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

type CustomErr = {
  message: string;
  status: number;
  stack: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: CustomErr,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = err.status !== 200 ? err.status : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

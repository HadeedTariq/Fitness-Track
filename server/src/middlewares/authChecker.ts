import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const authChecker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next({ message: "Token is required", status: 404 });
  }

  const isCorrectAccessToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!
  );
  if (isCorrectAccessToken) {
    req.body.user = isCorrectAccessToken;
    next();
  } else {
    next({ message: "Invalid Tokens", status: 404 });
  }
};

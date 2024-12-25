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

  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  if (user) {
    req.body.user = user;

    next();
  } else {
    next({ message: "Invalid Tokens", status: 404 });
  }
};

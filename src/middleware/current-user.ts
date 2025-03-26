import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { UserPayload } from "../typings/express";

export const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Set token from Bearer Token
      token = req.headers.authorization.split(' ')[1]
  }

  if(!token) {
    // throw new BadRequestError("Invalid email");
    res.status(StatusCodes.UNAUTHORIZED).json({ Message: 'Not Logged In' });
    return;
}

  try {
    const payload = jwt.verify(
      // req.session.jwt,
      token,
      process.env.JWT_SECRET!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
    return;
  }
  next();
};

import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../typings/express";

export const generateJWT = (req: Request, payload: UserPayload) => {
  const userJWT = jwt.sign(payload, process.env.JWT_SECRET!);

  return userJWT;
};

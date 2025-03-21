import { RequestHandler, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "../logger";

export const notFound = (_: Request, res: Response, next: NextFunction) => {
  const message = "Route does not exist";
  Logger.error(message);
  res.status(StatusCodes.NOT_FOUND).json({ message });
  next();
};

import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";
import Logger from "../logger";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Server related errors
  // if (err instanceof CustomError) {
  //   Logger.error(err.serializeErrors());
  //   return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  // }

  if (process.env.NODE_ENV === "production") Logger.error({ err });

  Logger.error({ err });

  // Prisma related errors
  // if (err instanceof Prisma.PrismaClientKnownRequestError) {
  //   if (err.code === "P2002")
  //     return res
  //       .status(StatusCodes.BAD_REQUEST)
  //       .json({ errors: [{ message: "Unique constraint" }] });

  //   if (err.code === "P2025")
  //     return res
  //       .status(StatusCodes.BAD_REQUEST)
  //       .json({ errors: [{ message: err.meta?.cause }] });

  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ errors: [{ message: "Something went wrong" }] });
  // }

  // if (err instanceof Prisma.PrismaClientValidationError) {
  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ errors: [{ message: "please fill out all fields" }] });
  // }

  // Other uncaught errors
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: err.message }],
  });

  // next();
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  if (process.env.NODE_ENV === "production") Logger.error({ err });

  Logger.error({ err });
  res.status(statusCode)
  res.json({
      message: err.message,
      stack: process.env.NODE_ENV  === 'production' ? null : err.stack
  })
}
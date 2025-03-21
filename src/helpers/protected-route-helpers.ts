import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors";


export const isHRExecutive = (req: Request, _: Response, next: NextFunction) => {
  // if (req.currentUser?.role !== Role.AFCTCA) throw new ForbiddenError();
  // if (req.currentUser?.role !== Role.OLD_MUTUAL) throw new ForbiddenError();
  if (req.currentUser?.role === Role.HR_EXECUTIVE || req.currentUser?.role === Role.SUPER_ADMIN || req.currentUser?.role === Role.HR_MANAGER) {
    next();
  } else {
    throw new ForbiddenError();
  }
};



export const isSuperAdmin = (req: Request, _: Response, next: NextFunction) => {
  // if (req.currentUser?.role !== Role.SUPER_ADMIN && req.currentUser?.isEnabled)
  //   throw new ForbiddenError();
  // next();
  if (req.currentUser?.role === Role.SUPER_ADMIN && req.currentUser.isEmailVerified) {
    // throw new ForbiddenError();
    next()
  } else {
    // next();
    throw new ForbiddenError();
  }
};

export const uploadCategory = {
  public: process.env.AWS_PUBLIC_CATEGORY! + "/",
  private: process.env.AWS_PRIVATE_CATEGORY! + "/",
};

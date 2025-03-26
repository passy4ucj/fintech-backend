// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { UserPayload } from "../typings/express";

// export const currentUserMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // check if the cookie has been set
//   try {
//     const payload = jwt.verify(
//       req.currentUser,
//       process.env.JWT_SECRET!
//     ) as UserPayload;

//     req.currentUser = payload;
//   } catch (error) {}
//   next();
// };

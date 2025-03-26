import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  generateJWT,
  Password,
  successResponse,
} from "../helpers";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import Logger from "../logger";
import { findUser, findUserByIdService, findUserByPhone, getAllUserService, registerUser } from "../services";

// @desc    Login Users
// @route   POST    /api/v1/user/signin-user
export const loginUserController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    const user = await findUser(email);
  
    if (!user) throw new BadRequestError("Invalid credentials");
  
    const passwordMatch = await Password.comparePassword(
      password,
      user?.password!
    );
  
    if (!passwordMatch) throw new BadRequestError("Invalid credentials");
  
    // After providing valid credentials
    // Generate the JWT and attach it to the req session object
    const userJWT = generateJWT(req, {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber!,
    });
  
    // remove password from the user object
    delete user.password;
  
    successResponse(res, StatusCodes.OK, {
      user,
      token: userJWT
    });
};

// @desc    Fetches the current user
// @route   GET   /api/v2/auth/current-user
export const currentUser = async (req: Request, res: Response): Promise<void> => {
    if (!req.currentUser) {
      res.status(StatusCodes.UNAUTHORIZED).json({ currentUser: null });
      return;
    }
  
    const currentUser = await findUserByIdService(req.currentUser.id)
    delete currentUser?.password;
    
    successResponse(res, StatusCodes.OK, {
        message: "success",
        currentUser
      });
};

export const getAllUserController = async (req: Request, res: Response): Promise<void> => {
    const users = await getAllUserService();
    successResponse(res, StatusCodes.OK, users);
};

export const getUserController = async (req: Request, res: Response): Promise<void> => {
    const { userID } = req.params;
  
    const user = await findUserByIdService(userID);
  
    if (!user) throw new NotFoundError("Invalid user ID");
  
    delete user.password;
    successResponse(res, StatusCodes.OK, user);
};


// @desc    Register User
// @route   POST    /api/v2/user/create-user
export const createUserController = async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password, phoneNumber } = req.body;
  
    let user = await findUser(email);

    let userPhone = await findUserByPhone(phoneNumber);
  
    if (user || userPhone)
      throw new BadRequestError(`User with the email/phone ${email} - ${phoneNumber} exists`);
  
    
    const data = await registerUser({
      fullName,
      email,
      password,
      phoneNumber,
    });
  
    delete data.password
  
    successResponse(res, StatusCodes.CREATED, data);
};

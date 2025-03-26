import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  generateJWT,
  Password,
  successResponse,
} from "../helpers";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import Logger from "../logger";
import { createWallet, findUserByIdService, findWalletById, findWalletByUserId } from "../services";


export const createWalletController = async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ currentUser: null });
    }

    const {
        balance,
    } = req.body;
  
    const currentUser = await findUserByIdService(req.currentUser.id);

    if(!currentUser) throw new BadRequestError("User does not exist");

    const wallet = await createWallet({
        balance,
        userId: currentUser.id,
        currency: "NGN",
        status: "ACTIVE"
    });
    
    successResponse(res, StatusCodes.CREATED, wallet);
};

export const getUserWalletController = async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ currentUser: null });
    }

    const currentUser = await findUserByIdService(req.currentUser.id);

    if(!currentUser) throw new BadRequestError("User does not exist");

    const wallet = await findWalletByUserId(currentUser.id);

    successResponse(res, StatusCodes.OK, wallet);
};

export const getWalletController = async (req: Request, res: Response) => {

    const {
        walletId
    } = req.params;

    const wallet = await findWalletById(walletId);

    successResponse(res, StatusCodes.OK, wallet);
};


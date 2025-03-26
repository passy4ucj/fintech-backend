import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  generateJWT,
  Password,
  successResponse,
} from "../helpers";
import { BadRequestError } from "../errors";
import Logger from "../logger";
import { findTransactionById, findTransactions, transferFunds } from "../services";


export const handleTransferController = async (req: Request, res: Response) => {

    const { senderWalletId, receiverWalletId, senderUserId, receiverUserId, amount } = req.body;

    try {
        const result = await transferFunds(senderWalletId, receiverWalletId, senderUserId, receiverUserId, amount);

        successResponse(res, StatusCodes.OK, result);
    } catch (error) {
        throw new BadRequestError(`Transfer Error : ${error}`);
    }

};

export const getTransactionController = async (req: Request, res: Response) => {

    const {
        transactionId
    } = req.params;

    const transaction = await findTransactionById(transactionId);

    successResponse(res, StatusCodes.OK, transaction);
};

export const getTransactionsController = async (req: Request, res: Response) => {

    const transactions = await findTransactions();

    successResponse(res, StatusCodes.OK, transactions);
};

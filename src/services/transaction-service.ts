import e from "express";
import { prisma } from "../client";
import { Transaction } from "@prisma/client";
import { createAuditLog } from "./audit-log-service";

export type TransactionAccount = Pick<
    Transaction,
    "amount" | "transactionType" | "status" | "userId" | "walletId" | "description"
    >;

export const createTransaction = async (data: TransactionAccount) => {
    const transaction = await prisma.transaction.create({
        data: { ...data },
    });
    return transaction;
};

export const createTransactionReview = async (data: TransactionAccount) => {
    return await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({
        where: { id: data.walletId },
      });
  
      if (!wallet) throw new Error('Wallet not found');
  
      // Check for sufficient balance on DEBIT
      if (data.transactionType === 'DEBIT' && wallet.balance < data.amount) {
        throw new Error('Insufficient balance');
      }
  
      // Update balance
      const updatedWallet = await tx.wallet.update({
        where: { id: data.walletId },
        data: {
          balance: data.transactionType === 'CREDIT' ? { increment: data.amount } : { decrement: data.amount },
        },
      });
  
      // Create transaction log
      const transaction = await tx.transaction.create({
        data: {
            ...data,
          status: 'COMPLETED',
          description: `${data.transactionType} of ${data.amount} ${wallet.currency}`,
        },
      });
  
      return { updatedWallet, transaction };
    });
};

export const transferFunds = async (
    senderWalletId: string,
    receiverWalletId: string,
    senderUserId: string,
    receiverUserId: string,
    amount: number
  ) => {
    return await prisma.$transaction(async (tx) => {
      // Fetch Sender Wallet Balance (from cache or DB)
      let senderBalance = 0;
      if (senderBalance === null) {
        const senderWallet = await tx.wallet.findUnique({ where: { id: senderWalletId } });
        if (!senderWallet) throw new Error('Sender wallet not found');
        senderBalance = senderWallet.balance;
      }
  
      // Check if sender has enough funds
      if (senderBalance < amount) {
        throw new Error('Insufficient balance');
      }
  
      // Fetch Receiver Wallet Balance (from cache or DB)
      let receiverBalance = 0;
      if (receiverBalance === null) {
        const receiverWallet = await tx.wallet.findUnique({ where: { id: receiverWalletId } });
        if (!receiverWallet) throw new Error('Receiver wallet not found');
        receiverBalance = receiverWallet.balance;
      }
  
      // Update Sender's Wallet Balance
      const updatedSenderWallet = await tx.wallet.update({
        where: { id: senderWalletId },
        data: { balance: { decrement: amount } },
      });
  
      // Update Receiver's Wallet Balance
      const updatedReceiverWallet = await tx.wallet.update({
        where: { id: receiverWalletId },
        data: { balance: { increment: amount } },
      });
  
      // Log Sender's Debit Transaction
      const senderTransaction = await tx.transaction.create({
        data: {
          walletId: senderWalletId,
          userId: senderUserId,
          amount,
          transactionType: 'DEBIT',
          status: 'COMPLETED',
          description: `Transfer to wallet ${receiverWalletId}`,
        },
      });
  
      // Log Receiver's Credit Transaction
      const receiverTransaction = await tx.transaction.create({
        data: {
          walletId: receiverWalletId,
          userId: receiverUserId,
          amount,
          transactionType: 'CREDIT',
          status: 'COMPLETED',
          description: `Received from wallet ${senderWalletId}`,
        },
      });

      // Create Audit Logs for Both Users
      await createAuditLog({
        userId: senderUserId,
        action: 'Fund Transfer (DEBIT)',
        details: `User ${senderUserId} sent ${amount} to user ${receiverUserId}`,
      });

      await createAuditLog({
        userId: receiverUserId,
        action: 'Fund Transfer (CREDIT)',
        details: `User ${receiverUserId} received ${amount} from user ${senderUserId}`
    });
  
      return { updatedSenderWallet, updatedReceiverWallet, senderTransaction, receiverTransaction };
    });
};

export const findTransactionByUserId = async (userId: string) => {
    return await prisma.transaction.findMany({
        where: { userId },
    });
};

export const completeTransaction = async (transactionId: string) => {
    return prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: 'COMPLETED',
      },
    });
};

export const findTransactionById = async (transactionId: string) => {
    return prisma.transaction.findUnique({
        where: { id: transactionId },
    });
};

export const findTransactions = async () => {
    return prisma.transaction.findMany();
};

import { prisma } from "../client";
import { Wallet } from "@prisma/client";

export type WalletAccount = Pick<
    Wallet,
    "balance" | "currency" | "status" | "userId"
    >;

export const createWallet = async (data: WalletAccount) => {
   const wallet = await prisma.wallet.create({
         data: { ...data },
   });
   return wallet;
};

export const findWalletByUserId = async (userId: string) => {
    return await prisma.wallet.findFirst({ 
        where: { userId },
    });
};

export const findWalletById = async (walletId: string) => {
    return await prisma.wallet.findUnique({ 
        where: { id: walletId },
    });
};

export const getWalletBalance = async (walletId: string) => {
    return prisma.wallet.findUnique({
      where: { id: walletId },
    });
};

export const updateWalletBalance = async (walletId: string, amount: number, type: 'CREDIT' | 'DEBIT') => {
    return prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: {
          increment: type === 'CREDIT' ? amount : -amount,
        },
      },
    });
};

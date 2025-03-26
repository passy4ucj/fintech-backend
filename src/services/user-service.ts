import { prisma } from "../client";
import { User } from "@prisma/client";

export type UserAccount = Pick<
    User,
    "fullName" | "email" | "phoneNumber" | "password"
    >;

export type UserSettings = Pick<
    User,
    "fullName" | "phoneNumber"
    >;

// excluded password types
export type ReturnedUser = Partial<Pick<User, "password">> &
    Omit<User, "password">;

export const registerUser = async (data: UserAccount): Promise<ReturnedUser> => {

    const user: ReturnedUser = await prisma.user.create({
        data: { ...data },
    });
    delete user.password;

    return user;
};

export const findUserByIdService = async (userId: string): Promise<ReturnedUser | null> => {
    
    return await prisma.user.findUnique({ 
        where: { id: userId },
    });
};

export const findUser = async (
    email: string
): Promise<ReturnedUser | null> => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserByPhone = async (
    phoneNumber: string
): Promise<ReturnedUser | null> => {
    return await prisma.user.findUnique({ where: { phoneNumber } });
};

export const getAllUserService = async () => {
    return await prisma.user.findMany({
        select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
        },
    });
};

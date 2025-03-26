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

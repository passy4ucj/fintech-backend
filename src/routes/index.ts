import { Router } from "express";
import { userRoutes } from "./user-route";
import { walletRoutes } from "./wallet-route";
import { transactionRoutes } from "./transaction-route";


const router = Router();

router.use("/users", userRoutes);
router.use("/wallets", walletRoutes);
router.use("/transactions", transactionRoutes);

export { router as applicationRoutes };

import { Router } from "express";

import {
  validateRequestMiddleware,
} from "../helpers";
import { createWalletSchema, walletIdParamSchema } from "../schema";
import { createWalletController, getUserWalletController, getWalletController } from "../controllers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";

const router = Router();

// protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router.route("/").post(createWalletSchema(), validateRequestMiddleware, createWalletController);

router.route("/user").get(getUserWalletController);

router.route("/:walletId").get(walletIdParamSchema(), getWalletController);



export { router as walletRoutes };

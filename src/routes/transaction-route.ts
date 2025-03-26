import { Router } from "express";

import { handleTransferSchema, transactionIdParamSchema } from "../schema";
import { getTransactionController, getTransactionsController, handleTransferController } from "../controllers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";
import { validateRequestMiddleware } from "../helpers";

const router = Router();

// protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router.route("/").post(handleTransferSchema(), validateRequestMiddleware, handleTransferController);

router.route("/").get(getTransactionsController);

router.route("/:transactionId").get(transactionIdParamSchema(), getTransactionController);


export { router as transactionRoutes };

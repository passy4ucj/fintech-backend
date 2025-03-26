import { body, param } from "express-validator";

export const createWalletSchema = () => {
  return [
    body("balance").notEmpty().isNumeric().withMessage("Please provide a balance"),
  ];
};

export const walletIdParamSchema = () => {
    return [
      param("walletId")
        .notEmpty()
        .withMessage("walletId is required")
        .isUUID()
        .withMessage("walletId must be a valid UUID"),
    ];
};

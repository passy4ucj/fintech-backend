import { body, param } from "express-validator";

export const handleTransferSchema = () => {
  return [
    body("senderWalletId")
      .notEmpty()
      .withMessage("senderWalletId is required")
      .isUUID()
      .withMessage("senderWalletId must be a valid UUID"),

    body("receiverWalletId")
      .notEmpty()
      .withMessage("receiverWalletId is required")
      .isUUID()
      .withMessage("receiverWalletId must be a valid UUID"),

    body("senderUserId")
      .notEmpty()
      .withMessage("senderUserId is required")
      .isUUID()
      .withMessage("senderUserId must be a valid UUID"),

    body("receiverUserId")
      .notEmpty()
      .withMessage("receiverUserId is required")
      .isUUID()
      .withMessage("receiverUserId must be a valid UUID"),

    body("amount")
      .notEmpty()
      .withMessage("amount is required")
      .isNumeric()
      .withMessage("amount must be a number")
      .custom((value) => value > 0)
      .withMessage("amount must be greater than zero"),
  ];
};

export const transactionIdParamSchema = () => {
    return [
      param("transactionId")
        .notEmpty()
        .withMessage("transactionId is required")
        .isUUID()
        .withMessage("transactionId must be a valid UUID"),
    ];
};

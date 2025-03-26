import { body } from "express-validator";

export const loginSchema = () => {
  return [
    body("email").isEmail().withMessage("Please provide an email"),
    body("password").notEmpty().withMessage("Please provide a password"),
  ];
};

export const registerUserSchema = () => {
  return [
    body("fullName").notEmpty().withMessage("Please provide your full Name"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("phoneNumber")
      .isNumeric()
      .withMessage("Invalid phone number")
      .notEmpty()
      .withMessage("Please provide your phone number"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 25 })
      .withMessage("Password must be between 6 to 25 characters"),
  ];
};

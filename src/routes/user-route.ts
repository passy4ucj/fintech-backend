import { Router } from "express";

import {
  validateRequestMiddleware,
} from "../helpers";
import { loginSchema, registerUserSchema } from "../schema";
import { createUserController, currentUser, getAllUserController, getUserController, loginUserController } from "../controllers";
import { currentUserMiddleware, requireAuthMiddleware } from "../middleware";


const router = Router();

// sign in route
router
  .route("/signin-user")
  .post(loginSchema(), validateRequestMiddleware, loginUserController);

// current user route
router.route("/current-user").get(currentUserMiddleware, currentUser);

router
    .route("/register-user")
    .post(
    registerUserSchema(),
    validateRequestMiddleware,
    createUserController
    );

// protected routes
router.use(currentUserMiddleware, requireAuthMiddleware);

router.route("/registered").get(getAllUserController);

router.route("/registered/:userID").get(getUserController);

export { router as userRoutes };

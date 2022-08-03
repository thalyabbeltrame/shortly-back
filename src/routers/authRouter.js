import { Router } from "express";

import { signUp, signIn } from "../controllers/authController.js";

import { validateSchema } from "../middlewares/sharedMiddleware.js";

import { signUpSchema, signInSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(signInSchema), signIn);

export default authRouter;

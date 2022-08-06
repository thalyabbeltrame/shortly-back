import { Router } from "express";

import { signUp, signIn } from "../controllers/authController.js";

import { validateBody } from "../middlewares/bodyMiddleware.js";
import { sanitizeDatas } from "../middlewares/sanitizeMiddleware.js";

import { signUpSchema, signInSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(signUpSchema), sanitizeDatas, signUp);
authRouter.post("/signin", validateBody(signInSchema), sanitizeDatas, signIn);

export default authRouter;

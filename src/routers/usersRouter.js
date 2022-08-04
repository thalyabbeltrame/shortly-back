import { Router } from "express";

import { getUserUrls } from "../controllers/usersController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get("/me", validateToken, getUserUrls);

export default usersRouter;

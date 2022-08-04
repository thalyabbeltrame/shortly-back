import { Router } from "express";

import { getUserUrls, getRanking } from "../controllers/usersController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/me", validateToken, getUserUrls);
usersRouter.get("/ranking", getRanking);

export default usersRouter;

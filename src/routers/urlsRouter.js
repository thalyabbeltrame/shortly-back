import { Router } from "express";
import { validateSchema } from "../middlewares/sharedMiddleware.js";

import { shortenUrl } from "../controllers/urlsController.js";

import { validateToken } from "../middlewares/tokenMiddleware.js";

import { urlSchema } from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.get(
  "/shorten",
  validateToken,
  validateSchema(urlSchema),
  shortenUrl
);

export default urlsRouter;

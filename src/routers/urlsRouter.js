import { Router } from "express";
import { validateSchema } from "../middlewares/sharedMiddleware.js";

import {
  shortenUrl,
  getUrlById,
  openUrl,
} from "../controllers/urlsController.js";

import { validateToken } from "../middlewares/tokenMiddleware.js";

import { urlSchema } from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post(
  "/shorten",
  validateToken,
  validateSchema(urlSchema),
  shortenUrl
);

urlsRouter.get("/:id", getUrlById);
urlsRouter.get("/open/:shortUrl", openUrl);

export default urlsRouter;

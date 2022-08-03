import { Router } from "express";
import { validateSchema } from "../middlewares/sharedMiddleware.js";

import {
  shortenUrl,
  getUrlById,
  openUrl,
  deleteUrl,
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
urlsRouter.delete("/:id", validateToken, deleteUrl);

export default urlsRouter;

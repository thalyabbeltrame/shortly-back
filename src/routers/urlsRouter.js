import { Router } from "express";

import {
  shortenUrl,
  getUrlById,
  openUrl,
  deleteUrl,
} from "../controllers/urlsController.js";

import { validateToken } from "../middlewares/tokenMiddleware.js";
import { validateBody } from "../middlewares/bodyMiddleware.js";
import { sanitizeDatas } from "../middlewares/sanitizeMiddleware.js";

import { urlSchema } from "../schemas/urlSchema.js";

const urlsRouter = Router();

urlsRouter.post(
  "/shorten",
  validateToken,
  validateBody(urlSchema),
  sanitizeDatas,
  shortenUrl
);
urlsRouter.get("/:id", getUrlById);
urlsRouter.get("/open/:shortUrl", openUrl);
urlsRouter.delete("/:id", validateToken, deleteUrl);

export default urlsRouter;

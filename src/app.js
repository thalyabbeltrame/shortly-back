import express, { json } from "express";
import cors from "cors";

import authRouter from "./routers/authRouter.js";

const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);

export default app;

import chalk from "chalk";
import { nanoid } from "nanoid";

import "../config/index.js";
import * as urlsRepository from "../repositories/urlsRepository.js";

const shortenUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(8);
  const { userId } = res.locals;

  try {
    await urlsRepository.createUrl({ url, shortUrl, userId });

    res.status(201).json({ shortUrl });
  } catch (error) {
    console.log(chalk.red(error));
    res.status(500).send(error);
  }
};

export { shortenUrl };

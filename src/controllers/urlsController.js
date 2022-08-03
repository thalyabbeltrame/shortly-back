import chalk from "chalk";
import { nanoid } from "nanoid";

import "../config/index.js";
import * as urlsRepository from "../repositories/urlsRepository.js";

const shortenUrl = async (req, res) => {
  const { url } = req.body;
  const { userId } = res.locals;
  const shortUrl = nanoid(8);

  try {
    await urlsRepository.createUrl({ url, shortUrl, userId });

    return res.status(201).json({ shortUrl });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const getUrlById = async (req, res) => {
  const { id } = req.params;

  try {
    const url = await urlsRepository.getUrlById(id);
    delete url.userId;

    if (!url) {
      return res.status(404).json({
        error: "Url not found",
      });
    }

    return res.status(200).json(url);
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const openUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await urlsRepository.getUrlByShortUrl(shortUrl);

    if (!url) {
      return res.status(404).json({
        error: "Url not found",
      });
    }

    await urlsRepository.incrementVisitCount(shortUrl);

    return res.status(200).redirect(url.url);
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const url = await urlsRepository.getUrlById(id);

    if (!url) {
      return res.status(404).json({
        error: "Url not found",
      });
    }

    if (url.userId !== userId) {
      return res.status(401).json({
        error: "You are not authorized to delete this url",
      });
    }

    await urlsRepository.deleteUrl(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export { shortenUrl, getUrlById, openUrl, deleteUrl };

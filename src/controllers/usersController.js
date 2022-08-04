import chalk from "chalk";

import * as usersRepository from "../repositories/usersRepository.js";

const getUserUrls = async (_req, res) => {
  const { userId } = res.locals;

  try {
    const user = await usersRepository.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const userUrls = await usersRepository.getUserUrls(userId);
    return res.status(200).json(userUrls);
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export { getUserUrls };

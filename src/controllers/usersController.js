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
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getRanking = async (_req, res) => {
  try {
    const ranking = await usersRepository.getRanking();

    return res.status(200).json(ranking);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { getUserUrls, getRanking };

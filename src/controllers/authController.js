import chalk from "chalk";
import bcrypt from "bcrypt";

import "../config/index.js";
import * as userRepository from "../repositories/userRepository.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUsers = await userRepository.findByEmail(email);

    if (existingUsers.length > 0) {
      return res.status(409).json({
        error: `Email ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.sendStatus(201);
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export { signUp };

import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "../config/index.js";
import * as userRepository from "../repositories/userRepository.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    if (user) {
      return res.status(409).json({
        error: `Email ${email} already exists`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
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

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    if (user.length === 0) {
      return res.status(401).json({
        error: `Email ${email} not found`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(chalk.red(error));
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export { signUp, signIn };

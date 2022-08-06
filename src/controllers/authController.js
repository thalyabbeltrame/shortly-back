import bcrypt from "bcrypt";

import * as usersRepository from "../repositories/usersRepository.js";
import createToken from "../utils/createToken.js";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await usersRepository.getUserByEmail(email);
    if (user) {
      return res.status(409).json({
        error: `Email ${email} already exists`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: `Email or password is incorrect`,
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Email or password is incorrect",
      });
    }

    const token = createToken(user.id);

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { signUp, signIn };

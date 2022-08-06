import jwt from "jsonwebtoken";

import "../config/index.js";

import * as usersRepository from "../repositories/usersRepository.js";

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersRepository.getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    res.locals.userId = user.id;
    return next();
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export { validateToken };

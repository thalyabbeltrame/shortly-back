import jwt from "jsonwebtoken";

import "../config/index.js";

const createToken = (userId) => {
  const data = { userId };
  const key = process.env.JWT_SECRET;
  const config = { expiresIn: process.env.JWT_EXPIRES_IN };

  return jwt.sign(data, key, config);
};

export default createToken;

import SqlString from "sqlstring";

import connection from "../databases/postgres.js";

const findByEmail = async (email) => {
  const query = SqlString.format("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  const { rows: users } = await connection.query(query);
  return users[0];
};

const create = async ({ name, email, password }) => {
  const query = SqlString.format(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  await connection.query(query);
};

export { findByEmail, create };

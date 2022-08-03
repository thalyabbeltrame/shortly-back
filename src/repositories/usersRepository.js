import SqlString from "sqlstring";

import connection from "../databases/postgres.js";

const createUser = async ({ name, email, password }) => {
  const query = SqlString.format(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password]
  );

  await connection.query(query);
};

const getUserByEmail = async (email) => {
  const query = SqlString.format(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  const { rows: users } = await connection.query(query);
  return users[0];
};

const getUserById = async (id) => {
  const query = SqlString.format(`SELECT * FROM users WHERE id = ?`, [id]);

  const { rows: users } = await connection.query(query);
  return users[0];
};

export { createUser, getUserByEmail, getUserById };

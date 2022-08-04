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

const getUserUrls = async (userId) => {
  const query = SqlString.format(
    `
      SELECT 
        users.id AS id,
        users.name AS name,
        SUM(urls."visitCount")::double precision AS "visitCount",
        json_agg(json_build_object(
          'id', urls.id,
          'url', urls.url,
          'shortUrl', urls."shortUrl",
          'visitCount', urls."visitCount"
      )) AS "shortenedUrls"
      FROM users 
      LEFT JOIN urls ON users.id = urls."userId"
      WHERE users.id = ?
      GROUP BY users.id, users.name
    `,
    [userId]
  );

  const { rows: userUrls } = await connection.query(query);
  return userUrls[0];
};

export { createUser, getUserByEmail, getUserById, getUserUrls };

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
        COALESCE(SUM(urls."visitCount"),0)::int AS "visitCount",
        CASE WHEN urls."userId" IS NOT NULL THEN 
          json_agg(json_build_object(
            'id', urls.id,
            'url', urls.url,
            'shortUrl', urls."shortUrl",
            'visitCount', urls."visitCount"
          )) 
        ELSE '[]'::json
        END AS "shortenedUrls"
      FROM users 
      LEFT JOIN urls ON users.id = urls."userId"
      WHERE users.id = ?
      GROUP BY users.id, urls."userId"
    `,
    [userId]
  );

  const { rows: userUrls } = await connection.query(query);
  return userUrls[0];
};

const getRanking = async () => {
  const query = SqlString.format(
    `
      SELECT
        users.id AS id,
        users.name AS name,
        COUNT(urls.id)::int AS "linksCount",
        COALESCE(SUM(urls."visitCount"),0)::int AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id, users.name
      ORDER BY "visitCount" DESC
      LIMIT 10
    `
  );

  const { rows: ranking } = await connection.query(query);
  return ranking;
};

export { createUser, getUserByEmail, getUserById, getUserUrls, getRanking };

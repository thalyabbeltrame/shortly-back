import SqlString from "sqlstring";

import connection from "../databases/postgres.js";

const createUrl = async ({ url, shortUrl, userId }) => {
  const query = SqlString.format(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES (?, ?, ?)`,
    [url, shortUrl, userId]
  );

  await connection.query(query);
};

const getUrlById = async (id) => {
  const query = SqlString.format(
    `SELECT id, url, "shortUrl" FROM urls WHERE id = ?`,
    [id]
  );

  const { rows: urls } = await connection.query(query);
  return urls[0];
};

const getUrlByShortUrl = async (shortUrl) => {
  const query = SqlString.format(`SELECT url FROM urls WHERE "shortUrl" = ?`, [
    shortUrl,
  ]);

  const { rows: urls } = await connection.query(query);
  return urls[0];
};

export { createUrl, getUrlById, getUrlByShortUrl };

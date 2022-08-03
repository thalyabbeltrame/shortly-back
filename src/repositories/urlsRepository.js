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
    `SELECT id, url, "shortUrl", "userId" FROM urls WHERE id = ?`,
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

const incrementVisitCount = async (shortUrl) => {
  const query = SqlString.format(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = ?`,
    [shortUrl]
  );

  await connection.query(query);
};

const deleteUrl = async (id) => {
  const query = SqlString.format(`DELETE FROM urls WHERE id = ?`, [id]);

  await connection.query(query);
};

export {
  createUrl,
  getUrlById,
  getUrlByShortUrl,
  incrementVisitCount,
  deleteUrl,
};

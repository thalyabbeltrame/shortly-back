import SqlString from "sqlstring";

import connection from "../databases/postgres.js";

const createUrl = async ({ url, shortUrl, userId }) => {
  const query = SqlString.format(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES (?, ?, ?)`,
    [url, shortUrl, userId]
  );

  await connection.query(query);
};

export { createUrl };

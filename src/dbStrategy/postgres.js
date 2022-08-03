import chalk from "chalk";
import pg from "pg";

import "./config/index.js";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const connection = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

try {
  connection.connect();
  console.log(chalk.green("\nConnected to Postgres"));
} catch (error) {
  console.log(chalk.red("\nError connecting to Postgres"));
}

export default connection;

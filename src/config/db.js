require("dotenv").config();
const mysql = require("mysql2");

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const options = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
  namedPlaceholders: true,
};

const connection = mysql.createConnection(options);

const pool = mysql.createPool(options);

const query = async (query, values) => {
  const sql = connection.format(query, values);

  return pool
    .promise()
    .query(sql)
    .then(([res]) => res);
};

const closeConnection = async () =>
  Promise.all(connection.promise().end(), pool.promise.end());

module.exports = { connection, pool, query, closeConnection };

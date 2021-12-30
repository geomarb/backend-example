const db = require("../config/db");

const getSelectQuery = (fields = ["id", "email", "name", "role"]) => {
  let selectQuery = `SELECT ${fields.join(", ")} FROM users`;
  return selectQuery;
};

exports.getAll = async (fields) => await db.query(getSelectQuery(fields));

exports.findById = async (id, fields) => {
  const [user] = await db.query(`${getSelectQuery(fields)} WHERE id = ?`, [id]);

  return user;
};

exports.findByEmail = async (email, fields) => {
  const [user] = await db.query(`${getSelectQuery(fields)} WHERE email = ?`, [
    email,
  ]);

  return user;
};

exports.create = async (user) => {
  const userCreateQuery = `INSERT INTO users (name, email, password, role) VALUE (?, ?, ?, ?)`;
  const { name, email, password, role = "user" } = user;
  const { insertId: id } = await db.query(userCreateQuery, [
    name,
    email,
    password,
    role,
  ]);

  return { ...user, id };
};

exports.update = async (id, fields, values) => {
  const setFields = fields.map((field) => `${field} = ?`).join(", ");

  const updateQuery = `UPDATE users SET ${setFields} where id = ?`;

  return await db.query(updateQuery, [...values, id]);
};

exports.updatePassword = async (id, password) => {
  const updateQuery = `UPDATE users SET password = ? where id = ?`;

  return await db.query(updateQuery, [password, id]);
};

exports.delete = async (id) => {
  const deleteQuery = "DELETE FROM users WHERE id = ?";

  return await db.query(deleteQuery, [id]);
};

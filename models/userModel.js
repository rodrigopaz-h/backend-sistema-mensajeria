const pool = require("../db/connection");
const bcrypt = require("bcryptjs");

const createUser = async (nombre, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query("INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING *", [
    nombre,
    email,
    hashedPassword,
  ]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};

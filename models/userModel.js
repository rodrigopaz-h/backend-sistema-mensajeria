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

const findAllUsers = async () => {
  const result = await pool.query("SELECT id, nombre, email, avatar_url, status FROM users");
  return result.rows;
};

const findUserById = async (id) => {
  const result = await pool.query("SELECT id, nombre, bio, avatar_url, status FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findAllUsers,
  findUserById,
};

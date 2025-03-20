const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Función para hacer consultas
const query = (text, params) => pool.query(text, params);

// Función para cerrar el pool de conexiones, para los tests
const closePool = async () => {
  await pool.end();
};

module.exports = {
  query,
  pool,
  closePool,
};

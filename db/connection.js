const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Error conectando a la base de datos:", err);
  } else {
    console.log("✅ Conectado a PostgreSQL:", res.rows);
  }
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

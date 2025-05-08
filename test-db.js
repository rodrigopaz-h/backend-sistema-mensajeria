// test-db.js
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

client
  .connect()
  .then(() => {
    console.log("✅ ¡Conectado a la base de datos con éxito!");
    return client.end();
  })
  .catch((err) => {
    console.error("❌ Error al conectar:", err);
  });

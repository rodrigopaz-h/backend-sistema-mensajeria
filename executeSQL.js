const fs = require("fs");
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function executeSQLFromFile() {
  try {
    await client.connect();
    console.log("🟢 Conectado a la base de datos");

    const sql = fs.readFileSync("./db/init.sql", "utf8");
    await client.query(sql);

    console.log("✅ Script ejecutado con éxito");
    await client.end();
    console.log("🔒 Conexión cerrada");
  } catch (error) {
    console.error("❌ Error ejecutando el script:", error);
  }
}

executeSQLFromFile();

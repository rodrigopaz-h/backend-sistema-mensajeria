const pool = require("../db/connection");

const createMessage = async (senderId, senderName, content, imageUrl, fileUrl, fileName) => {
  const result = await pool.query(
    `INSERT INTO messages (sender_id, sender_name, content, image_url, file_url, file_name, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *`,
    [senderId, senderName, content, imageUrl, fileUrl, fileName]
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query("SELECT * FROM messages ORDER BY created_at ASC");
  return result.rows;
};

// Función para obtener el último mensaje de un usuario
const getLastMessage = async (userId) => {
  const result = await pool.query(
    `SELECT content FROM messages 
     WHERE sender_id = $1 OR receiver_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [userId]
  );

  return result.rows[0];
};

module.exports = {
  createMessage,
  getAllMessages,
  getLastMessage,
};

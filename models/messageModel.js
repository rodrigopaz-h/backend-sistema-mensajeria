const pool = require("../db/connection");

const createMessage = async (senderId, senderName, content) => {
  const result = await pool.query(
    "INSERT INTO messages (sender_id, sender_name, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [senderId, senderName, content]
  );
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query("SELECT * FROM messages ORDER BY created_at ASC");
  return result.rows;
};

module.exports = {
  createMessage,
  getAllMessages,
};

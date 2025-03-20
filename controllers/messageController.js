const messageModel = require("../models/messageModel");

const getMessages = async (req, res) => {
  try {
    const messages = await messageModel.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los mensajes" });
  }
};

const sendMessage = async (req, res) => {
  const { content } = req.body;
  const senderId = req.userId;
  const senderName = req.userName;

  if (!content || !senderId) {
    return res.status(400).json({ mensaje: "Faltan datos para enviar el mensaje" });
  }

  try {
    const message = await messageModel.createMessage(senderId, senderName, content);
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al enviar el mensaje" });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};

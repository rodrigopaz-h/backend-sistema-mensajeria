const messageModel = require("../models/messageModel");
const uploadToFirebase = require("../utils/uploadToFirebase");

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

  if (!content && !req.file) {
    return res.status(400).json({ mensaje: "Debes enviar un mensaje o un archivo" });
  }

  try {
    let fileUrl = null;
    let fileName = null;

    if (req.file) {
      fileUrl = await uploadToFirebase(req.file);
      fileName = req.file.originalname;
    }

    const message = await messageModel.createMessage(senderId, senderName, content || null, null, fileUrl, fileName);
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

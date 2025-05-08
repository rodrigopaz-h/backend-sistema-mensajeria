const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // Archivos en memoria
const { getMessages, sendMessage } = require("../controllers/messageController");
const verifyToken = require("../middlewares/authMiddleware");

// Obtener mensajes
router.get("/", verifyToken, getMessages);

// Enviar mensaje con posible archivo adjunto
router.post("/", verifyToken, upload.single("file"), sendMessage);

module.exports = router;

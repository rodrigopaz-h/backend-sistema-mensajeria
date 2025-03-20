const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api/chat", messageRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a Rapaz Chat API");
});

module.exports = app;

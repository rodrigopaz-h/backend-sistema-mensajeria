const userModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const userExist = await userModel.findUserByEmail(email);
    if (userExist) {
      return res.status(400).json({ mensaje: "El usuario ya existe" });
    }

    const newUser = await userModel.createUser(nombre, email, password);
    res.status(201).json({ mensaje: "Usuario registrado", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id, nombre: user.nombre }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ mensaje: "Login exitoso", token, user: { id: user.id, nombre: user.nombre } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT id, nombre, bio, avatar_url, status FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    // Obtener el último mensaje enviado o recibido por el usuario
    const lastMessage = await messageModel.getLastMessage(id);

    res.json({
      ...result.rows[0],
      lastMessage: lastMessage ? lastMessage.content : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener perfil" });
  }
};

const getAllUsersWithLastMessage = async (req, res) => {
  try {
    const users = await userModel.findAllUsers();
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await messageModel.getLastMessage(user.id);
        return {
          ...user,
          lastMessage: lastMessage ? lastMessage.content : null,
        };
      })
    );

    res.json(usersWithLastMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  getAllUsersWithLastMessage,
};

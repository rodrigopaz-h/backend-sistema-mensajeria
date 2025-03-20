const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
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

    const token = jwt.sign({ id: user.id, nombre: user.nombre }, "secreto", { expiresIn: "1h" });

    res.json({ mensaje: "Login exitoso", token, user: { id: user.id, nombre: user.nombre } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};

module.exports = {
  register,
  login,
};

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ mensaje: "No token provided" });
  }

  // Verificamos si es Bearer o token plano
  const tokenParts = authHeader.split(" ");

  let token = "";

  if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
    token = tokenParts[1];
  } else {
    // Si no tiene el prefijo, asumimos que es el token directo
    token = authHeader;
  }

  try {
    const decoded = jwt.verify(token, "secreto");
    req.userId = decoded.id;
    req.userName = decoded.nombre;
    next();
  } catch (error) {
    console.error("Error verificando token:", error.message);
    res.status(401).json({ mensaje: "Token inválido" });
  }
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ mensaje: "No se proporcionó el token" });
  }

  const tokenParts = authHeader.split(" ");
  let token = "";

  if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
    token = tokenParts[1];
  } else {
    token = authHeader;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userName = decoded.nombre;

    next();
  } catch (error) {
    console.error("Error verificando token:", error.message);
    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

module.exports = verifyToken;

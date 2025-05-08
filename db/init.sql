-- Este script inicializa la base de datos para la aplicación de mensajería.
-- Revisar archivos "alter table", para concer las modificaciones que se han hecho a la base de datos.


-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  bio TEXT,
  avatar_url VARCHAR(255),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  sender_name VARCHAR(100),
  content TEXT,
  image_url VARCHAR(255),
  file_url VARCHAR(255),
  file_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


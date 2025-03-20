CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  sender_name VARCHAR(100),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

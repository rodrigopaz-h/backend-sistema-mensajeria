ALTER TABLE messages ADD COLUMN recipient_id INTEGER REFERENCES users(id);

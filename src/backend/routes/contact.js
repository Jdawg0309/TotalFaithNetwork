const express = require('express');
const router  = express.Router();
const db      = require('../models/db');

// Ensure table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    reason TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create a new message
router.post('/', (req, res) => {
  const { name, email, subject, message, reason } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    db.prepare(
      `INSERT INTO contact_messages (name, email, subject, reason, message)
       VALUES (?, ?, ?, ?, ?)`
    ).run(name, email, subject, reason || '', message);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to save message:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// List all messages
router.get('/messages', (req, res) => {
  try {
    const messages = db.prepare(
      `SELECT id, name, email, subject, reason, message, created_at
       FROM contact_messages
       ORDER BY created_at DESC`
    ).all();
    res.json(messages);
  } catch (err) {
    console.error('❌ Failed to fetch messages:', err);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// Delete a message
router.delete('/messages/:id', (req, res) => {
  const { id } = req.params;
  try {
    const result = db.prepare(
      `DELETE FROM contact_messages WHERE id = ?`
    ).run(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to delete message:', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;

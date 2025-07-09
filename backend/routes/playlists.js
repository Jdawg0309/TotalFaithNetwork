const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  const playlists = db.prepare('SELECT * FROM playlists ORDER BY name').all();
  res.json(playlists);
});

router.post('/', auth, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const existing = db.prepare('SELECT * FROM playlists WHERE name = ?').get(name);
  if (existing) return res.status(400).json({ message: 'Playlist already exists' });
  const stmt = db.prepare('INSERT INTO playlists (name) VALUES (?)');
  const result = stmt.run(name);
  res.status(201).json({ id: result.lastInsertRowid, name });
});

module.exports = router;

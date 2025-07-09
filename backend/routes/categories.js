const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories ORDER BY name').all();
  res.json(categories);
});

router.post('/', auth, (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const existing = db.prepare('SELECT * FROM categories WHERE name = ?').get(name);
  if (existing) return res.status(400).json({ message: 'Category already exists' });
  const stmt = db.prepare('INSERT INTO categories (name) VALUES (?)');
  const result = stmt.run(name);
  res.status(201).json({ id: result.lastInsertRowid, name });
});

module.exports = router;

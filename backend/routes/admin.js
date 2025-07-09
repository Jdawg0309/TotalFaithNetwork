const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../models/db');

// Middleware: only allow a specific admin email
const adminOnly = (req, res, next) => {
  const adminEmails = ['admin@tfn.com']; // Add more if needed
  if (!adminEmails.includes(req.user.email)) {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

// Create new category
router.post('/categories', auth, adminOnly, async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
});

// Create playlist
router.post('/playlists', auth, adminOnly, async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO playlists (name, created_by) VALUES ($1, $2) RETURNING *', [name, req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err.message });
  }
});

// Get all playlists
router.get('/playlists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM playlists ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching playlists', error: err.message });
  }
});

module.exports = router;

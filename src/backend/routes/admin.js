// admin.js
const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const db      = require('../models/db');
const { body, validationResult } = require('express-validator');

// allow only admins
const adminOnly = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

// CATEGORY CRUD

router.get('/categories', auth, adminOnly, (req, res) => {
  try {
    const cats = db.prepare(`SELECT * FROM categories ORDER BY name`).all();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/categories', auth, adminOnly, [
  body('name').trim().notEmpty()
], (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
  try {
    const info = db.prepare(`INSERT INTO categories (name) VALUES (?)`)
                   .run(req.body.name);
    res.status(201).json({ id: info.lastInsertRowid, name: req.body.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/categories/:id', auth, adminOnly, [
  body('name').trim().notEmpty()
], (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
  const { id } = req.params;
  try {
    const info = db.prepare(`UPDATE categories SET name = ? WHERE id = ?`)
                   .run(req.body.name, id);
    if (!info.changes) return res.status(404).json({ message: 'Not found' });
    res.json({ id: +id, name: req.body.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/categories/:id', auth, adminOnly, (req, res) => {
  const { id } = req.params;
  try {
    // prevent deletion if in use
    const inUse = db.prepare(`SELECT 1 FROM videos WHERE category_id = ? LIMIT 1`)
                    .get(id);
    if (inUse) return res.status(400).json({ message: 'Category in use' });
    const info = db.prepare(`DELETE FROM categories WHERE id = ?`).run(id);
    if (!info.changes) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PLAYLIST CRUD

router.get('/playlists', auth, adminOnly, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT p.*, u.email AS creator
      FROM playlists p
      JOIN users u ON p.created_by = u.id
      ORDER BY p.name
    `).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/playlists', auth, adminOnly, [
  body('name').trim().notEmpty()
], (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
  try {
    const info = db.prepare(`
      INSERT INTO playlists (name, created_by) VALUES (?, ?)
    `).run(req.body.name, req.user.id);
    res.status(201).json({ id: info.lastInsertRowid, name: req.body.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/playlists/:id', auth, adminOnly, [
  body('name').trim().notEmpty()
], (req, res) => {
  const errs = validationResult(req);
  if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });
  const { id } = req.params;
  try {
    const info = db.prepare(`UPDATE playlists SET name = ? WHERE id = ?`)
                   .run(req.body.name, id);
    if (!info.changes) return res.status(404).json({ message: 'Not found' });
    res.json({ id: +id, name: req.body.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/playlists/:id', auth, adminOnly, (req, res) => {
  const { id } = req.params;
  try {
    db.prepare('BEGIN').run();
    db.prepare('DELETE FROM video_playlists WHERE playlist_id = ?').run(id);
    const info = db.prepare('DELETE FROM playlists WHERE id = ?').run(id);
    db.prepare('COMMIT').run();
    if (!info.changes) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    db.prepare('ROLLBACK').run();
    res.status(500).json({ message: err.message });
  }
});

// ANALYTICS

router.get('/analytics', auth, adminOnly, (req, res) => {
  try {
    const totalVideos = db.prepare(`SELECT COUNT(*) cnt FROM videos`).get().cnt;
    const totalUsers  = db.prepare(`SELECT COUNT(*) cnt FROM users`).get().cnt;
    const totalCats   = db.prepare(`SELECT COUNT(*) cnt FROM categories`).get().cnt;
    const topVideos   = db.prepare(`
      SELECT id,title,views FROM videos ORDER BY views DESC LIMIT 5
    `).all();
    const topCats     = db.prepare(`
      SELECT c.id,c.name,COUNT(v.id) AS count
        FROM categories c
        LEFT JOIN videos v ON v.category_id=c.id
       GROUP BY c.id
       ORDER BY count DESC
       LIMIT 5
    `).all();
    res.json({ totalVideos, totalUsers, totalCats, topVideos, topCats });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
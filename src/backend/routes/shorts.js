// src/backend/routes/shorts.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/shorts/feed?page=1&limit=5
router.get('/feed', (req, res) => {
  try {
    const page  = Math.max(parseInt(req.query.page, 10)  || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const offset = (page - 1) * limit;

    // count total shorts
    const { cnt } = db.prepare(`
      SELECT COUNT(*) AS cnt
      FROM videos
      WHERE is_short = 1
    `).get();

    // fetch the page
    const videos = db.prepare(`
      SELECT *
      FROM videos
      WHERE is_short = 1
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    const totalPages = Math.ceil(cnt / limit);

    res.json({
      videos,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching shorts feed:', err);
    res.status(500).json({ error: 'Failed to load shorts feed' });
  }
});

module.exports = router;

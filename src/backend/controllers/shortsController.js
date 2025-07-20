// src/backend/controllers/shortsController.js
const db = require('../models/db');

exports.getFeed = (req, res) => {
  const page   = Number(req.query.page)  || 1;
  const limit  = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  // count total shorts
  const total = db
    .prepare('SELECT COUNT(*) AS cnt FROM videos WHERE is_short = 1')
    .get().cnt;

  // fetch paginated shorts
  const videos = db
    .prepare(`
      SELECT *
      FROM videos
      WHERE is_short = 1
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `)
    .all(limit, offset);

  res.json({
    videos,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
};

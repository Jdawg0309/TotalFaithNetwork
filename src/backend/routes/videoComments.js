// src/backend/routes/videoComments.js
const express = require('express');
const router  = express.Router({ mergeParams: true });
const db      = require('../models/db');
const auth    = require('../middleware/auth');

// ── PUBLIC ────────────────────────────────────────────────────────────────

// GET  /api/videos/:videoId/comments
router.get('/', async (req, res) => {
  const videoId = Number(req.params.videoId);
  try {
    const comments = db.prepare(`
      SELECT c.id,
             c.content,
             c.created_at,
             c.session_id,
             u.email AS author_email
      FROM video_comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.video_id = ?
      ORDER BY c.created_at DESC
    `).all(videoId);
    res.json({ comments });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/videos/:videoId/comments
router.post('/', async (req, res) => {
  const videoId   = Number(req.params.videoId);
  const { content } = req.body;
  const sessionId = req.cookies.sessionId || require('uuid').v4();
  const userId    = req.user?.id || null;

  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO video_comments (video_id, content, session_id, user_id)
      VALUES (?, ?, ?, ?)
    `).run(videoId, content.trim(), sessionId, userId);

    const newComment = db.prepare(`
      SELECT c.id,
             c.content,
             c.created_at,
             c.session_id,
             u.email AS author_email
      FROM video_comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).get(result.lastInsertRowid);

    // Send back the freshly created comment
    res.status(201).json({ comment: newComment, sessionId });
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// DELETE /api/videos/:videoId/comments/:commentId
// (author or admin can delete)
router.delete('/:commentId', auth, (req, res) => {
  const { videoId, commentId } = req.params;
  const userId = req.user.id;

  const existing = db.prepare(`
    SELECT * FROM video_comments
    WHERE id = ? AND video_id = ?
  `).get(commentId, videoId);

  if (!existing) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // only original commenter or admin can delete
  if (existing.user_id && existing.user_id !== userId && !req.user.is_admin) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  db.prepare(`DELETE FROM video_comments WHERE id = ?`).run(commentId);
  res.json({ message: 'Comment deleted' });
});


// ── ADMIN MODERATION ──────────────────────────────────────────────────────

// GET /api/videos/:videoId/comments/admin
// List every comment on every video (admin only)
router.get('/admin', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });

  const comments = db.prepare(`
    SELECT c.id,
           c.video_id,
           v.title   AS video_title,
           c.content,
           c.created_at,
           c.session_id,
           c.user_id,
           u.email   AS author_email
    FROM video_comments c
    JOIN videos v ON c.video_id = v.id
    LEFT JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC
  `).all();

  res.json({ comments });
});

// DELETE /api/videos/:videoId/comments/admin/:commentId
// Delete any comment by ID (admin only)
router.delete('/admin/:commentId', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });

  const { commentId } = req.params;
  db.prepare(`DELETE FROM video_comments WHERE id = ?`).run(commentId);
  res.json({ message: 'Comment permanently removed' });
});

module.exports = router;

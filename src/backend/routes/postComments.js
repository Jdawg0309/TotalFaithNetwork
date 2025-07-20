const express = require('express');
const router  = express.Router({ mergeParams: true });
const db      = require('../models/db');
const auth    = require('../middleware/auth');

// ── PUBLIC ────────────────────────────────────────────────────────────────

// GET  /api/posts/:postId/comments
router.get('/', async (req, res) => {
  const postId = Number(req.params.postId);
  try {
    const comments = db.prepare(`
      SELECT c.id,
             c.content,
             c.created_at,
             c.session_id,
             u.email AS author_email
      FROM post_comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `).all(postId);
    // return raw array of comments
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/posts/:postId/comments
router.post('/', async (req, res) => {
  const postId    = Number(req.params.postId);
  const { content } = req.body;
  const sessionId = req.cookies.sessionId || require('uuid').v4();
  const userId    = req.user?.id || null; // anonymous allowed

  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO post_comments (post_id, content, session_id, user_id)
      VALUES (?, ?, ?, ?)
    `).run(postId, content.trim(), sessionId, userId);

    const newComment = db.prepare(`
      SELECT c.id,
             c.content,
             c.created_at,
             c.session_id,
             u.email AS author_email
      FROM post_comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).get(result.lastInsertRowid);

    // return the new comment object
    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// DELETE /api/posts/:postId/comments/:commentId
// (author or admin)
router.delete('/:commentId', auth, (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user.id;

  const existing = db.prepare(`
    SELECT * FROM post_comments
    WHERE id = ? AND post_id = ?
  `).get(commentId, postId);

  if (!existing) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // only original commenter or admin may delete
  if (existing.user_id && existing.user_id !== userId && !req.user.is_admin) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  db.prepare(`DELETE FROM post_comments WHERE id = ?`).run(commentId);
  res.json({ message: 'Comment deleted' });
});

// ── ADMIN MODERATION ──────────────────────────────────────────────────────

// GET /api/posts/:postId/comments/admin
// list all comments across all posts (admin only)
router.get('/admin', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });

  const comments = db.prepare(`
    SELECT c.id,
           c.post_id,
           p.title    AS post_title,
           c.content,
           c.created_at,
           c.session_id,
           c.user_id,
           u.email    AS author_email
    FROM post_comments c
    JOIN posts p ON c.post_id = p.id
    LEFT JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC
  `).all();

  // return raw array of comments
  res.json(comments);
});

// DELETE /api/posts/:postId/comments/admin/:commentId
// delete any comment by ID (admin only)
router.delete('/admin/:commentId', auth, (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });

  const { commentId } = req.params;
  db.prepare(`DELETE FROM post_comments WHERE id = ?`).run(commentId);
  res.json({ message: 'Comment permanently removed' });
});

module.exports = router;

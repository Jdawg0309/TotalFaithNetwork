const express = require('express');
const router  = express.Router();
const db      = require('../models/db');
const { v4: uuidv4 } = require('uuid');

// POST /api/post-likes/:postId  → add a like
router.post('/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  let sessionId = req.cookies?.sessionId;
  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie('sessionId', sessionId, { httpOnly: true });
  }
  try {
    db.prepare(`
      INSERT OR IGNORE INTO post_likes (post_id, session_id, user_id)
      VALUES (?, ?, NULL)
    `).run(postId, sessionId);

    const count = db.prepare(`
      SELECT COUNT(*) AS cnt FROM post_likes WHERE post_id = ?
    `).get(postId).cnt;

    res.json({ likes: count });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ error: 'Could not register like' });
  }
});

// DELETE /api/post-likes/:postId  → remove a like
router.delete('/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  const sessionId = req.cookies?.sessionId;

  try {
    if (sessionId) {
      db.prepare(`
        DELETE FROM post_likes WHERE post_id = ? AND session_id = ?
      `).run(postId, sessionId);
    } else {
      // fallback: delete one anonymous like
      db.prepare(`
        DELETE FROM post_likes
        WHERE id = (
          SELECT id FROM post_likes
          WHERE post_id = ? AND session_id IS NULL
          ORDER BY created_at ASC
          LIMIT 1
        )
      `).run(postId);
    }

    const count = db.prepare(`
      SELECT COUNT(*) AS cnt FROM post_likes WHERE post_id = ?
    `).get(postId).cnt;

    res.json({ likes: count });
  } catch (err) {
    console.error('Error unliking post:', err);
    res.status(500).json({ error: 'Could not remove like' });
  }
});

// GET /api/post-likes/:postId  → fetch the like count
router.get('/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  try {
    const count = db.prepare(`
      SELECT COUNT(*) AS cnt FROM post_likes WHERE post_id = ?
    `).get(postId).cnt;
    res.json({ likes: count });
  } catch (err) {
    console.error('Error fetching like count:', err);
    res.status(500).json({ error: 'Could not fetch like count' });
  }
});

module.exports = router;

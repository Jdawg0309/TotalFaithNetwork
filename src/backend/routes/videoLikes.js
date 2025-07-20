const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

// Like a video (tracks per-session)
router.post('/:videoId', (req, res) => {
  const videoId = Number(req.params.videoId);
  let sessionId = req.cookies && req.cookies.sessionId;
  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie('sessionId', sessionId, { httpOnly: true });
  }
  try {
    db.prepare(
      `INSERT OR IGNORE INTO video_likes (video_id, session_id, user_id)
       VALUES (?, ?, NULL)`
    ).run(videoId, sessionId);

    const count = db.prepare(
      `SELECT COUNT(*) AS cnt FROM video_likes WHERE video_id = ?;`
    ).get(videoId).cnt;

    res.json({ likes: count });
  } catch (err) {
    console.error('Error liking video:', err);
    res.status(500).json({ error: 'Could not register like' });
  }
});

// Unlike a video
router.delete('/:videoId', (req, res) => {
  const videoId = Number(req.params.videoId);
  const sessionId = req.cookies && req.cookies.sessionId;
  try {
    if (sessionId) {
      db.prepare(
        `DELETE FROM video_likes WHERE video_id = ? AND session_id = ?;`
      ).run(videoId, sessionId);
    } else {
      db.prepare(
        `DELETE FROM video_likes WHERE id = (
           SELECT id FROM video_likes
           WHERE video_id = ? AND session_id IS NULL
           ORDER BY created_at ASC LIMIT 1
         );`
      ).run(videoId);
    }
    const count = db.prepare(
      `SELECT COUNT(*) AS cnt FROM video_likes WHERE video_id = ?;`
    ).get(videoId).cnt;
    res.json({ likes: count });
  } catch (err) {
    console.error('Error unliking video:', err);
    res.status(500).json({ error: 'Could not remove like' });
  }
});

// Get like count
router.get('/:videoId', (req, res) => {
  const videoId = Number(req.params.videoId);
  try {
    const count = db.prepare(
      `SELECT COUNT(*) AS cnt FROM video_likes WHERE video_id = ?;`
    ).get(videoId).cnt;
    res.json({ likes: count });
  } catch (err) {
    console.error('Error fetching like count:', err);
    res.status(500).json({ error: 'Could not fetch like count' });
  }
});

module.exports = router;

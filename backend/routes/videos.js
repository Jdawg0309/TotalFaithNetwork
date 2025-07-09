const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../models/db');
const auth = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

// 🔧 Resolve to ../uploads/videos and ../uploads/avatars relative to backend/
const videoDir = path.resolve(__dirname, '../uploads/videos');
const avatarDir = path.resolve(__dirname, '../uploads/avatars');

fs.mkdirSync(videoDir, { recursive: true });
fs.mkdirSync(avatarDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'video' ? videoDir : avatarDir;
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage });

router.post('/upload', upload.fields([{ name: 'video' }, { name: 'avatar' }]), async (req, res) => {
  try {
    const { title, description, channel, category_id } = req.body;
    const videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
    const avatarUrl = req.files.avatar ? `/uploads/avatars/${req.files.avatar[0].filename}` : null;
    db.prepare(
      'INSERT INTO videos (title, description, channel, video_url, avatar_url, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(title, description, channel, videoUrl, avatarUrl, category_id, 1);
    res.status(201).send('Video uploaded');
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

router.get('/', (req, res) => {
  try {
    const videos = db.prepare(`
      SELECT v.*, c.name AS category
      FROM videos v
      LEFT JOIN categories c ON v.category_id = c.id
      ORDER BY v.created_at DESC
    `).all();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(id);
  if (!video) return res.status(404).json({ message: 'Not found' });

  db.prepare('DELETE FROM videos WHERE id = ?').run(id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
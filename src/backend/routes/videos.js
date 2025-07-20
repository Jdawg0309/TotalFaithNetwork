// src/backend/routes/videos.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const db = require('../models/db');
const auth = require('../middleware/auth');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { v4: uuidv4 } = require('uuid');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// helper: probe a video file for its duration in seconds
function probeDuration(videoPath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata.format.duration || 0);
    });
  });
}

// Configure upload directories
const videoDir     = path.resolve(__dirname, '../uploads/videos');
const thumbnailDir = path.resolve(__dirname, '../uploads/thumbnails');
[videoDir, thumbnailDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, videoDir),
  filename:    (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 } // 10GB
});

// Generate a thumbnail via ffmpeg
const generateThumbnail = (videoPath, thumbnailPath) => new Promise((resolve, reject) => {
  ffmpeg(videoPath)
    .on('end', resolve)
    .on('error', reject)
    .screenshots({
      timestamps: ['50%'],
      filename:   path.basename(thumbnailPath),
      folder:     path.dirname(thumbnailPath),
      size:       '640x360'
    });
});

// POST /api/videos/upload
router.post('/upload', auth, upload.single('video'), async (req, res) => {
  try {
    const { title, description, channel, category_id, is_short } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No video file uploaded' });

    // flags & paths
    const shortFlag     = is_short === 'on' || is_short === 'true' ? 1 : 0;
    const videoPath     = req.file.path;
    const videoFilename = req.file.filename;
    const videoUrl      = `/uploads/videos/${videoFilename}`;

    // thumbnail
    const thumbFilename = `thumbnail-${uuidv4()}.jpg`;
    const thumbPath     = path.join(thumbnailDir, thumbFilename);
    const thumbUrl      = `/uploads/thumbnails/${thumbFilename}`;
    await generateThumbnail(videoPath, thumbPath);

    // probe duration
    let rawSec = 0;
    try {
      rawSec = await probeDuration(videoPath);
    } catch (probeErr) {
      console.warn('Duration probe failed:', probeErr.message);
    }
    const mins = Math.floor(rawSec / 60);
    const secs = String(Math.floor(rawSec % 60)).padStart(2, '0');
    const durationStr = `${mins}:${secs}`;

    // insert into DB
    const result = db.prepare(`
      INSERT INTO videos (
        title, description, channel,
        video_url, avatar_url,
        category_id, created_by, duration, is_short
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      description,
      channel,
      videoUrl,
      thumbUrl,
      category_id,
      req.user.id,
      durationStr,
      shortFlag
    );

    res.status(201).json({ message: 'Video uploaded', videoId: result.lastInsertRowid });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// GET /api/videos
router.get('/', async (req, res) => {
  try {
    const page   = parseInt(req.query.page)  || 1;
    const limit  = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const totalCount = db.prepare(`
      SELECT COUNT(*) AS total
      FROM videos
      WHERE title LIKE ? OR channel LIKE ?
    `).get(`%${search}%`, `%${search}%`).total;

    const videos = db.prepare(`
      SELECT v.*, c.name AS category_name
      FROM videos v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE v.title LIKE ? OR v.channel LIKE ?
      ORDER BY v.created_at DESC
      LIMIT ? OFFSET ?
    `).all(`%${search}%`, `%${search}%`, limit, offset);

    res.json({
      videos,
      totalCount,
      totalPages:  Math.ceil(totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Fetch failed:', err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});

// GET /api/videos/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const video = db.prepare(`
      SELECT v.*, c.name AS category_name
      FROM videos v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE v.id = ?
    `).get(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    db.prepare(`UPDATE videos SET views = views + 1 WHERE id = ?`).run(id);
    const related = db.prepare(`
      SELECT id, title, avatar_url, duration, views
      FROM videos
      WHERE category_id = ? AND id != ?
      ORDER BY RANDOM()
      LIMIT 6
    `).all(video.category_id, id);

    res.json({ video, relatedVideos: related });
  } catch (err) {
    console.error('Error fetching video:', err);
    res.status(500).json({ message: 'Error fetching video', error: err.message });
  }
});

// DELETE /api/videos/:id
router.delete('/:id', auth, (req, res) => {
  const videoId = Number(req.params.id);
  try {
    // 1) fetch & authorize
    const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.created_by !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // 2) unlink files
    fs.unlink(path.join(videoDir,    path.basename(video.video_url)),   () => {});
    fs.unlink(path.join(thumbnailDir, path.basename(video.avatar_url)), () => {});

    // 3) cascade-delete dependents
    db.prepare('DELETE FROM video_comments   WHERE video_id = ?').run(videoId);
    db.prepare('DELETE FROM video_likes      WHERE video_id = ?').run(videoId);
    db.prepare('DELETE FROM video_playlists  WHERE video_id = ?').run(videoId);

    // 4) delete the video itself
    db.prepare('DELETE FROM videos WHERE id = ?').run(videoId);

    return res.status(204).end();
  } catch (err) {
    console.error('Delete failed:', err);
    return res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

// PUT /api/videos/:id
router.put('/:id', auth, [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('category_id').optional().isInt(),
  body('duration').optional().trim()
], (req, res) => {
  const { id } = req.params;
  const { title, description, category_id, duration, is_short } = req.body;
  try {
    const video = db.prepare(`SELECT * FROM videos WHERE id = ?`).get(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.created_by !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const shortFlag = is_short === 'on' || is_short === 'true' ? 1 : 0;
    db.prepare(`
      UPDATE videos
      SET
        title       = COALESCE(?, title),
        description = COALESCE(?, description),
        category_id = COALESCE(?, category_id),
        duration    = COALESCE(?, duration),
        is_short    = ?
      WHERE id = ?
    `).run(
      title,
      description,
      category_id,
      duration,
      shortFlag,
      id
    );

    res.json({ message: 'Video updated' });
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;

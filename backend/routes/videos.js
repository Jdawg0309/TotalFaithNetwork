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

// Configure upload directories
const videoDir = path.resolve(__dirname, '../uploads/videos');
const thumbnailDir = path.resolve(__dirname, '../uploads/thumbnails');

// Create directories if they don't exist
[videoDir, thumbnailDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 } // 10GB
});

// Generate thumbnail from video
const generateThumbnail = (videoPath, thumbnailPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('end', resolve)
      .on('error', reject)
      .screenshots({
        timestamps: ['50%'],
        filename: path.basename(thumbnailPath),
        folder: path.dirname(thumbnailPath),
        size: '640x360'
      });
  });
};

// Upload video with thumbnail generation
router.post('/upload', auth, upload.single('video'), async (req, res) => {
  try {
    const { title, description, channel, category_id, duration } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }
    
    const videoPath = req.file.path;
    const videoFilename = req.file.filename;
    const videoUrl = `/uploads/videos/${videoFilename}`;
    
    // Generate thumbnail
    const thumbnailFilename = `thumbnail-${uuidv4()}.jpg`;
    const thumbnailPath = path.join(thumbnailDir, thumbnailFilename);
    const thumbnailUrl = `/uploads/thumbnails/${thumbnailFilename}`;
    
    await generateThumbnail(videoPath, thumbnailPath);
    
    // Save to database
    const result = db.prepare(`
      INSERT INTO videos (
        title, description, channel, 
        video_url, avatar_url, 
        category_id, created_by, duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, description, channel, 
      videoUrl, thumbnailUrl, 
      category_id, req.user.id, duration
    );
    
    res.status(201).json({
      message: 'Video uploaded',
      videoId: result.lastInsertRowid
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// Get videos with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    
    // Get total count
    const totalCount = db.prepare(`
      SELECT COUNT(*) as total 
      FROM videos 
      WHERE title LIKE ? OR channel LIKE ?
    `).get(`%${search}%`, `%${search}%`).total;
    
    // Get videos
    const videos = db.prepare(`
      SELECT v.*, c.name AS category_name
      FROM videos v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE v.title LIKE ? OR v.channel LIKE ?
      ORDER BY v.created_at DESC
      LIMIT ? OFFSET ?
    `).all(`%${search}%`, `%${search}%`, limit, offset);
    
    const totalPages = Math.ceil(totalCount / limit);
    
    res.json({
      videos,
      totalCount,
      totalPages,
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});

// Get single video
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const video = db.prepare(`
      SELECT v.*, c.name AS category_name
      FROM videos v
      LEFT JOIN categories c ON v.category_id = c.id
      WHERE v.id = ?
    `).get(id);
    
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Increment view count
    db.prepare('UPDATE videos SET views = views + 1 WHERE id = ?').run(id);
    
    // Get related videos
    const relatedVideos = db.prepare(`
      SELECT v.id, v.title, v.avatar_url, v.duration, v.views
      FROM videos v
      WHERE v.category_id = ? AND v.id != ?
      ORDER BY RANDOM()
      LIMIT 6
    `).all(video.category_id, id);
    
    res.json({ video, relatedVideos });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching video', error: err.message });
  }
});

// Delete video
router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  
  try {
    const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Check if user is the creator or admin
    if (video.created_by !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Delete associated files
    const videoPath = path.join(videoDir, path.basename(video.video_url));
    const thumbnailPath = path.join(thumbnailDir, path.basename(video.avatar_url));
    
    fs.unlink(videoPath, (err) => err && console.error('Error deleting video:', err));
    fs.unlink(thumbnailPath, (err) => err && console.error('Error deleting thumbnail:', err));
    
    // Delete from database
    db.prepare('DELETE FROM videos WHERE id = ?').run(id);
    
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

// Update video metadata
router.put('/:id', auth, [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('category_id').optional().isInt()
], (req, res) => {
  const { id } = req.params;
  const { title, description, category_id } = req.body;
  
  try {
    const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Check if user is the creator or admin
    if (video.created_by !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Update video
    db.prepare(`
      UPDATE videos 
      SET 
        title = COALESCE(?, title), 
        description = COALESCE(?, description), 
        category_id = COALESCE(?, category_id)
      WHERE id = ?
    `).run(title, description, category_id, id);
    
    res.json({ message: 'Video updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;
router.get('/', (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;
  const like = `%${search}%`;


  const total = db.prepare('SELECT COUNT(*) AS count FROM videos WHERE title LIKE ?').get(like).count;
  const videos = db.prepare().all(like, limit, offset);

  res.json({ videos, totalPages: Math.ceil(total / limit) });
});

router.get("/", (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const offset = (page - 1) * limit;
  const like = `%${search}%`;

  const total = db.prepare("SELECT COUNT(*) AS count FROM videos WHERE title LIKE ?").get(like).count;
  const videos = db.prepare(`
    SELECT v.*, c.name AS category_name FROM videos v
    LEFT JOIN categories c ON v.category_id = c.id
    WHERE v.title LIKE ?
    ORDER BY v.created_at DESC
    LIMIT ? OFFSET ?
  `).all(like, limit, offset);

  res.json({ videos, totalPages: Math.ceil(total / limit) });
});

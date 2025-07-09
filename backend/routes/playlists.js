const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const playlists = db.prepare(`
      SELECT p.*, u.email AS creator_email, 
             COUNT(vp.video_id) AS video_count
      FROM playlists p
      JOIN users u ON p.created_by = u.id
      LEFT JOIN video_playlists vp ON p.id = vp.playlist_id
      GROUP BY p.id
      ORDER BY p.name
    `).all();
    
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching playlists', error: err.message });
  }
});

router.post('/', auth, [
  body('name').trim().notEmpty().withMessage('Name is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const existing = db.prepare('SELECT * FROM playlists WHERE name = ?').get(name);
    if (existing) {
      return res.status(400).json({ message: 'Playlist already exists' });
    }
    
    const stmt = db.prepare('INSERT INTO playlists (name, created_by) VALUES (?, ?)');
    const result = stmt.run(name, req.user.id);
    res.status(201).json({ id: result.lastInsertRowid, name });
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err.message });
  }
});

router.put('/:id', auth, [
  body('name').trim().notEmpty().withMessage('Name is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name } = req.body;
  
  try {
    const playlist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    // Check if user is the creator
    if (playlist.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Only the playlist creator can modify it' });
    }
    
    db.prepare('UPDATE playlists SET name = ? WHERE id = ?').run(name, id);
    res.json({ id, name });
  } catch (err) {
    res.status(500).json({ message: 'Error updating playlist', error: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  
  try {
    const playlist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    // Check if user is the creator
    if (playlist.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Only the playlist creator can delete it' });
    }
    
    // Delete playlist and its associations
    db.prepare('BEGIN TRANSACTION').run();
    db.prepare('DELETE FROM video_playlists WHERE playlist_id = ?').run(id);
    db.prepare('DELETE FROM playlists WHERE id = ?').run(id);
    db.prepare('COMMIT').run();
    
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    db.prepare('ROLLBACK').run();
    res.status(500).json({ message: 'Error deleting playlist', error: err.message });
  }
});

// Add video to playlist
router.post('/:id/videos', auth, [
  body('video_id').isInt().withMessage('Invalid video ID')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id: playlist_id } = req.params;
  const { video_id } = req.body;
  
  try {
    const playlist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(playlist_id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    // Check if user is the creator
    if (playlist.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Only the playlist creator can modify it' });
    }
    
    const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(video_id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    
    // Check if video is already in playlist
    const existing = db.prepare(`
      SELECT * FROM video_playlists 
      WHERE playlist_id = ? AND video_id = ?
    `).get(playlist_id, video_id);
    
    if (existing) {
      return res.status(400).json({ message: 'Video already in playlist' });
    }
    
    // Add video to playlist
    db.prepare(`
      INSERT INTO video_playlists (playlist_id, video_id, position)
      VALUES (?, ?, COALESCE((SELECT MAX(position) + 1 FROM video_playlists WHERE playlist_id = ?), 1))
    `).run(playlist_id, video_id, playlist_id);
    
    res.status(201).json({ message: 'Video added to playlist' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding video to playlist', error: err.message });
  }
});

// Remove video from playlist
router.delete('/:id/videos/:video_id', auth, (req, res) => {
  const { id: playlist_id, video_id } = req.params;
  
  try {
    const playlist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(playlist_id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    // Check if user is the creator
    if (playlist.created_by !== req.user.id) {
      return res.status(403).json({ message: 'Only the playlist creator can modify it' });
    }
    
    const result = db.prepare(`
      DELETE FROM video_playlists 
      WHERE playlist_id = ? AND video_id = ?
    `).run(playlist_id, video_id);
    
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Video not found in playlist' });
    }
    
    res.json({ message: 'Video removed from playlist' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing video from playlist', error: err.message });
  }
});

module.exports = router;
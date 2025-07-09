const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../models/db');
const { body, validationResult } = require('express-validator');

// Middleware: only allow specific admin emails
const adminOnly = (req, res, next) => {
  const adminEmails = ['admin@tfn.com', process.env.ADMIN_EMAIL];
  if (!adminEmails.includes(req.user.email)) {
    return res.status(403).json({ message: 'Admins only' });
  }
  next();
};

// Create new category
router.post('/categories', auth, adminOnly, [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *', 
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM categories ORDER BY name ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
});

// Update category
router.put('/categories/:id', auth, adminOnly, [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await db.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
});

// Delete category
router.delete('/categories/:id', auth, adminOnly, async (req, res) => {
  const { id } = req.params;
  try {
    // Check if category is used by any videos
    const videosResult = await db.query(
      'SELECT id FROM videos WHERE category_id = $1 LIMIT 1',
      [id]
    );
    
    if (videosResult.rowCount > 0) {
      return res.status(400).json({ message: 'Cannot delete category with associated videos' });
    }
    
    const result = await db.query(
      'DELETE FROM categories WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
});

// Create playlist
router.post('/playlists', auth, adminOnly, [
  body('name').trim().notEmpty().withMessage('Playlist name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO playlists (name, created_by) VALUES ($1, $2) RETURNING *', 
      [name, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating playlist', error: err.message });
  }
});

// Get all playlists
router.get('/playlists', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT p.*, u.email AS creator_email 
       FROM playlists p
       JOIN users u ON p.created_by = u.id
       ORDER BY p.name ASC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching playlists', error: err.message });
  }
});

// Get analytics
router.get('/analytics', auth, adminOnly, async (req, res) => {
  try {
    const [videos, users, categories] = await Promise.all([
      db.query('SELECT COUNT(*) AS total_videos, SUM(views) AS total_views FROM videos'),
      db.query('SELECT COUNT(*) AS total_users FROM users'),
      db.query('SELECT COUNT(*) AS total_categories FROM categories')
    ]);
    
    const topVideos = await db.query(
      `SELECT id, title, views FROM videos 
       ORDER BY views DESC LIMIT 5`
    );
    
    const popularCategories = await db.query(
      `SELECT c.id, c.name, COUNT(v.id) AS video_count
       FROM categories c
       LEFT JOIN videos v ON c.id = v.category_id
       GROUP BY c.id, c.name
       ORDER BY video_count DESC
       LIMIT 5`
    );
    
    res.json({
      total_videos: videos.rows[0].total_videos,
      total_views: videos.rows[0].total_views || 0,
      total_users: users.rows[0].total_users,
      total_categories: categories.rows[0].total_categories,
      top_videos: topVideos.rows,
      popular_categories: popularCategories.rows
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics', error: err.message });
  }
});

// User management
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, email, created_at, last_login FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Update user role
router.put('/users/:id/role', auth, adminOnly, [
  body('is_admin').isBoolean().withMessage('Invalid role value')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { is_admin } = req.body;
  
  try {
    const result = await db.query(
      'UPDATE users SET is_admin = $1 WHERE id = $2 RETURNING id, email, is_admin',
      [is_admin, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user role', error: err.message });
  }
});

module.exports = router;
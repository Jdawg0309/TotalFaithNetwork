const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT c.*, COUNT(v.id) AS video_count 
      FROM categories c
      LEFT JOIN videos v ON c.id = v.category_id
      GROUP BY c.id
      ORDER BY c.name
    `).all();
    
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
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
    const existing = db.prepare('SELECT * FROM categories WHERE name = ?').get(name);
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    
    const stmt = db.prepare('INSERT INTO categories (name) VALUES (?)');
    const result = stmt.run(name);
    res.status(201).json({ id: result.lastInsertRowid, name });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
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
    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const existing = db.prepare('SELECT * FROM categories WHERE name = ? AND id != ?').get(name, id);
    if (existing) {
      return res.status(400).json({ message: 'Category name already in use' });
    }
    
    db.prepare('UPDATE categories SET name = ? WHERE id = ?').run(name, id);
    res.json({ id, name });
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
});

router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;
  
  try {
    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check if category is used by any videos
    const videos = db.prepare('SELECT id FROM videos WHERE category_id = ? LIMIT 1').get(id);
    if (videos) {
      return res.status(400).json({ message: 'Cannot delete category with associated videos' });
    }
    
    db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
});

module.exports = router;
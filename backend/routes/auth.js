const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// Register admin (no hashing)
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  try {
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, password);
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login (no hashing)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (user && user.password_hash === password) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;

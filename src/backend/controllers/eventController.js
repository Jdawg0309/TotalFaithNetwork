const db = require('../models/db');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for event images (same path as posts)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, GIF, WEBP allowed'));
    }
  }
}).single('image');

function cleanupUpload(imageUrl) {
  if (!imageUrl) return;
  const filename = path.basename(imageUrl);
  const filePath = path.join(__dirname, '../uploads/images', filename);
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.warn('cleanupUpload: could not remove', filePath, err.message);
  }
}

exports.getAllEvents = (req, res) => {
  const events = db.prepare(`
    SELECT * FROM events
    ORDER BY created_at DESC
  `).all();
  res.json(events);
};

exports.createEvent = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { date, title, location } = req.body;
    if (!date || !title || !location) {
      if (req.file) cleanupUpload(`/uploads/images/${req.file.filename}`);
      return res.status(400).json({ error: 'Date, title, and location are required' });
    }

    const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

    try {
      const info = db.prepare(`
        INSERT INTO events (date, title, location, image_url)
        VALUES (?, ?, ?, ?)
      `).run(date, title, location, imageUrl);

      const ev = db.prepare(`SELECT * FROM events WHERE id = ?`).get(info.lastInsertRowid);
      res.status(201).json(ev);
    } catch (error) {
      if (req.file) cleanupUpload(`/uploads/images/${req.file.filename}`);
      res.status(500).json({ error: error.message });
    }
  });
};

exports.updateEvent = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { id } = req.params;
    const { date, title, location } = req.body;
    const existing = db.prepare(`SELECT * FROM events WHERE id = ?`).get(id);
    if (!existing) {
      if (req.file) cleanupUpload(`/uploads/images/${req.file.filename}`);
      return res.status(404).json({ error: 'Event not found' });
    }

    let imageUrl = existing.image_url;
    if (req.file) {
      cleanupUpload(existing.image_url);
      imageUrl = `/uploads/images/${req.file.filename}`;
    }

    try {
      db.prepare(`
        UPDATE events
        SET date = COALESCE(?, date),
            title = COALESCE(?, title),
            location = COALESCE(?, location),
            image_url = ?
        WHERE id = ?
      `).run(date, title, location, imageUrl, id);

      const updated = db.prepare(`SELECT * FROM events WHERE id = ?`).get(id);
      res.json(updated);
    } catch (error) {
      if (req.file) cleanupUpload(`/uploads/images/${req.file.filename}`);
      res.status(500).json({ error: error.message });
    }
  });
};

exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  const existing = db.prepare(`SELECT * FROM events WHERE id = ?`).get(id);
  if (!existing) return res.status(404).json({ error: 'Event not found' });

  try {
    if (existing.image_url) cleanupUpload(existing.image_url);
    db.prepare(`DELETE FROM events WHERE id = ?`).run(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

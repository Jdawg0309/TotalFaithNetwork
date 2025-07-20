const db = require('../models/db');

exports.getLeaders = (req, res) => {
  const leaders = db.prepare('SELECT * FROM leaders ORDER BY id ASC').all();
  const formatted = leaders.map(l => ({
    ...l,
    image_url: l.image_url && !l.image_url.startsWith('http')
      ? `${req.protocol}://${req.get('host')}${l.image_url}`
      : l.image_url
  }));
  res.json(formatted);
};

exports.getAdvisoryImages = (req, res) => {
  const images = db.prepare('SELECT image_url FROM advisory_images ORDER BY id ASC').all();
  const formatted = images.map(i =>
    i.image_url && !i.image_url.startsWith('http')
      ? `${req.protocol}://${req.get('host')}${i.image_url}`
      : i.image_url
  );
  res.json(formatted);
};

exports.getTributes = (req, res) => {
  const tributes = db.prepare('SELECT * FROM tributes ORDER BY id ASC').all();
  const formatted = tributes.map(t => ({
    ...t,
    image_url: t.image_url && !t.image_url.startsWith('http')
      ? `${req.protocol}://${req.get('host')}${t.image_url}`
      : t.image_url
  }));
  res.json(formatted);
};

// getAbout stays the same (no image processing)
exports.getAbout = (req, res) => {
  const row = db.prepare('SELECT about, mission FROM about_content WHERE id = 1').get();
  if (row) {
    res.json({
      about: JSON.parse(row.about),
      mission: row.mission
    });
  } else {
    res.status(404).json({ error: 'About content not found' });
  }
};

// Update handlers stay as-is...

// ========================
// PUT handlers to persist edits
// ========================

exports.updateAbout = (req, res) => {
  const { about, mission } = req.body;
  if (!Array.isArray(about) || typeof mission !== 'string') {
    return res.status(400).json({ error: 'Invalid About content input' });
  }
  try {
    db.prepare('UPDATE about_content SET about = ?, mission = ? WHERE id = 1')
      .run(JSON.stringify(about), mission);
    res.json({ message: 'About content updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update About content' });
  }
};

exports.updateLeaders = (req, res) => {
  const leaders = req.body;
  if (!Array.isArray(leaders)) {
    return res.status(400).json({ error: 'Invalid Leaders input' });
  }
  try {
    db.prepare('DELETE FROM leaders').run();
    const stmt = db.prepare('INSERT INTO leaders (title, description, bio, image_url) VALUES (?, ?, ?, ?)');
    leaders.forEach(l => {
      stmt.run(l.title, l.description, l.bio, l.image_url);
    });
    res.json({ message: 'Leaders updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update Leaders' });
  }
};

exports.updateAdvisoryImages = (req, res) => {
  const images = req.body;
  if (!Array.isArray(images)) {
    return res.status(400).json({ error: 'Invalid Advisory Images input' });
  }
  try {
    db.prepare('DELETE FROM advisory_images').run();
    const stmt = db.prepare('INSERT INTO advisory_images (image_url) VALUES (?)');
    images.forEach(url => {
      stmt.run(url);
    });
    res.json({ message: 'Advisory images updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update Advisory Images' });
  }
};

exports.updateTributes = (req, res) => {
  const tributes = req.body;
  if (!Array.isArray(tributes)) {
    return res.status(400).json({ error: 'Invalid Tributes input' });
  }
  try {
    db.prepare('DELETE FROM tributes').run();
    const stmt = db.prepare('INSERT INTO tributes (name, dates, quote, image_url) VALUES (?, ?, ?, ?)');
    tributes.forEach(t => {
      stmt.run(t.name, t.dates, t.quote, t.image_url);
    });
    res.json({ message: 'Tributes updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update Tributes' });
  }
};

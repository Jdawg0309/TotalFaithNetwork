const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, './tfn.db');  // ✅ Always backend/models/tfn.db
const db = new Database(dbPath);

// Initialize database schema if needed
const initDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP,
      refresh_token TEXT
    );
    
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
    
    CREATE TABLE IF NOT EXISTS playlists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_by INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    );
    
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      channel TEXT NOT NULL,
      video_url TEXT NOT NULL,
      avatar_url TEXT,
      category_id INTEGER,
      created_by INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      views INTEGER DEFAULT 0,
      duration TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (created_by) REFERENCES users(id)
    );
    
    CREATE TABLE IF NOT EXISTS video_playlists (
      playlist_id INTEGER NOT NULL,
      video_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (playlist_id, video_id),
      FOREIGN KEY (playlist_id) REFERENCES playlists(id),
      FOREIGN KEY (video_id) REFERENCES videos(id)
    );
  `);

  // Default admin seeding:
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@tfn.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminExists = db.prepare('SELECT 1 FROM users WHERE email = ?').get(adminEmail);

  if (!adminExists) {
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(adminPassword, salt);
    db.prepare(`
      INSERT INTO users (email, password_hash, is_admin)
      VALUES (?, ?, 1)
    `).run(adminEmail, hashedPassword);
    console.log('✅ Default admin user created');
  }
};

initDatabase();

module.exports = db;

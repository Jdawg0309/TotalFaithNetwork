const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.resolve(__dirname, './tfn.db');
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
      is_short BOOLEAN NOT NULL DEFAULT 0,
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

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url TEXT,
      author_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS video_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id INTEGER NOT NULL,
      session_id TEXT,
      user_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (video_id) REFERENCES videos(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(video_id, session_id)
    );

    CREATE TABLE IF NOT EXISTS post_likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      session_id TEXT,
      user_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(post_id, session_id)
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS leaders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      bio TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS advisory_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS tributes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dates TEXT NOT NULL,
      quote TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS about_content (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      about TEXT,
      mission TEXT
    );
  `);

  // Migrations for existing tables
  {
    const postCols = db.prepare(`PRAGMA table_info(posts)`).all().map(c => c.name);
    if (!postCols.includes('image_url')) {
      db.prepare(`ALTER TABLE posts ADD COLUMN image_url TEXT`).run();
      console.log('⚙️  Migration: Added image_url to posts');
    }
  }

  {
    const videoCols = db.prepare(`PRAGMA table_info(videos)`).all().map(c => c.name);
    if (!videoCols.includes('is_short')) {
      db.prepare(`ALTER TABLE videos ADD COLUMN is_short BOOLEAN NOT NULL DEFAULT 0`).run();
      console.log('⚙️  Migration: Added is_short to videos');
    }
    if (!videoCols.includes('duration')) {
      db.prepare(`ALTER TABLE videos ADD COLUMN duration TEXT`).run();
      console.log('⚙️  Migration: Added duration to videos');
    }
  }

  {
    const eventCols = db.prepare(`PRAGMA table_info(events)`).all().map(c => c.name);
    if (!eventCols.includes('image_url')) {
      db.prepare(`ALTER TABLE events ADD COLUMN image_url TEXT`).run();
      console.log('⚙️  Migration: Added image_url to events');
    }
  }

  {
    const postCommentCols = db.prepare(`PRAGMA table_info(post_comments)`).all().map(c => c.name);
    if (!postCommentCols.length) {
      db.prepare(`
        CREATE TABLE post_comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          session_id TEXT,
          user_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES posts(id),
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `).run();
      console.log('⚙️  Migration: Created post_comments table');
    }
  }

  {
    const videoCommentCols = db.prepare(`PRAGMA table_info(video_comments)`).all().map(c => c.name);
    if (!videoCommentCols.length) {
      db.prepare(`
        CREATE TABLE video_comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          video_id INTEGER NOT NULL,
          content TEXT NOT NULL,
          session_id TEXT,
          user_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (video_id) REFERENCES videos(id),
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
      `).run();
      console.log('⚙️  Migration: Created video_comments table');
    }
  }

  // Seed about_content if not exists
  const aboutRow = db.prepare(`SELECT 1 FROM about_content WHERE id = 1`).get();
  if (!aboutRow) {
    db.prepare(`INSERT INTO about_content (id, about, mission) VALUES (1, '[]', '')`).run();
    console.log('✅ Seeded empty about_content row');
  }

  // === contact_messages migration & seeding ===
  {
    const contactCols = db.prepare(`PRAGMA table_info(contact_messages)`).all().map(c => c.name);
    if (!contactCols.length) {
      db.prepare(`
        CREATE TABLE contact_messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT NOT NULL,
          reason TEXT,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();
      console.log('⚙️ Migration: Created contact_messages table');
    }

    // Seed some test rows if table is empty
    const rowCount = db.prepare(`SELECT COUNT(*) AS cnt FROM contact_messages`).get().cnt;
    if (rowCount === 0) {
      const seed = [
        { name: 'Alice Rivera', email: 'alice@example.com', subject: 'Speaking Opportunity', reason: 'Collaboration', message: 'We’d love to feature your network in an upcoming event.' },
        { name: 'Marcus Lee',   email: 'marcus@example.com', subject: 'Prayer Support',      reason: 'Prayer Request', message: 'Please pray for healing in my family.' },
        { name: 'Tasha Smith',  email: 'tasha.smith@gmail.com', subject: 'TFN Feedback',       reason: 'Feedback',       message: 'The community content has truly uplifted me, thank you.' },
        { name: 'Jonah Miles',  email: 'jonah@startup.io', subject: 'Sponsorship Inquiry', reason: 'General Inquiry',message: 'Looking to sponsor a show for Q4. Can we talk this week?' },
      ];

      const insert = db.prepare(`
        INSERT INTO contact_messages (name, email, subject, reason, message)
        VALUES (@name, @email, @subject, @reason, @message)
      `);
      const insertMany = db.transaction(msgs => {
        for (const m of msgs) insert.run(m);
      });
      insertMany(seed);

      console.log(`✅ Seeded ${seed.length} contact_messages`);
    }
  }



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

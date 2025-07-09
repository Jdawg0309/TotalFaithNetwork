require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./models/db');

const email = 'admin@tfn.com';
const password = 'password123';

try {
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash);
  console.log('✅ Admin user inserted:', email);
  process.exit(0);
} catch (err) {
  console.error('❌ Error creating admin:', err.message);
  process.exit(1);
}

const bcrypt = require('bcryptjs');
const db = require('./models/db');

(async () => {
  const email = 'admin@tfn.com';
  const password = 'password123';
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hashedPassword);
    console.log('✅ Admin user created: admin@tfn.com / password123');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }
})();

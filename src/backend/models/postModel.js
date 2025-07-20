const db = require('./db');

exports.findAll = () =>
  db.prepare(`SELECT p.*, u.email AS author_email
              FROM posts p
              LEFT JOIN users u ON p.author_id = u.id
              ORDER BY p.created_at DESC`)
    .all();

exports.findById = id =>
  db.prepare(`SELECT p.*, u.email AS author_email
              FROM posts p
              LEFT JOIN users u ON p.author_id = u.id
              WHERE p.id = ?`)
    .get(id);

exports.create = ({ title, content, image_url, author_id }) =>
  db.prepare(`INSERT INTO posts (title, content, image_url, author_id)
              VALUES (?, ?, ?, ?)`)
    .run(title, content, image_url, author_id);

exports.update = (id, { title, content, image_url }) =>
  db.prepare(`UPDATE posts
              SET title = ?, content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
              WHERE id = ?`)
    .run(title, content, image_url, id);

exports.delete = id =>
  db.prepare(`DELETE FROM posts WHERE id = ?`).run(id);

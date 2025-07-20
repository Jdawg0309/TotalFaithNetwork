const db = require('../models/db');
const fs = require('fs');
const path = require('path');

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

// GET all posts
exports.getAllPosts = (req, res) => {
  try {
    const posts = db.prepare(
      `SELECT p.*, u.email AS author_email
       FROM posts p
       JOIN users u ON p.author_id = u.id
       ORDER BY p.created_at DESC`
    ).all();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// GET single post
exports.getPostById = (req, res) => {
  try {
    const post = db.prepare(
      `SELECT p.*, u.email AS author_email
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`
    ).get(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// CREATE a post
exports.createPost = (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
    if (!req.user?.id) return res.status(401).json({ error: 'Not authorized' });

    let image_url = null;
    if (req.file) {
      const allowed = ['image/jpeg','image/png','image/gif','image/webp'];
      if (!allowed.includes(req.file.mimetype)) {
        cleanupUpload(req.file.filename);
        return res.status(400).json({ error: 'Only JPG/PNG/GIF/WEBP allowed' });
      }
      image_url = `/uploads/images/${req.file.filename}`;
    }

    const info = db.prepare(
      `INSERT INTO posts (title, content, image_url, author_id)
       VALUES (?, ?, ?, ?)`
    ).run(title, content, image_url, req.user.id);

    const newPost = db.prepare(
      `SELECT p.*, u.email AS author_email
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`
    ).get(info.lastInsertRowid);

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    if (req.file) cleanupUpload(req.file.filename);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// UPDATE a post
exports.updatePost = (req, res) => {
  try {
    const { title, content, remove_image } = req.body;
    const postId = req.params.id;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId);
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.author_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

    let image_url = existing.image_url;
    if (remove_image === 'true') {
      cleanupUpload(existing.image_url);
      image_url = null;
    }
    if (req.file) {
      cleanupUpload(existing.image_url);
      const allowed = ['image/jpeg','image/png','image/gif','image/webp'];
      if (!allowed.includes(req.file.mimetype)) {
        cleanupUpload(req.file.filename);
        return res.status(400).json({ error: 'Only JPG/PNG/GIF/WEBP allowed' });
      }
      image_url = `/uploads/images/${req.file.filename}`;
    }

    db.prepare(
      `UPDATE posts
       SET title = ?, content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(title, content, image_url, postId);

    const updated = db.prepare(
      `SELECT p.*, u.email AS author_email
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`
    ).get(postId);

    res.json(updated);
  } catch (err) {
    console.error('Error updating post:', err);
    if (req.file) cleanupUpload(req.file.filename);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// DELETE a post (cascade handles related records)
// DELETE a post (manually remove related records first)
exports.deletePost = (req, res) => {
  try {
    const postId = req.params.id;
    const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId);
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.author_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    if (existing.image_url) cleanupUpload(existing.image_url);

    // Manually delete dependent records
    db.prepare('DELETE FROM post_comments WHERE post_id = ?').run(postId);
    db.prepare('DELETE FROM post_likes    WHERE post_id = ?').run(postId);

    // Now delete the post
    db.prepare('DELETE FROM posts WHERE id = ?').run(postId);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// DELETE a comment (cascade handles any children)


// DELETE a comment (cascade handles any children)
exports.deleteComment = (req, res) => {
  try {
    const { commentId } = req.params;
    const existing = db.prepare('SELECT * FROM post_comments WHERE id = ?').get(commentId);
    if (!existing) return res.status(404).json({ error: 'Comment not found' });
    if (existing.user_id !== req.user?.id) return res.status(403).json({ error: 'Not authorized' });

    db.prepare('DELETE FROM post_comments WHERE id = ?').run(commentId);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

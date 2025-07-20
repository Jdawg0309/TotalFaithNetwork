const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const db = require('./models/db');
const app = express();

// Trust Cloudflare proxy IP
app.set('trust proxy', 1);

// 🌐 Dynamic CORS allowing requests from anywhere for now (you can restrict later)
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware order matters for upload routes!
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parsers with safe limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// === API routes ===
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const categoryRoutes = require('./routes/categories');
const adminRoutes = require('./routes/admin');
const postRoutes = require('./routes/posts');
const uploadRoutes = require('./routes/uploads');
const videoLikeRoutes = require('./routes/videoLikes');
const postLikeRoutes = require('./routes/postsLikes');
const shortsRoutes = require('./routes/shorts');
const postCommentsRoutes = require('./routes/postComments');
const videoCommentsRoutes = require('./routes/videoComments');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const eventRoutes = require('./routes/events');

app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/video-likes', videoLikeRoutes);
app.use('/api/post-likes', postLikeRoutes);
app.use('/api/shorts', shortsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads/images', uploadRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/posts/:postId/comments', postCommentsRoutes);
app.use('/api/videos/:videoId/comments', videoCommentsRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/posts', postRoutes);

// === Serve frontend ===
const frontendBuildPath = path.resolve(__dirname, '../../build');
if (fs.existsSync(frontendBuildPath)) {
  console.log('✅ Serving frontend from:', frontendBuildPath);
  app.use(express.static(frontendBuildPath));

  // SPA routing fallback
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  console.warn('⚠️ Frontend build not found at:', frontendBuildPath);
  console.warn('Running in API-only mode...');
}

// === Error handler ===
app.use((err, req, res, next) => {
  console.error('🔥 Internal error:', err);
  res.status(500).json({ error: err.message });
});

module.exports = app;

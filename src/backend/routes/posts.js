const express = require('express');
const path    = require('path');
const fs      = require('fs');
const multer  = require('multer');
const auth    = require('../middleware/auth');
const postCtl = require('../controllers/postController');

const router = express.Router();

// ensure upload dir
const imagesDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// public
router.get('/',    postCtl.getAllPosts);
router.get('/:id', postCtl.getPostById);

// protected
router.post('/',    auth, upload.single('image'), postCtl.createPost);
router.put('/:id',  auth, upload.single('image'), postCtl.updatePost);
router.delete('/:id', auth, postCtl.deletePost);

module.exports = router;

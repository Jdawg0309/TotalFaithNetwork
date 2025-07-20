const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload  = multer({ dest: 'src/backend/uploads/images' });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file');
  res.json({ path: `/uploads/images/${req.file.filename}` });
});

module.exports = router;

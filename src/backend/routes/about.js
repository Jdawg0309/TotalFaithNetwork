const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

router.get('/', aboutController.getAbout);
router.get('/leaders', aboutController.getLeaders);
router.get('/advisory-images', aboutController.getAdvisoryImages);
router.get('/tributes', aboutController.getTributes);

router.put('/', aboutController.updateAbout);
router.put('/leaders', aboutController.updateLeaders);
router.put('/advisory-images', aboutController.updateAdvisoryImages);
router.put('/tributes', aboutController.updateTributes);

module.exports = router;

const express = require('express');
const multer = require('multer');
const { analyzePdf } = require('../controllers/pdfController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('pdf'), analyzePdf);

module.exports = router;
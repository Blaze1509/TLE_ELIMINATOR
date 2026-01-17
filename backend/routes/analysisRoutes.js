const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

// Routes
router.post('/create', analysisController.upload.single('document'), analysisController.createAnalysis);
router.get('/user-analyses', analysisController.getUserAnalyses);
router.get('/:id', analysisController.getAnalysis);
router.delete('/:id', analysisController.deleteAnalysis);

module.exports = router;
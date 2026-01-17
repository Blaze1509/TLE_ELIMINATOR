const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

// Routes
router.get('/stats', analysisController.getUserStats);
router.get('/user', analysisController.getUserAnalyses);
router.post('/', analysisController.upload.single('document'), analysisController.createAnalysis);
router.get('/:id', analysisController.getAnalysis);
router.delete('/:id', analysisController.deleteAnalysis);

module.exports = router;
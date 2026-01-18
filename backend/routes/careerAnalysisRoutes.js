const express = require('express');
const router = express.Router();
const careerAnalysisController = require('../controllers/careerAnalysisController');

// Career analysis routes
router.post('/create', careerAnalysisController.createCareerAnalysis);
router.get('/user', careerAnalysisController.getUserCareerAnalyses);
router.get('/:id', careerAnalysisController.getCareerAnalysis);

module.exports = router;
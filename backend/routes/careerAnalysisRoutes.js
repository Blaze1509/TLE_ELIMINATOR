const express = require('express');
const router = express.Router();
const careerAnalysisController = require('../controllers/careerAnalysisController');

// Career analysis routes
router.post('/create', careerAnalysisController.createCareerAnalysis);
router.get('/user', careerAnalysisController.getUserCareerAnalyses);
router.get('/latest', careerAnalysisController.getLatestAnalysis);
router.get('/progress-history', careerAnalysisController.getProgressHistory);
router.get('/:id', careerAnalysisController.getCareerAnalysis);
router.put('/skill/:skillId/complete', careerAnalysisController.markSkillCompleted);

module.exports = router;
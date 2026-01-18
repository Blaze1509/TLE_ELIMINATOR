const express = require('express');
const router = express.Router();
const insightsController = require('../controllers/insightsController');

// Insights routes
router.get('/data', insightsController.getInsightsData);
router.get('/report/pdf', insightsController.generatePDFReport);
router.get('/report/json', insightsController.generateJSONReport);

module.exports = router;
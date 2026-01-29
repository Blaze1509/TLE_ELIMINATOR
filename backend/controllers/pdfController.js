const axios = require('axios');
const FormData = require('form-data');
const CareerAnalysis = require('../models/CareerAnalysis');
const jwt = require('jsonwebtoken');

const analyzePdf = async (req, res) => {
  try {
    console.log('PDF analyze request received');
    console.log('File:', req.file ? req.file.originalname : 'No file');
    
    if (!req.file || !req.file.originalname.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ error: 'PDF file required' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);

    const response = await axios.post(process.env.MODEL_PREDICT_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'ngrok-skip-browser-warning': 'true'
      }
    });

    // Create new CareerAnalysis entry with PDF data from /predict
    const careerAnalysis = new CareerAnalysis({
      userId: decoded.userId,
      resume_data: response.data.data,
      additional_skills: [],
      career_goal: '',
      predict_completed: true,
      readiness_score: 0,
      gap_percentage: 0
    });

    await careerAnalysis.save();

    console.log('PDF processed and CareerAnalysis entry created:', careerAnalysis._id);
    res.json({ ...response.data, careerAnalysisId: careerAnalysis._id });
  } catch (error) {
    console.error('PDF Analysis Error:', error.message);
    res.status(500).json({ error: error.response?.data?.detail || error.message });
  }
};

module.exports = { analyzePdf };
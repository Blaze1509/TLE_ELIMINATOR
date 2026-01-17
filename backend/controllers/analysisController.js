const Analysis = require('../models/Analysis');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only documents and images are allowed'));
    }
  }
});

// Dummy RAG API call
const extractDataFromDocument = async (filePath) => {
  // Simulate RAG model API call
  return "Extracted skills: Machine Learning, Data Analysis, Python, Healthcare Analytics";
};

// Dummy ngrok API call
const callNgrokAPI = async (analysisData) => {
  // Simulate ngrok API call
  return {
    readinessScore: Math.floor(Math.random() * 100),
    skillGaps: ['Medical Terminology', 'HIPAA Compliance'],
    recommendations: ['Complete Healthcare Data Course', 'Learn Medical Coding'],
    roadmap: ['Healthcare Basics', 'Data Analysis', 'Specialization']
  };
};

// Create Analysis
exports.createAnalysis = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role, skills } = req.body;
    
    let documentData = null;
    
    // If file uploaded, extract data using RAG
    if (req.file) {
      documentData = await extractDataFromDocument(req.file.path);
    }

    // Create analysis record
    const analysis = new Analysis({
      userId: decoded.userId,
      role,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
      documentData
    });

    await analysis.save();

    // Call ngrok API with analysis data
    const apiData = {
      role,
      skills: analysis.skills,
      documentData
    };

    const ngrokResponse = await callNgrokAPI(apiData);

    // Update analysis with results
    analysis.analysisResult = ngrokResponse;
    analysis.status = 'completed';
    await analysis.save();

    res.json({
      success: true,
      message: 'Analysis completed successfully',
      analysisId: analysis._id,
      result: ngrokResponse
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, error: 'Analysis failed' });
  }
};

// Get all analyses for user
exports.getUserAnalyses = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const analyses = await Analysis.find({ userId: decoded.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      analyses
    });

  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analyses' });
  }
};

// Get single analysis
exports.getAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const analysis = await Analysis.findOne({ 
      _id: id, 
      userId: decoded.userId 
    });

    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Analysis not found' });
    }

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analysis' });
  }
};

// Delete Analysis
exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const analysis = await Analysis.findOneAndDelete({ 
      _id: id, 
      userId: decoded.userId 
    });

    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Analysis not found' });
    }

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    });

  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete analysis' });
  }
};

exports.upload = upload;
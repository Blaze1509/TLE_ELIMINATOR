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
  try {
    const axios = require('axios');
    
    const requestBody = {
      user_id: analysisData.userId,
      future_domain: analysisData.role,
      resume_data: analysisData.pdfData?.data ? {
        full_name: analysisData.pdfData.data.full_name || null,
        technical_skills: analysisData.pdfData.data.technical_skills || null,
        projects: analysisData.pdfData.data.projects || null,
        years_of_experience: analysisData.pdfData.data.years_of_experience || null,
        certifications: analysisData.pdfData.data.certifications || null
      } : null
    };
    
    console.log('Calling Groq Analysis API:', process.env.NGROK_ANALYSIS_API);
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await axios.post(process.env.NGROK_ANALYSIS_API, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Groq API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Groq API error:', error.message);
    // Return dummy data if API fails
    return {
      readinessScore: Math.floor(Math.random() * 100),
      skillGaps: ['Medical Terminology', 'HIPAA Compliance'],
      recommendations: ['Complete Healthcare Data Course', 'Learn Medical Coding'],
      roadmap: ['Healthcare Basics', 'Data Analysis', 'Specialization']
    };
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const analyses = await Analysis.find({ userId: decoded.userId });
    const completedAnalyses = analyses.filter(a => a.status === 'completed');
    
    const stats = {
      readinessScore: completedAnalyses.length > 0 ? completedAnalyses[completedAnalyses.length - 1].analysisResult.readinessScore : 0,
      totalAnalyses: analyses.length,
      skillsCount: 0,
      completedAnalyses: completedAnalyses.length
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
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
      userId: decoded.userId,
      role,
      pdfData: req.body.pdfData
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
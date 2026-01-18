const CareerAnalysis = require('../models/CareerAnalysis');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Call model analyze API
const callAnalyzeAPI = async (data) => {
  try {
    console.log('🚀 Calling analyze API:', process.env.MODEL_ANALYZE_URL);
    console.log('📤 Request data:', JSON.stringify(data, null, 2));
    
    const response = await axios.post(process.env.MODEL_ANALYZE_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      timeout: 30000
    });
    
    console.log('📥 ANALYZE API RESPONSE:');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Analyze API error:', error.message);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    return null;
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
    const careerAnalyses = await CareerAnalysis.find({ userId: decoded.userId });
    const completedAnalyses = careerAnalyses.filter(a => a.analysis_completed);
    
    const stats = {
      readinessScore: completedAnalyses.length > 0 ? (100 - completedAnalyses[completedAnalyses.length - 1].gap_percentage) : 0,
      totalAnalyses: careerAnalyses.length,
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
    const { career_goal, additional_skills, careerAnalysisId } = req.body;
    
    // Find the CareerAnalysis entry by ID or latest one
    let careerAnalysis;
    if (careerAnalysisId) {
      careerAnalysis = await CareerAnalysis.findOne({ 
        _id: careerAnalysisId, 
        userId: decoded.userId 
      });
    } else {
      careerAnalysis = await CareerAnalysis.findOne({ 
        userId: decoded.userId,
        predict_completed: true,
        analysis_completed: false
      }).sort({ createdAt: -1 });
    }

    if (!careerAnalysis) {
      return res.status(400).json({ success: false, error: 'No PDF uploaded. Please upload resume first.' });
    }

    // Update with additional data
    careerAnalysis.career_goal = career_goal || careerAnalysis.career_goal || 'Healthcare Professional';
    careerAnalysis.additional_skills = additional_skills || careerAnalysis.additional_skills;

    // Call analyze API
    const analyzeData = {
      career_goal: careerAnalysis.career_goal,
      resume_data: careerAnalysis.resume_data,
      additional_skills: careerAnalysis.additional_skills
    };
    
    const analyzeResponse = await callAnalyzeAPI(analyzeData);
    if (analyzeResponse) {
      careerAnalysis.career_goal = analyzeResponse.career_goal || careerAnalysis.career_goal;
      careerAnalysis.current_skills = analyzeResponse.current_skills || [];
      careerAnalysis.required_skills = analyzeResponse.required_skills || [];
      careerAnalysis.matching_skills = analyzeResponse.matching_skills || [];
      careerAnalysis.skill_gap = analyzeResponse.skill_gap || [];
      careerAnalysis.gap_percentage = analyzeResponse.gap_percentage || 0;
      careerAnalysis.recommendations = analyzeResponse.recommendations || '';
      careerAnalysis.analysis_completed = true;
    }

    await careerAnalysis.save();

    res.json({
      success: true,
      message: 'Career analysis completed successfully',
      careerAnalysisId: careerAnalysis._id,
      result: {
        current_skills: careerAnalysis.current_skills,
        required_skills: careerAnalysis.required_skills,
        matching_skills: careerAnalysis.matching_skills,
        skill_gap: careerAnalysis.skill_gap,
        gap_percentage: careerAnalysis.gap_percentage,
        recommendations: careerAnalysis.recommendations
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ success: false, error: 'Analysis failed' });
  }
};

// Get all career analyses for user
exports.getUserAnalyses = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const careerAnalyses = await CareerAnalysis.find({ userId: decoded.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      analyses: careerAnalyses
    });

  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analyses' });
  }
};

// Get single career analysis
exports.getAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const careerAnalysis = await CareerAnalysis.findOne({ 
      _id: id, 
      userId: decoded.userId 
    });

    if (!careerAnalysis) {
      return res.status(404).json({ success: false, error: 'Career analysis not found' });
    }

    res.json({
      success: true,
      analysis: careerAnalysis
    });

  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analysis' });
  }
};

// Delete Career Analysis
exports.deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const careerAnalysis = await CareerAnalysis.findOneAndDelete({ 
      _id: id, 
      userId: decoded.userId 
    });

    if (!careerAnalysis) {
      return res.status(404).json({ success: false, error: 'Career analysis not found' });
    }

    res.json({
      success: true,
      message: 'Career analysis deleted successfully'
    });

  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete analysis' });
  }
};
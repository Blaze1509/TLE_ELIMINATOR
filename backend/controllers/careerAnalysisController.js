const CareerAnalysis = require('../models/CareerAnalysis');
const jwt = require('jsonwebtoken');

// Generate career analysis using ngrok model
const generateCareerAnalysisWithModel = async (role, skills, pdfData) => {
  try {
    const axios = require('axios');
    
    const requestBody = {
      target_role: role,
      current_skills: skills,
      resume_data: pdfData
    };
    
    console.log('Calling Career Model API:', process.env.MODEL_PREDICT_URL);
    
    const response = await axios.post(process.env.MODEL_PREDICT_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Career Model API error:', error.message);
    return null;
  }
};

// Healthcare career data
const healthcareCareers = {
  'Health Informatics Engineer': {
    requiredSkills: ['FHIR', 'HL7', 'SQL', 'HIPAA', 'Python', 'Healthcare Analytics'],
    salaryRange: { min: 75000, max: 120000, currency: 'USD' },
    demandScore: 85,
    jobGrowth: '15% (Much faster than average)',
    topEmployers: ['Epic Systems', 'Cerner', 'Allscripts', 'Mayo Clinic', 'Kaiser Permanente']
  },
  'Clinical Data Analyst': {
    requiredSkills: ['SQL', 'R', 'Python', 'Clinical Research', 'Statistics', 'HIPAA'],
    salaryRange: { min: 65000, max: 95000, currency: 'USD' },
    demandScore: 78,
    jobGrowth: '12% (Faster than average)',
    topEmployers: ['Pfizer', 'Johnson & Johnson', 'Merck', 'Cleveland Clinic', 'Johns Hopkins']
  }
};

// Generate career analysis
const generateCareerAnalysis = async (targetRole, currentSkills) => {
  // Try to get analysis from model first
  const modelResult = await generateCareerAnalysisWithModel(targetRole, currentSkills, null);
  
  if (modelResult) {
    return modelResult;
  }
  
  // Fallback to static data
  const careerData = healthcareCareers[targetRole] || healthcareCareers['Health Informatics Engineer'];
  
  const skillGaps = careerData.requiredSkills.map(skill => {
    const userSkill = currentSkills.find(s => s.name.toLowerCase().includes(skill.toLowerCase()));
    const currentLevel = userSkill ? userSkill.proficiency : 0;
    const requiredLevel = 80;
    
    return {
      skill,
      importance: 'High',
      currentLevel,
      requiredLevel,
      learningResources: [`${skill} Certification Course`, `${skill} Documentation`]
    };
  });

  const criticalGaps = skillGaps.filter(gap => gap.currentLevel < gap.requiredLevel - 30);
  
  return {
    careerPath: {
      currentLevel: 'Entry Level',
      targetLevel: 'Mid Level',
      estimatedTimeToGoal: '12-18 months',
      milestones: [
        {
          title: 'Foundation Skills',
          description: 'Master core healthcare IT concepts',
          timeframe: '3-6 months',
          requiredSkills: ['HIPAA', 'Medical Terminology']
        },
        {
          title: 'Technical Proficiency',
          description: 'Develop technical implementation skills',
          timeframe: '6-12 months',
          requiredSkills: ['FHIR', 'HL7', 'SQL']
        }
      ]
    },
    marketAnalysis: {
      demandScore: careerData.demandScore,
      salaryRange: careerData.salaryRange,
      jobGrowth: careerData.jobGrowth,
      topEmployers: careerData.topEmployers
    },
    skillGapAnalysis: {
      criticalGaps,
      strengthAreas: currentSkills.filter(s => s.proficiency >= 70).map(s => s.name),
      improvementAreas: currentSkills.filter(s => s.proficiency < 50).map(s => s.name)
    },
    recommendations: {
      immediateActions: [
        'Complete HIPAA compliance training',
        'Start FHIR fundamentals course'
      ],
      shortTermGoals: [
        'Obtain healthcare IT certification',
        'Build portfolio with healthcare projects'
      ],
      longTermGoals: [
        'Pursue advanced healthcare informatics degree',
        'Gain leadership experience in healthcare IT'
      ],
      certifications: ['CAHIMS', 'CHPS', 'CPHIMS'],
      courses: ['Healthcare Informatics', 'FHIR Implementation', 'Clinical Data Management']
    }
  };
};

// Create career analysis
exports.createCareerAnalysis = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { targetRole, currentSkills } = req.body;

    const analysisData = await generateCareerAnalysis(targetRole, currentSkills);

    const careerAnalysis = new CareerAnalysis({
      userId: decoded.userId,
      targetRole,
      currentSkills,
      ...analysisData
    });

    await careerAnalysis.save();

    res.json({
      success: true,
      message: 'Career analysis completed successfully',
      analysisId: careerAnalysis._id,
      analysis: careerAnalysis
    });

  } catch (error) {
    console.error('Career analysis error:', error);
    res.status(500).json({ success: false, error: 'Career analysis failed' });
  }
};

// Get user career analyses
exports.getUserCareerAnalyses = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const analyses = await CareerAnalysis.find({ userId: decoded.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      analyses
    });

  } catch (error) {
    console.error('Get career analyses error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch career analyses' });
  }
};

// Get single career analysis
exports.getCareerAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const analysis = await CareerAnalysis.findOne({ 
      _id: id, 
      userId: decoded.userId 
    });

    if (!analysis) {
      return res.status(404).json({ success: false, error: 'Career analysis not found' });
    }

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Get career analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch career analysis' });
  }
};

// Get latest career analysis
exports.getLatestAnalysis = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const analysis = await CareerAnalysis.findOne({ 
      userId: decoded.userId,
      analysis_completed: true 
    }).sort({ createdAt: -1 });

    if (!analysis) {
      return res.status(404).json({ 
        success: false, 
        error: 'No completed analysis found' 
      });
    }

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Get latest analysis error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analysis' });
  }
};

// Mark skill as completed
exports.markSkillCompleted = async (req, res) => {
  try {
    const { skillId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const analysis = await CareerAnalysis.findOne({ 
      userId: decoded.userId,
      analysis_completed: true,
      'skill_gap._id': skillId
    });

    if (!analysis) {
      return res.status(404).json({ 
        success: false, 
        error: 'Analysis or skill not found' 
      });
    }

    // Update the specific skill's completed status
    const skill = analysis.skill_gap.id(skillId);
    if (skill) {
      skill.completed = true;
      
      // Update completed skills count and readiness score
      analysis.completed_skills_count = analysis.skill_gap.filter(s => s.completed).length;
      analysis.total_learning_hours = (analysis.total_learning_hours || 0) + 15; // Add 15 hours per completed skill
      
      // Recalculate readiness score based on completed skills
      const totalSkills = analysis.skill_gap.length;
      const completedSkills = analysis.completed_skills_count;
      const completionRate = completedSkills / totalSkills;
      analysis.readiness_score = Math.min(95, 30 + (completionRate * 65)); // Scale from 30% to 95%
      
      await analysis.save();
    }

    res.json({
      success: true,
      message: 'Skill marked as completed',
      readinessScore: analysis.readiness_score
    });
  } catch (error) {
    console.error('Mark skill completed error:', error);
    res.status(500).json({ success: false, error: 'Failed to update skill' });
  }
};
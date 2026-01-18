const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mode: {
    type: String,
    enum: ['skills-only', 'resume-only', 'combined'],
    required: true
  },
  role: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: function() {
      return this.mode === 'skills-only' || this.mode === 'combined';
    }
  }],
  documentData: {
    type: String,
    default: null
  },
  pdfData: {
    full_name: String,
    technical_skills: [String],
    projects: [{
      name: String,
      description: String,
      technologies: [String]
    }],
    years_of_experience: Number,
    certifications: [String],
    education: [{
      degree: String,
      institution: String,
      year: Number
    }]
  },
  analysisResult: {
    readinessScore: {
      type: Number,
      default: 0
    },
    skillGaps: [{
      skill: String,
      importance: String,
      gap: Number,
      reason: String
    }],
    recommendations: [{
      skill: String,
      action: String,
      priority: String,
      estimatedTime: String
    }],
    roadmap: [{
      phase: String,
      skills: [String],
      duration: String,
      description: String
    }],
    careerAnalysis: {
      missingSkills: [{
        name: String,
        category: String,
        importance: String,
        impactOnReadiness: String,
        whyMatters: String,
        estimatedLearnTime: String
      }],
      weakSkills: [{
        name: String,
        currentLevel: String,
        requiredLevel: String,
        currentProficiency: Number,
        requiredProficiency: Number,
        gap: Number,
        whyMatters: String,
        recommendedImprovement: String
      }],
      strongSkills: [{
        name: String,
        level: String,
        proficiency: Number,
        requiredProficiency: Number,
        evidence: String,
        certificateLink: String
      }],
      skillImportance: [{
        skill: String,
        importance: Number,
        userLevel: Number
      }],
      aiExplanations: [{
        title: String,
        explanation: String,
        relatedSkill: String
      }],
      recommendedActions: [{
        rank: Number,
        skill: String,
        reason: String,
        course: String,
        duration: String,
        priority: String
      }],
      historicalData: [{
        date: String,
        readiness: Number
      }]
    }
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Analysis', analysisSchema);
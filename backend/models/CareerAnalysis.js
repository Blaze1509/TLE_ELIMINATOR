const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['youtube', 'course', 'book'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author: String,
  description: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced']
  }
});

const skillGapSchema = new mongoose.Schema({
  skill_name: {
    type: String,
    required: true
  },
  importance: {
    type: String,
    enum: ['critical', 'important', 'nice-to-have'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  resources: [resourceSchema]
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  tech_stack: [String],
  medical_impact: String
});

const healthcareDomainSchema = new mongoose.Schema({
  has_fhir: {
    type: Boolean,
    default: false
  },
  has_hl7: {
    type: Boolean,
    default: false
  },
  has_hipaa: {
    type: Boolean,
    default: false
  },
  other_healthcare_standards: [String]
});

const resumeDataSchema = new mongoose.Schema({
  full_name: String,
  technical_skills: [String],
  healthcare_domain_knowledge: healthcareDomainSchema,
  projects: [projectSchema],
  years_of_experience: Number,
  certifications: [String]
});

const careerAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Initial input data
  resume_data: resumeDataSchema,
  additional_skills: [String],
  career_goal: String,
  
  // Analysis results from /predict
  current_skills: [String],
  required_skills: [String],
  matching_skills: [String],
  
  // Analysis results from /analyze-career-gap
  skill_gap: [skillGapSchema],
  gap_percentage: {
    type: Number,
    min: 0,
    max: 100
  },
  recommendations: String,
  
  // Status tracking
  predict_completed: {
    type: Boolean,
    default: false
  },
  analysis_completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CareerAnalysis', careerAnalysisSchema);
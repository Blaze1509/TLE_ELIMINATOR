const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  documentData: {
    type: String,
    default: null
  },
  analysisResult: {
    readinessScore: {
      type: Number,
      default: 0
    },
    skillGaps: [String],
    recommendations: [String],
    roadmap: [String]
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
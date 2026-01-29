const mongoose = require('mongoose');

const chatStateSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    index: true
  },
  domain: {
    type: String,
    required: true
  },
  chat_history: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  last_node: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient queries
chatStateSchema.index({ user_id: 1, domain: 1 });

module.exports = mongoose.model('ChatState', chatStateSchema, 'chat_states');
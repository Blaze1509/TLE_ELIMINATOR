const ChatState = require('../models/ChatState');
const axios = require('axios');

// Chatbot controller with predefined responses
const chatbotResponses = {
  greeting: [
    "Hello! How can I assist you with your healthcare skills analysis today?",
    "Hi there! I'm here to help you with skill assessments and learning paths!",
    "Hey! How may I help you with your professional development?"
  ],
  help: [
    "I can help you with skill analysis, learning paths, account management, and platform navigation. What would you like to know?",
    "I'm here to assist you with healthcare skill assessments, career analysis, and platform features. Feel free to ask!"
  ],
  skills: [
    "Our platform offers comprehensive skill analysis for healthcare professionals. You can assess technical and clinical skills, identify gaps, and get personalized learning recommendations.",
    "We analyze your skills across multiple domains and provide detailed insights with actionable learning paths. Would you like to start an assessment?"
  ],
  analysis: [
    "You can create detailed skill analyses, track your progress, and generate PDF reports. Visit the Analysis section to get started!",
    "Our analysis feature helps identify your strengths and areas for improvement. You can view your analysis history in your dashboard."
  ],
  account: [
    "You can manage your account settings from the dashboard. Need help with something specific like profile updates or password reset?",
    "Your account includes your profile, analysis history, and learning progress. What would you like to update?"
  ],
  default: [
    "I'm here to help with your healthcare skill development! Could you please provide more details?",
    "That's an interesting question! Let me help you with your professional growth journey.",
    "I'm not sure I understand completely. Could you rephrase that? I'm here to assist with skill analysis and learning paths.",
    "Thanks for your message! I'm here to help you excel in your healthcare career."
  ]
};

// Simple keyword-based response logic
const getResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Check for greetings
  if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
  }

  // Check for help
  if (lowerMessage.match(/\b(help|assist|support)\b/)) {
    return chatbotResponses.help[Math.floor(Math.random() * chatbotResponses.help.length)];
  }

  // Check for skills queries
  if (lowerMessage.match(/\b(skill|skills|assessment|evaluate|competency)\b/)) {
    return chatbotResponses.skills[Math.floor(Math.random() * chatbotResponses.skills.length)];
  }

  // Check for analysis queries
  if (lowerMessage.match(/\b(analysis|analyze|report|progress|learning path)\b/)) {
    return chatbotResponses.analysis[Math.floor(Math.random() * chatbotResponses.analysis.length)];
  }

  // Check for account queries
  if (lowerMessage.match(/\b(account|profile|settings|password)\b/)) {
    return chatbotResponses.account[Math.floor(Math.random() * chatbotResponses.account.length)];
  }

  // Default response
  return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
};

// Handle chat message - proxy to ngrok model
exports.sendMessage = async (req, res) => {
  try {
    const { message, user_id } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const userId = user_id || req.user?.id || 'anonymous';

    // Save user message to chat history
    let chatState = await ChatState.findOne({ user_id: userId });
    if (!chatState) {
      chatState = new ChatState({
        user_id: userId,
        domain: 'healthcare_skills',
        chat_history: []
      });
    }

    chatState.chat_history.push({
      role: 'user',
      content: message
    });

    // Call ngrok API
    const ngrokUrl = process.env.NGROK_API_URL;
    if (ngrokUrl) {
      try {
        console.log('🔄 Calling ngrok API:', ngrokUrl);
        console.log('📤 Payload:', { user_id: userId, message });
        
        const response = await axios.post(ngrokUrl, {
          user_id: userId,
          message: message
        }, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          timeout: 30000
        });
        
        console.log('📥 Ngrok response status:', response.status);
        console.log('📥 Ngrok response data:', response.data);
        
        const botResponse = response.data.response || response.data.message || response.data.answer || 'Response received';
        
        // Save bot response to chat history
        chatState.chat_history.push({
          role: 'assistant',
          content: botResponse
        });
        
        await chatState.save();
        
        return res.status(200).json({
          success: true,
          message: botResponse,
          timestamp: new Date().toISOString()
        });
      } catch (ngrokError) {
        console.error('❌ Ngrok API error details:', {
          status: ngrokError.response?.status,
          statusText: ngrokError.response?.statusText,
          data: ngrokError.response?.data,
          message: ngrokError.message,
          code: ngrokError.code
        });
        console.log('⚠️ Falling back to local response');
        // Fallback to local response
      }
    } else {
      console.log('⚠️ No NGROK_API_URL configured, using local response');
    }

    // Fallback to local response if ngrok fails
    const botResponse = getResponse(message);
    
    // Save bot response to chat history
    chatState.chat_history.push({
      role: 'assistant',
      content: botResponse
    });
    
    await chatState.save();
    
    res.status(200).json({
      success: true,
      message: botResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    });
  }
};

// Get chatbot status
exports.getStatus = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      status: 'online',
      message: 'Healthcare Skills Assistant is ready to help you'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get status'
    });
  }
};
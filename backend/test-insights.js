// Test script for insights API
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test function
async function testInsightsAPI() {
  try {
    console.log('Testing Insights API...');
    
    // Test health endpoint first
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    
    // Note: To test insights endpoints, you would need a valid JWT token
    // This would typically come from logging in first
    console.log('📝 To test insights endpoints, you need to:');
    console.log('1. Login to get a JWT token');
    console.log('2. Complete a skill analysis');
    console.log('3. Call /api/insights/data with Authorization header');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testInsightsAPI();
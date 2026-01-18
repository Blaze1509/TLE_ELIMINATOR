const User = require('../models/User');
const CareerAnalysis = require('../models/CareerAnalysis');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const axios = require('axios');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Signup
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { username, email, password } = req.body;
    console.log('📝 Signup attempt:', { username, email });

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    // Create user
    const user = new User({ username, email, password });
    await user.save();
    console.log('✅ User created:', user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Please login.'
    });
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { username, password } = req.body;
    console.log('🔐 Login attempt:', { username });

    // Find user by username or email
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    });

    if (!user) {
      console.log('❌ User not found:', username);
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', username);
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    console.log('✅ Login successful:', user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
};

// Forgot Password - Send OTP
exports.forgotPassword = async (req, res) => {
  try {
    console.log('Email config:', {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? 'Set' : 'Not set'
    });
    
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }

    const otp = generateOTP();
    const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: '2m' });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'TLE Healthcare Skills - Password Reset Verification',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - TLE Healthcare Skills</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">TLE Healthcare Skills</h1>
              <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">Intelligence Platform</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 32px; font-weight: bold;">🔐</span>
                </div>
                <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">Password Reset Request</h2>
                <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Use the verification code below to proceed.</p>
              </div>
              
              <!-- OTP Code -->
              <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border: 2px dashed #cbd5e1; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                <p style="color: #475569; margin: 0 0 10px 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
                <div style="font-size: 36px; font-weight: 700; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</div>
                <p style="color: #64748b; margin: 15px 0 0 0; font-size: 14px;">Enter this code in the password reset form</p>
              </div>
              
              <!-- Important Info -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <div style="display: flex; align-items: flex-start;">
                  <span style="color: #d97706; font-size: 20px; margin-right: 12px;">⚠️</span>
                  <div>
                    <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Important Security Notice</h4>
                    <ul style="color: #a16207; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                      <li>This code expires in <strong>2 minutes</strong></li>
                      <li>Never share this code with anyone</li>
                      <li>If you didn't request this, ignore this email</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px;">Having trouble? Contact our support team</p>
                <a href="mailto:support@tlehealthcare.com" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 14px;">Contact Support</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0 0 10px 0; font-size: 14px;">© 2024 TLE Healthcare Skills Intelligence Platform</p>
              <p style="color: #94a3b8; margin: 0; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
            </div>
            
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'OTP sent to your email',
      token: otpToken
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp, token } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email !== email || decoded.otp !== otp) {
        return res.status(400).json({ success: false, error: 'Invalid OTP' });
      }

      res.json({ success: true, message: 'OTP verified successfully' });
    } catch (jwtError) {
      return res.status(400).json({ success: false, error: 'OTP expired' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, token, newPassword } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email !== email || decoded.otp !== otp) {
        return res.status(400).json({ success: false, error: 'Invalid request' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      user.password = newPassword;
      await user.save();

      res.json({ success: true, message: 'Password reset successfully' });
    } catch (jwtError) {
      return res.status(400).json({ success: false, error: 'Request expired' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Submit Profile
exports.submitProfile = async (req, res) => {
  try {
    console.log('📝 Profile submission request:', req.body);
    const { skills, careerGoal } = req.body;
    const userId = req.user.userId;
    console.log('👤 User ID:', userId);

    // Find the latest CareerAnalysis with predict_completed = true
    const existingAnalysis = await CareerAnalysis.findOne({ 
      userId, 
      predict_completed: true,
      analysis_completed: false 
    }).sort({ createdAt: -1 });

    console.log('📊 Found analysis:', existingAnalysis ? 'Yes' : 'No');
    if (!existingAnalysis) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please analyze a document first' 
      });
    }

    // Update with additional skills and career goal
    existingAnalysis.additional_skills = skills;
    existingAnalysis.career_goal = careerGoal;
    await existingAnalysis.save();
    console.log('✅ Analysis updated with user data');

    // Prepare data for /analyze-career-gap endpoint
    const gapAnalysisData = {
      skills: skills,
      career_goal: careerGoal,
      resume_data: existingAnalysis.resume_data
    };
    console.log('🔄 Sending to gap analysis:', process.env.MODEL_ANALYZE_URL);
    console.log('📤 Gap analysis data:', JSON.stringify(gapAnalysisData, null, 2));

    const response = await axios.post(process.env.MODEL_ANALYZE_URL, gapAnalysisData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('📈 Gap analysis response received');
    
    // Update analysis with gap analysis results - only update empty/missing fields
    if (!existingAnalysis.skill_gap || existingAnalysis.skill_gap.length === 0) {
      existingAnalysis.skill_gap = response.data.skill_gap;
    }
    if (!existingAnalysis.gap_percentage) {
      existingAnalysis.gap_percentage = response.data.gap_percentage;
    }
    if (!existingAnalysis.recommendations) {
      existingAnalysis.recommendations = response.data.recommendations;
    }
    existingAnalysis.analysis_completed = true;
    await existingAnalysis.save();
    console.log('✅ Final analysis saved');

    res.json({
      success: true,
      message: 'Profile submitted and analyzed successfully',
      analysisId: existingAnalysis._id
    });
  } catch (error) {
    console.error('❌ Profile submission error:', error.message);
    if (error.response) {
      console.error('📊 API Response Status:', error.response.status);
      console.error('📊 API Response Data:', JSON.stringify(error.response.data, null, 2));
    }
    console.error('Stack:', error.stack);
    res.status(500).json({ success: false, error: 'Failed to submit profile' });
  }
};
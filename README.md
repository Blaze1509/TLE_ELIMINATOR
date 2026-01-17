# TLE - Healthcare Skill Intelligence Platform

A comprehensive full-stack application for analyzing technical and healthcare skills, providing personalized learning paths, and tracking professional development progress.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend API Endpoints](#backend-api-endpoints)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

TLE is an integrated platform designed to help professionals analyze their skills, understand gaps, and create actionable learning paths. The system includes robust authentication, real-time analytics, PDF report generation, and interactive dashboards.

---

## ✨ Features

### Authentication & Security
- User signup with email verification
- Secure login with JWT-based authentication
- Forgot password with OTP verification via email
- OAuth integration (Google, GitHub)
- Password reset functionality
- Secure session management with Passport.js

### Skill Analysis
- Comprehensive skill assessment forms
- Real-time skill gap analysis
- Technical and healthcare skill profiling
- Custom skill categorization
- Performance metrics and analytics

### Learning & Development
- Personalized learning path generation
- Progress tracking dashboard
- Interactive insights and reports
- PDF report generation
- Analysis history and trends

### User Experience
- Modern React-based frontend with Tailwind CSS
- Responsive design for all devices
- Real-time notifications with React Hot Toast
- Smooth animations with GSAP
- 3D visualizations with Three.js

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Passport.js, JWT
- **Email**: Nodemailer
- **File Upload**: Multer
- **Validation**: Express Validator

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **API Client**: Axios
- **Notifications**: React Hot Toast
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: GSAP

---

## 📁 Project Structure

```
TLE/
├── backend/
│   ├── config/
│   │   └── passport.js          # Passport.js authentication strategies
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── analysisController.js # Skill analysis logic
│   │   └── pdfController.js     # PDF generation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Analysis.js          # Analysis schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── analysisRoutes.js    # Analysis endpoints
│   │   └── pdfRoutes.js         # PDF endpoints
│   ├── server.js                # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML entry point
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js     # Axios configuration
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── store/               # Zustand state management
│   │   ├── lib/                 # Utility functions
│   │   ├── landing/             # Landing page components
│   │   ├── App.js               # Main App component
│   │   └── index.js             # React entry point
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── package.json
│
├── SETUP_GUIDE.md               # Detailed setup instructions
├── AUTH_SYSTEM_STATUS.md        # Authentication system documentation
├── OAUTH_SETUP_GUIDE.md         # OAuth configuration guide
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14 or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier available)
- **Gmail account** (for email verification)

### Quick Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd TLE
git checkout main  # Latest branch
```

> **Note:** The latest branch is `main`. Always pull from this branch for the most up-to-date code.

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare_skills?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Start the backend server:
```bash
npm start
```

Expected output:
```
✅ MongoDB connected: cluster.mongodb.net
✅ Server running on port 5001
📍 API URL: http://localhost:5001/api
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

---

## 🔌 Backend API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Send OTP to email |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/profile` | Get user profile (Protected) |

### Skill Analysis Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analysis/create` | Create new analysis |
| GET | `/api/analysis` | Get user analyses (Protected) |
| GET | `/api/analysis/:id` | Get analysis details (Protected) |
| PUT | `/api/analysis/:id` | Update analysis (Protected) |
| DELETE | `/api/analysis/:id` | Delete analysis (Protected) |

### PDF Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/pdf/generate` | Generate analysis PDF report (Protected) |

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5001

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_secret_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# OAuth Configuration (Optional)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

**Gmail App Password Setup:**
1. Enable 2-Factor Authentication on your Gmail account
2. Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Copy the generated password and use it as `EMAIL_PASS`

---

## 🔧 Available Scripts

### Backend
```bash
npm start      # Run production server
npm run dev    # Run with nodemon for development
```

### Frontend
```bash
npm start      # Start development server
npm run build  # Create production build
npm test       # Run tests
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas connection string is correct
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check that credentials are valid

### Email Not Sending
- Verify Gmail app password is correct (not your main password)
- Check that 2FA is enabled on Gmail account
- Ensure `EMAIL_USER` and `EMAIL_PASS` are set in `.env`

### Authentication Failures
- Clear browser cookies and local storage
- Restart the backend server
- Check JWT_SECRET consistency between frontend and backend

### OAuth Issues
- Verify OAuth credentials in `.env`
- Ensure redirect URLs match in OAuth provider settings
- Check browser console for specific error messages

---

## 📚 Additional Resources

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Authentication System Status](AUTH_SYSTEM_STATUS.md) - Auth implementation details
- [OAuth Setup Guide](OAUTH_SETUP_GUIDE.md) - OAuth configuration
- [Authentication Debug Guide](AUTHENTICATION_DEBUG_GUIDE.md) - Debugging authentication issues

---

## 📝 License

This project is private and confidential.

---

## 👥 Support

For issues, questions, or contributions, please refer to the documentation files or contact the development team.
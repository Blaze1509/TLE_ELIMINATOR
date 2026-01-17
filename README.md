# Authentication System

A complete authentication system with signup, login, and forgot password functionality.

## Features

- User signup with username, email, and password
- User login with username/email and password
- Forgot password with OTP verification via email
- JWT-based authentication
- Professional UI design
- MVC architecture
- OTP expires in 2 minutes (stored in JWT, not database)

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/authdb
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Email Configuration

For Gmail, you need to:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in EMAIL_PASS

## API Endpoints

- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/forgot-password` - Send OTP to email
- POST `/api/auth/verify-otp` - Verify OTP
- POST `/api/auth/reset-password` - Reset password

## Project Structure

```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        ├── store/
        ├── api/
        └── utils/
```
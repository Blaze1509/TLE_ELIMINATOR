# Healthcare Skill Intelligence Platform - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account
- npm or yarn

---

## 📋 Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create or verify `.env` file with:
```env
PORT=5001
MONGODB_URI=mongodb+srv://mauryadarji2006_db_user:Pf2K55BvbxqSsxuG@cluster0.mt1nkqp.mongodb.net/healthcare_skills?retryWrites=true&w=majority
JWT_SECRET=ilovevanshal
EMAIL_USER=mauryadarji2006@gmail.com
EMAIL_PASS="msku nyhx nrog yxer"
```

### 3. Start Backend Server
```bash
npm start
```

Expected output:
```
✅ MongoDB connected: cluster0.mt1nkqp.mongodb.net
✅ Server running on port 5001
📍 API URL: http://localhost:5001/api
```

---

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Verify Configuration
The frontend is pre-configured to connect to:
- API Base URL: `http://localhost:5001/api`
- Port: `3000`

### 3. Start Frontend
```bash
npm start
```

---

## 🔐 Authentication Flow

### Signup Flow
1. User navigates to app → redirects to `/login`
2. Click "Create one" link → `/signup` page
3. Enter username, email, password
4. Click "Create Account"
5. Backend creates user in MongoDB
6. Frontend auto-logs in and redirects to `/dashboard-main`

### Login Flow
1. User enters username/email and password
2. Backend validates credentials against MongoDB
3. Returns JWT token on success
4. Frontend stores token in auth store
5. Redirects to `/dashboard-main`

---

## 🔍 Troubleshooting

### Issue: "MongoDB connection error"
**Solution:**
- Verify MongoDB URI includes database name: `...mongodb.net/healthcare_skills?...`
- Check internet connection
- Ensure IP is whitelisted in MongoDB Atlas (use 0.0.0.0/0 for development)

### Issue: "Signup/Login failed"
**Check:**
1. Backend is running on port 5001
2. MongoDB is connected (check console logs)
3. Frontend API client baseURL is `http://localhost:5001/api`
4. Check browser console for error details

### Issue: "CORS error"
**Solution:**
- Ensure CORS is configured in backend server.js
- Frontend origin should be `http://localhost:3000`

### View Detailed Logs
Backend will show:
- 📝 Signup attempt: `{ username, email }`
- 🔐 Login attempt: `{ username }`
- ✅ User created: `[user_id]`
- ❌ Errors with stack traces

---

## 📊 Database Structure

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed with bcrypt),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🧪 Test Endpoints

### Health Check
```bash
curl http://localhost:5001/api/health
```

### Signup
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

---

## ✅ Verification Checklist

- [ ] Backend running on port 5001
- [ ] MongoDB connected successfully
- [ ] Frontend running on port 3000
- [ ] Login page shows by default
- [ ] Can create new account
- [ ] Can login with existing account
- [ ] Redirects to dashboard after login/signup
- [ ] Token stored in browser (check DevTools → Application → auth-storage)

---

## 📱 App Navigation After Login

After successful login, users can access:
- `/dashboard-main` - Main dashboard
- `/skills-profile` - Skills & profile management
- `/skill-analysis` - Skill gap analysis
- `/learning-path` - Course recommendations
- `/progress-tracking` - Learning progress
- `/insights-reports` - AI-driven insights

---

## 🔗 Important Ports

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5001 | http://localhost:5001 |
| Frontend | 3000 | http://localhost:3000 |
| MongoDB | (Atlas) | Cloud-hosted |

---

## 📞 Support

For issues:
1. Check console logs (Ctrl+Shift+J in browser)
2. Check backend terminal for error details
3. Verify all environment variables are set
4. Ensure MongoDB connection is active

---

Generated: January 17, 2026

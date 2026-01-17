import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';
import SkillsProfile from './pages/SkillsProfile';
import LearningPath from './pages/LearningPath';
import ProgressTracking from './pages/ProgressTracking';
import SkillAnalysis from './pages/SkillAnalysis';
import InsightsReports from './pages/InsightsReports';
import ForgotPassword from './pages/ForgotPassword';
import './index.css';

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route 
            path="/signup" 
            element={!token ? <Signup /> : <Navigate to="/dashboard-main" />} 
          />
          <Route 
            path="/login" 
            element={!token ? <Login /> : <Navigate to="/dashboard-main" />} 
          />
          <Route 
            path="/forgot-password" 
            element={!token ? <ForgotPassword /> : <Navigate to="/dashboard-main" />} 
          />
          <Route 
            path="/auth/success" 
            element={<AuthSuccess />} 
          />
          <Route 
            path="/dashboard-main" 
            element={token ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/skills-profile" 
            element={token ? <SkillsProfile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/learning-path" 
            element={token ? <LearningPath /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/progress-tracking" 
            element={token ? <ProgressTracking /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/skill-analysis" 
            element={token ? <SkillAnalysis /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/insights-reports" 
            element={token ? <InsightsReports /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={token ? "/dashboard-main" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import useAuthStore from './store/authStore';
import Chatbot from './components/Chatbot';

import LandingPage from "./landing/LandingPage";
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';
import SkillsProfile from './pages/SkillsProfile';
import LearningPath from './pages/LearningPath';
import NewProgress from './pages/NewProgress';
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
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Pages */}
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

          {/* Protected Dashboard Pages */}
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
            element={token ? <NewProgress /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/new-progress" 
            element={token ? <NewProgress /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/skill-analysis" 
            element={token ? <SkillAnalysis /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/insights-reports" 
            element={token ? <InsightsReports /> : <Navigate to="/login" />} 
          />
        </Routes>
        
        {/* Chatbot - only appears for authenticated users */}
        {token && <Chatbot />}
      </div>
    </Router>
  );
}

export default App;

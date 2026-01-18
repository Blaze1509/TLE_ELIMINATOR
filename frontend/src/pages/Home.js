import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle } from 'lucide-react';
import SkillAnalysisForm from '../components/SkillAnalysisForm';
import AnalysisCard from '../components/AnalysisCard';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';

const Home = () => {
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await apiClient.get('/analysis/user-analyses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setAnalyses(response.data.analyses);
      }
    } catch (error) {
      toast.error('Failed to fetch analyses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisComplete = () => {
    fetchAnalyses();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  const handleMenuClick = (itemId) => {
    if (itemId === 'dashboard') {
      navigate('/dashboard-main');
    } else if (itemId === 'skills-profile') {
      navigate('/skills-profile');
    } else if (itemId === 'skill-analysis') {
      navigate('/dashboard');
    } else if (itemId === 'settings') {
      navigate('/settings');
    } else if (itemId === 'help') {
      navigate('/help-support');
    } else {
      setActiveSection(itemId);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skills-profile', label: 'Skills & Profile', icon: User },
    { id: 'skill-analysis', label: 'Skill Analysis', icon: BookOpen },
    { id: 'learning-path', label: 'Learning Path', icon: Map },
    { id: 'progress-tracking', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'insights-reports', label: 'Insights & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return (
        <div>
          {/* Input Form Section */}
          <SkillAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
          
          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              📊 Your Skill Analyses
            </h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading analyses...</p>
              </div>
            ) : analyses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-2">No analyses yet</p>
                <p className="text-sm text-gray-500">Create your first skill analysis above</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyses.map((analysis) => (
                  <AnalysisCard key={analysis._id} analysis={analysis} onDelete={fetchAnalyses} />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {menuItems.find(item => item.id === activeSection)?.label}
          </h2>
          <p className="text-gray-600">
            This section is under development. Check back soon!
          </p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 panel-divider flex flex-col">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              🏥 HealthCare+
            </h1>
            <p className="text-xs text-gray-500 mt-1">Skill Analysis System</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Logged in as</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.username || user?.email || 'User'}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-8 px-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
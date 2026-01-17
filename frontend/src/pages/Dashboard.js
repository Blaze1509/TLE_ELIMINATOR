import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, ArrowRight, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import { api } from '../api/apiClient';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    readinessScore: 0,
    totalAnalyses: 0,
    skillsCount: 0,
    completedAnalyses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await api.getUserStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Keep default values (0) if API fails
    } finally {
      setLoading(false);
    }
  };

  // Real data from API
  const readinessScore = stats.readinessScore || 0;
  const targetRole = 'Health Informatics Engineer';
  const roleDescription = 'Design healthcare IT systems with FHIR, HL7, and HIPAA compliance';
  
  const skillsStats = {
    total: stats.skillsCount || 0,
    beginner: 0,
    intermediate: 0,
    advanced: 0
  };

  const skillGaps = {
    missing: 0,
    weak: 0
  };

  const radarData = [
    { skill: 'FHIR', required: 90, current: 0 },
    { skill: 'HL7', required: 85, current: 0 },
    { skill: 'SQL', required: 80, current: 0 },
    { skill: 'HIPAA', required: 95, current: 0 },
    { skill: 'Data Analytics', required: 75, current: 0 }
  ];

  const nextActions = [];

  const progressData = [
    { week: 'Week 1', readiness: 0 },
    { week: 'Week 2', readiness: 0 },
    { week: 'Week 3', readiness: 0 },
    { week: 'Week 4', readiness: 0 },
    { week: 'Week 5', readiness: 0 },
    { week: 'Week 6', readiness: readinessScore }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
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

  const handleMenuClick = (itemId) => {
    if (itemId === 'dashboard') {
      navigate('/dashboard-main');
    } else if (itemId === 'skills-profile') {
      navigate('/skills-profile');
    } else if (itemId === 'learning-path') {
      navigate('/learning-path');
    } else if (itemId === 'progress-tracking') {
      navigate('/progress-tracking');
    } else if (itemId === 'skill-analysis') {
      navigate('/skill-analysis');
    } else if (itemId === 'insights-reports') {
      navigate('/insights-reports');
    } else {
      setActiveSection(itemId);
    }
  };

  const handleChangeRole = () => {
    toast.info('Skill Analysis feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 panel-divider flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              🏥 HealthCare+
            </h1>
            <p className="text-xs text-gray-500 mt-1">Skill Intelligence</p>
          </div>

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

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <h2 className="text-2xl font-bold text-gray-900">Career Dashboard</h2>
            <p className="text-sm text-gray-600">Your healthcare skill intelligence overview</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* Top Row: Career Readiness, Target Role, Skills Overview */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* 1. Career Readiness Score */}
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-gray-700 flex items-center justify-between">
                    <span>Career Readiness</span>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeDasharray={`${readinessScore * 2.83} 283`}
                          strokeLinecap="round"
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">{readinessScore}%</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {readinessScore === 0 ? (
                        <>Complete a <span className="font-semibold text-gray-900">skill analysis</span> to see your readiness for {targetRole}.</>
                      ) : (
                        <>You are <span className="font-semibold text-gray-900">moderately prepared</span> for {targetRole}.</>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Target Healthcare Role */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-700">Target Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-2">{targetRole}</p>
                      <p className="text-sm text-gray-600">{roleDescription}</p>
                    </div>
                    <Button
                      onClick={handleChangeRole}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      Change Role
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Skills Overview */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-700">Skills Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{skillsStats.total}</p>
                      <p className="text-sm text-gray-600">Skills Added</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Beginner</span>
                        <span className="font-semibold text-gray-900">{skillsStats.beginner}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Intermediate</span>
                        <span className="font-semibold text-gray-900">{skillsStats.intermediate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Advanced</span>
                        <span className="font-semibold text-gray-900">{skillsStats.advanced}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Row: Skill Radar, Gap Summary, Next Actions */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* 4. Skill Radar Chart */}
              <Card className="shadow-lg border-0 col-span-1">
                <CardHeader>
                  <CardTitle className="text-gray-700">Skill Radar</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Required vs Your Current Level</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {radarData.map((item) => (
                      <div key={item.skill}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                          <span className="text-xs text-gray-500">{item.current}%</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${item.current}%` }}
                            />
                          </div>
                          <div className="flex-1 bg-gray-100 h-2 rounded-full border border-dashed border-gray-300 overflow-hidden">
                            <div
                              className="bg-red-300 h-full rounded-full"
                              style={{ width: `${item.required}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Current</span>
                          <span>Required</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Actions Column */}
              <div className="space-y-6">
                {/* 5. Gap Summary */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-gray-700 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Skill Gap Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <span className="text-sm font-medium text-red-900">Missing Skills</span>
                        <span className="text-lg font-bold text-red-600">{skillGaps.missing}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <span className="text-sm font-medium text-yellow-900">Weak Skills</span>
                        <span className="text-lg font-bold text-yellow-600">{skillGaps.weak}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">
                        Complete a skill analysis to identify missing skills for your target role.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 6. Next Recommended Actions */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-gray-700 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      Next Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {nextActions.length > 0 ? (
                        nextActions.map((action) => (
                          <div key={action.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                            <span className="text-xl">{action.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900 truncate">{action.skill}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">
                                  {action.type}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  action.priority === 'High'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {action.priority}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">Complete a skill analysis to see recommendations</p>
                          <Button 
                            onClick={() => navigate('/skill-analysis')} 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                          >
                            Start Analysis
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Row: Progress Over Time */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {/* 7. Learning Progress Over Time */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-700">Progress Over Time</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Your readiness score trend</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end justify-between gap-2 h-32">
                      {progressData.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="relative w-full h-24 flex items-end justify-center mb-2">
                            <div
                              className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-blue-500"
                              style={{ height: `${(data.readiness / 100) * 100}%` }}
                              title={`${data.readiness}%`}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{data.week}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Starting Score</p>
                        <p className="text-lg font-bold text-gray-900">{progressData[0].readiness}%</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Current Score</p>
                        <p className="text-lg font-bold text-blue-600">{progressData[progressData.length - 1].readiness}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 8. Explainability Panel */}
            {readinessScore > 0 && (
              <Card className="shadow-lg border-0 border-l-4 border-l-green-500 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Achievement Unlocked! 🎉</p>
                      <p className="text-sm text-green-800 mt-1">
                        Your readiness increased by <span className="font-bold">12%</span> after completing the SQL for Healthcare course. Keep it up!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

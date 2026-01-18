import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Target, Briefcase, DollarSign, TrendingUp as Growth, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import useAuthStore from '../../store/authStore';
import { api } from '../../api/apiClient';
import toast from 'react-hot-toast';

const CareerPathway = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('career-pathway');
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareerAnalysis();
  }, []);

  const fetchCareerAnalysis = async () => {
    try {
      const response = await api.getUserCareerAnalyses();
      if (response.data.analyses.length > 0) {
        setCareerAnalysis(response.data.analyses[0]);
      }
    } catch (error) {
      console.error('Error fetching career analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skills-profile', label: 'Skills & Profile', icon: User },
    { id: 'skill-analysis', label: 'Skill Analysis', icon: BookOpen },
    { id: 'career-pathway', label: 'Career Pathway', icon: Target },
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
    } else if (itemId === 'career-pathway') {
      navigate('/career-pathway');
    } else {
      setActiveSection(itemId);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading career analysis...</p>
      </div>
    </div>;
  }

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
            <h2 className="text-2xl font-bold text-gray-900">Career Pathway</h2>
            <p className="text-sm text-gray-600">Explore your healthcare career journey and market insights</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {!careerAnalysis ? (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Career Analysis Available</h3>
                <p className="text-gray-600 mb-6">Complete a skill analysis to see your career pathway insights</p>
                <Button onClick={() => navigate('/skill-analysis')} className="enhanced-button">
                  Start Career Analysis
                </Button>
              </div>
            ) : (
              <>
                {/* Career Overview */}
                <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Career Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Target Role</p>
                        <p className="text-xl font-bold text-gray-900 mt-2">{careerAnalysis.targetRole}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Current Level</p>
                        <p className="text-lg font-semibold text-blue-600 mt-2">{careerAnalysis.careerPath?.currentLevel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Time to Goal</p>
                        <p className="text-lg font-semibold text-green-600 mt-2">{careerAnalysis.careerPath?.estimatedTimeToGoal}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Analysis */}
                <Card className="shadow-lg border-0 mb-8">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      Market Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900">Salary Range</span>
                          </div>
                          <span className="font-bold text-green-600">
                            ${careerAnalysis.marketAnalysis?.salaryRange?.min?.toLocaleString()} - ${careerAnalysis.marketAnalysis?.salaryRange?.max?.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Growth className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900">Job Growth</span>
                          </div>
                          <span className="font-bold text-blue-600">{careerAnalysis.marketAnalysis?.jobGrowth}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Top Employers
                        </h4>
                        <div className="space-y-2">
                          {careerAnalysis.marketAnalysis?.topEmployers?.map((employer, index) => (
                            <div key={index} className="p-2 bg-gray-50 rounded text-sm font-medium text-gray-700">
                              {employer}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Career Milestones */}
                <Card className="shadow-lg border-0 mb-8">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Map className="h-5 w-5 text-purple-600" />
                      Career Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {careerAnalysis.careerPath?.milestones?.map((milestone, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded font-medium">
                                <Clock className="inline h-3 w-3 mr-1" />
                                {milestone.timeframe}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {milestone.requiredSkills?.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="shadow-lg border-0 mb-8">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-600" />
                      Career Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Immediate Actions</h4>
                        <div className="space-y-2">
                          {careerAnalysis.recommendations?.immediateActions?.map((action, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                              <CheckCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Recommended Certifications</h4>
                        <div className="space-y-2">
                          {careerAnalysis.recommendations?.certifications?.map((cert, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                              <Award className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => navigate('/learning-path')} className="enhanced-button">
                    View Learning Path
                  </Button>
                  <Button onClick={() => navigate('/skill-analysis')} variant="outline">
                    Update Analysis
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathway;
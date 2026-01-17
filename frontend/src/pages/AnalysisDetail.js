import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Lightbulb, Map, CheckCircle, AlertTriangle, FileText, Award, LogOut, LayoutDashboard, User, BookOpen, TrendingUp, BarChart3, Settings, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user, logout } = useAuthStore();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const response = await apiClient.get(`/analysis/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setAnalysis(response.data.analysis);
      }
    } catch (error) {
      toast.error('Failed to fetch analysis');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
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
    { id: 'learning-path', label: 'Learning Path', icon: Map },
    { id: 'progress-tracking', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'insights-reports', label: 'Insights & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === 'dashboard') {
      navigate('/dashboard-main');
    } else if (itemId === 'skill-analysis') {
      navigate('/dashboard');
    } else {
      setActiveSection(itemId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 panel-divider flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                🏥 HealthCare+
              </h1>
              <p className="text-xs text-gray-500 mt-1">Skill Analysis System</p>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
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
              <h2 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto py-8 px-8 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading analysis...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 panel-divider flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                🏥 HealthCare+
              </h1>
              <p className="text-xs text-gray-500 mt-1">Skill Analysis System</p>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
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
              <h2 className="text-xl font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto py-8 px-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-600">Analysis not found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
            <p className="text-xs text-gray-500 mt-1">Skill Analysis System</p>
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
          <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Analysis Details
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-slate-600 hover:text-slate-900 p-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* Analysis Header */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {analysis.role}
                </CardTitle>
                <p className="text-blue-100">Healthcare Domain</p>
              </div>
              <div className="text-right">
                {analysis.status === 'completed' && analysis.analysisResult && (
                  <div className="flex items-center space-x-2">
                    <Award className="h-8 w-8 text-yellow-300" />
                    <div>
                      <div className="text-3xl font-bold">
                        {analysis.analysisResult.readinessScore}%
                      </div>
                      <p className="text-sm text-blue-100">Readiness Score</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Skills Section */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Analyzed Skills ({analysis.skills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Data */}
        {analysis.documentData && (
          <Card className="mb-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-slate-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Extracted Document Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-slate-700 leading-relaxed">
                  {analysis.documentData}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysis.status === 'completed' && analysis.analysisResult && (
          <>
            {/* Skill Gaps */}
            {analysis.analysisResult.skillGaps && analysis.analysisResult.skillGaps.length > 0 && (
              <Card className="mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-red-600" />
                    Skill Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.analysisResult.skillGaps.map((gap, index) => (
                      <div key={index} className="flex items-start p-4 bg-red-50 rounded-lg border border-red-200">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-red-800 font-medium">{gap}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {analysis.analysisResult.recommendations && analysis.analysisResult.recommendations.length > 0 && (
              <Card className="mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800 font-medium">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Roadmap */}
            {analysis.analysisResult.roadmap && analysis.analysisResult.roadmap.length > 0 && (
              <Card className="mb-6 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center">
                    <Map className="h-5 w-5 mr-2 text-purple-600" />
                    Learning Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.analysisResult.roadmap.map((step, index) => (
                      <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-blue-800 font-medium leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Processing State */}
        {analysis.status === 'processing' && (
          <Card className="shadow-lg border-0">
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">Analysis in progress...</p>
            </CardContent>
          </Card>
        )}

        {/* Failed State */}
        {analysis.status === 'failed' && (
          <Card className="shadow-lg border-0">
            <CardContent className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-medium">Analysis failed. Please try again.</p>
            </CardContent>
          </Card>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetail;
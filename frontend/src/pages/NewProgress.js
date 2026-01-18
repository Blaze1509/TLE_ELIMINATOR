import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, CheckCircle, Circle, Clock, Star, ExternalLink, X, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const NewProgress = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('progress-tracking');
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchCareerAnalysis();
  }, []);

  const fetchCareerAnalysis = async () => {
    try {
      const response = await fetch('/api/career-analysis/latest', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCareerAnalysis(data.analysis);
      }
    } catch (error) {
      console.error('Failed to fetch career analysis:', error);
      toast.error('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkCompleted = async (skillId) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/career-analysis/skill/${skillId}/complete`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        toast.success('Skill marked as completed!');
        fetchCareerAnalysis();
        setSelectedSkill(null);
      }
    } catch (error) {
      toast.error('Failed to update skill status');
    } finally {
      setIsUpdating(false);
    }
  };

  const calculateProgress = () => {
    if (!careerAnalysis?.skill_gap) return 0;
    const completed = careerAnalysis.skill_gap.filter(skill => skill.completed).length;
    return Math.round((completed / careerAnalysis.skill_gap.length) * 100);
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'critical': return 'text-red-500 bg-red-50 border-red-200';
      case 'important': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'nice-to-have': return 'text-blue-500 bg-blue-50 border-blue-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
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

  const handleMenuClick = (itemId) => {
    if (itemId === 'dashboard') navigate('/dashboard-main');
    else if (itemId === 'skills-profile') navigate('/skills-profile');
    else if (itemId === 'learning-path') navigate('/learning-path');
    else if (itemId === 'progress-tracking') navigate('/new-progress');
    else if (itemId === 'skill-analysis') navigate('/skill-analysis');
    else if (itemId === 'insights-reports') navigate('/insights-reports');
    else setActiveSection(itemId);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        
        {/* Sidebar */}
        <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          <div className="p-6 border-b border-zinc-800">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Activity className="h-6 w-6 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Career Synapse
              </span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1 pl-8">Progress Tracking</p>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border ${
                        isActive
                          ? 'bg-cyan-950/30 text-cyan-400 border-cyan-900/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                          : 'text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-zinc-800 p-4 space-y-3 bg-zinc-900/50">
            <div className="px-4 py-3 bg-black/40 rounded-lg border border-zinc-800">
              <p className="text-xs text-zinc-500 mb-1">Logged in as</p>
              <p className="text-sm font-semibold text-white truncate">
                {user?.username || 'User'}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-400 hover:bg-red-900/40 border border-red-900/30"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-black overflow-hidden">
          <div className="bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Progress Tracking</h2>
              <p className="text-sm text-zinc-400">Track your learning journey</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            
            {/* Progress Overview */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cyan-400" /> Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-zinc-800"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                        className="text-cyan-400 transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{progress}%</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Learning Progress</h3>
                    <p className="text-zinc-400 mb-4">
                      {careerAnalysis?.skill_gap?.filter(s => s.completed).length || 0} of {careerAnalysis?.skill_gap?.length || 0} skills completed
                    </p>
                    <div className="w-full bg-zinc-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            {careerAnalysis?.skill_gap && (
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Map className="h-5 w-5 text-cyan-400" /> Learning Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-700"></div>
                    
                    {/* Timeline Items */}
                    <div className="space-y-8">
                      {careerAnalysis.skill_gap.map((skill, index) => (
                        <div key={skill._id || index} className="relative flex items-start gap-6">
                          {/* Timeline Dot */}
                          <button
                            onClick={() => setSelectedSkill(skill)}
                            className={`relative z-10 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${
                              skill.completed
                                ? 'bg-cyan-500 border-cyan-400 text-white'
                                : 'bg-zinc-800 border-zinc-600 text-zinc-400 hover:border-cyan-500'
                            }`}
                          >
                            {skill.completed ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </button>
                          
                          {/* Timeline Content */}
                          <div className="flex-1 pb-8">
                            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-white">{skill.skill_name}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium border ${getImportanceColor(skill.importance)}`}>
                                  {skill.importance}
                                </span>
                              </div>
                              <p className="text-sm text-zinc-400">
                                {skill.completed ? 'Completed' : 'Click to view resources and mark as complete'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{selectedSkill.skill_name}</h2>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getImportanceColor(selectedSkill.importance)}`}>
                  {selectedSkill.importance}
                </span>
                {selectedSkill.completed && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-950/40 text-green-400 border border-green-900/50">
                    Completed
                  </span>
                )}
              </div>

              {/* Resources */}
              {selectedSkill.resources && selectedSkill.resources.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recommended Resources</h3>
                  <div className="space-y-3">
                    {selectedSkill.resources.map((resource, index) => (
                      <div key={index} className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white">{resource.title}</h4>
                          <span className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-300">
                            {resource.type}
                          </span>
                        </div>
                        {resource.author && (
                          <p className="text-sm text-zinc-400 mb-2">by {resource.author}</p>
                        )}
                        {resource.description && (
                          <p className="text-sm text-zinc-300 mb-3">{resource.description}</p>
                        )}
                        {resource.difficulty && (
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-zinc-400">Difficulty: {resource.difficulty}</span>
                          </div>
                        )}
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open Resource
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {!selectedSkill.completed && (
                <Button
                  onClick={() => handleMarkCompleted(selectedSkill._id)}
                  disabled={isUpdating}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProgress;
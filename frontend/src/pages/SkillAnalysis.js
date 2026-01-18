import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, AlertCircle, Check, X, Target, Zap, TrendingDown, Award, Lightbulb, ArrowUp, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

import useAuthStore from '../store/authStore';
import { api } from '../api/apiClient';
import toast from 'react-hot-toast';

const SkillAnalysis = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('missing');
  const [activeSection, setActiveSection] = useState('skill-analysis');
  const [loading, setLoading] = useState(true);
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [userSkills, setUserSkills] = useState([]);

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
      } else {
        toast.error('No analysis data found. Please complete your profile first.');
      }
    } catch (error) {
      console.error('Failed to fetch career analysis:', error);
      toast.error('Failed to load analysis data');
    } finally {
      setLoading(false);
    }
  };

  // Get data from backend or show message if not available
  const readinessData = careerAnalysis ? {
    role: careerAnalysis.career_goal || 'Not specified',
    overallReadiness: careerAnalysis.readiness_score || (careerAnalysis.gap_percentage ? (100 - careerAnalysis.gap_percentage) : 0),
    level: careerAnalysis.readiness_score ? 
      (careerAnalysis.readiness_score >= 80 ? 'Expert-ready' : 
       careerAnalysis.readiness_score >= 60 ? 'Advanced-ready' : 
       careerAnalysis.readiness_score >= 40 ? 'Intermediate-ready' : 'Beginner-ready') : 'Not assessed',
    requiredSkillsCovered: careerAnalysis.skill_gap ? careerAnalysis.skill_gap.filter(s => s.completed).length : 0,
    totalRequiredSkills: careerAnalysis.skill_gap ? careerAnalysis.skill_gap.length : 0,
    lastUpdated: careerAnalysis.updatedAt ? new Date(careerAnalysis.updatedAt).toLocaleDateString() : 'N/A',
    gapPercentage: careerAnalysis.gap_percentage || 0
  } : null;

  // Get missing skills (completed: false)
  const missingSkills = careerAnalysis?.skill_gap?.filter(skill => !skill.completed) || [];

  // Get strong skills (completed: true + user input skills)
  const completedSkills = careerAnalysis?.skill_gap?.filter(skill => skill.completed) || [];
  const additionalSkills = careerAnalysis?.additional_skills || [];
  const strongSkills = [...completedSkills, ...additionalSkills.map(skill => ({ skill_name: skill, completed: true }))];

  // Get next two skills for recommendations
  const recommendedActions = missingSkills.slice(0, 2).map((skill, index) => ({
    rank: index + 1,
    skill: skill.skill_name,
    reason: `${skill.importance} priority skill`,
    course: `${skill.skill_name} Training`,
    duration: '8-12h',
    priority: skill.importance
  }));

  const historicalData = [
    { date: 'Dec 15', readiness: 35 },
    { date: 'Jan 01', readiness: 42 },
    { date: 'Jan 15', readiness: 52 }
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
    { id: 'insights-reports', label: 'Insights & Reports', icon: BarChart3 }
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === 'dashboard') navigate('/dashboard-main');
    else if (itemId === 'skills-profile') navigate('/skills-profile');
    else if (itemId === 'skill-analysis') navigate('/skill-analysis');
    else if (itemId === 'learning-path') navigate('/learning-path');
    else if (itemId === 'progress-tracking') navigate('/progress-tracking');
    else if (itemId === 'insights-reports') navigate('/insights-reports');
    else setActiveSection(itemId);
  };

  const getReadinessColor = (readiness) => {
    if (readiness >= 80) return 'text-green-400';
    if (readiness >= 60) return 'text-blue-400';
    return 'text-cyan-400';
  };

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
            <p className="text-xs text-zinc-500 mt-1 pl-8">Skill Intelligence</p>
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
                {user?.username || user?.email || 'User'}
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
              <h2 className="text-2xl font-bold text-white tracking-tight">Skill Analysis</h2>
              <p className="text-sm text-zinc-400">Deep dive into your capability gaps and strengths</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            {/* 1. Career Readiness Overview */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Career Readiness Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {readinessData ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Target Role</p>
                        <p className="text-lg font-bold text-white mt-1">{readinessData.role}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Overall Readiness</p>
                        <p className={`text-3xl font-bold mt-1 ${getReadinessColor(readinessData.overallReadiness)}`}>
                          {readinessData.overallReadiness}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Readiness Level</p>
                        <p className="text-lg font-semibold text-zinc-200 mt-1">{readinessData.level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Skills Coverage</p>
                        <p className="text-lg font-semibold text-zinc-200 mt-1">
                          {readinessData.requiredSkillsCovered} <span className="text-zinc-500">/</span> {readinessData.totalRequiredSkills}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden border border-zinc-700">
                        <div
                          className={`h-full rounded-full transition-all shadow-[0_0_10px_rgba(34,211,238,0.3)] ${
                            readinessData.overallReadiness >= 80 ? 'bg-green-500' : 
                            readinessData.overallReadiness >= 60 ? 'bg-blue-500' : 'bg-cyan-500'
                          }`}
                          style={{ width: `${readinessData.overallReadiness}%` }}
                        />
                      </div>
                      <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        Last updated: {readinessData.lastUpdated}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400 mb-2">No career analysis data available</p>
                    <p className="text-sm text-zinc-500">Please complete your profile and submit for analysis first.</p>
                    <Button
                      onClick={() => navigate('/skills-profile')}
                      className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      Complete Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 2. Skill Gap Tabs */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100">Skill Analysis by Category</CardTitle>
                {/* Tabs */}
                <div className="flex gap-1 mt-6 border-b border-zinc-800">
                  <button
                    onClick={() => setActiveTab('missing')}
                    className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                      activeTab === 'missing'
                        ? 'border-red-500 text-red-400 bg-red-950/10'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <X className="inline h-4 w-4 mr-2" />
                    Missing Skills ({missingSkills.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('strong')}
                    className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                      activeTab === 'strong'
                        ? 'border-green-500 text-green-400 bg-green-950/10'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <Check className="inline h-4 w-4 mr-2" />
                    Strong Skills ({strongSkills.length})
                  </button>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Missing Skills Tab */}
                {activeTab === 'missing' && (
                  <div className="space-y-4">
                    {missingSkills.length > 0 ? (
                      missingSkills.map((skill, index) => (
                        <div key={skill._id || index} className="p-4 bg-red-950/10 rounded-lg border border-red-900/30 hover:border-red-800/50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-red-200">{skill.skill_name}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-red-900/40 text-red-300 rounded border border-red-900/50">Healthcare</span>
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">{skill.importance}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-zinc-400 mb-4 border-l-2 border-red-900/50 pl-3">Required skill for your target role</p>
                          {skill.resources && skill.resources.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs text-zinc-500 font-semibold">Learning Resources:</p>
                              {skill.resources.slice(0, 2).map((resource, idx) => (
                                <div key={idx} className="text-xs text-cyan-400 hover:underline cursor-pointer">
                                  • {resource.title} ({resource.type})
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <p className="text-zinc-400 mb-2">No missing skills detected</p>
                        <p className="text-sm text-zinc-500">Great job! You have all required skills.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Strong Skills Tab */}
                {activeTab === 'strong' && (
                  <div className="space-y-4">
                    {strongSkills.length > 0 ? (
                      strongSkills.map((skill, index) => (
                        <div key={skill._id || index} className="p-4 bg-green-950/10 rounded-lg border border-green-900/30 hover:border-green-800/50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-green-200 flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                {skill.skill_name || skill}
                              </h4>
                              <p className="text-xs text-zinc-400 mt-1">Status: <span className="font-semibold text-green-400">Completed</span></p>
                            </div>
                          </div>
                          <div className="p-3 bg-zinc-950 rounded border border-zinc-800 flex justify-between items-center">
                            <p className="text-xs text-zinc-400"><span className="font-semibold text-zinc-300">Source:</span> {skill.completed ? 'Analysis Result' : 'User Profile'}</p>
                            <span className="text-xs text-green-500 flex items-center gap-1"><Award className="w-3 h-3" /> Verified</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                        <p className="text-zinc-400 mb-2">No strong skills identified</p>
                        <p className="text-sm text-zinc-500">Complete your profile to see your strengths.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 5. Recommended Skill Actions */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <ArrowUp className="h-5 w-5 text-green-500" />
                  Next Best Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedActions.length > 0 ? (
                    recommendedActions.map((action) => (
                      <div
                        key={action.rank}
                        className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-900 border border-zinc-800 rounded-lg hover:border-green-500/30 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/30 text-green-400 font-bold text-sm border border-green-500/30 flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                            {action.rank}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-sm">{action.skill}</h4>
                            <p className="text-xs text-zinc-400 mt-1">{action.reason}</p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="text-xs text-zinc-500 flex items-center gap-2">
                                <span>Course: <span className="text-cyan-400 hover:underline cursor-pointer">{action.course}</span></span>
                                <span className="text-zinc-600">•</span>
                                <span>{action.duration}</span>
                              </div>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                                action.priority === 'critical'
                                  ? 'bg-red-950/30 text-red-400 border-red-900/50'
                                  : action.priority === 'important' 
                                  ? 'bg-orange-950/30 text-orange-400 border-orange-900/50'
                                  : 'bg-blue-950/30 text-blue-400 border-blue-900/50'
                              }`}>
                                {action.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <p className="text-zinc-400 mb-2">No immediate actions needed</p>
                      <p className="text-sm text-zinc-500">You're on track with your learning goals!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;
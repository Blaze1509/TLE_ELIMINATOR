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
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('missing');
  const [activeSection, setActiveSection] = useState('skill-analysis');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Sample Data for Visualization
  const readinessData = {
    role: 'Health Informatics Engineer',
    overallReadiness: 52,
    level: 'Beginner-ready',
    requiredSkillsCovered: 4,
    totalRequiredSkills: 11,
    lastUpdated: '2025-01-15'
  };

  const missingSkills = [
    { id: 1, name: 'HL7 Standards', category: 'Technical', importance: 'Critical', impactOnReadiness: '-15%', whyMatters: 'Essential for clinical data exchange protocols.', estimatedLearnTime: '15h' },
    { id: 2, name: 'FHIR API', category: 'Technical', importance: 'High', impactOnReadiness: '-12%', whyMatters: 'Modern standard for healthcare interoperability.', estimatedLearnTime: '10h' }
  ];

  const weakSkills = [
    { id: 3, name: 'Python for Data', currentLevel: 'Beginner', currentProficiency: 40, requiredLevel: 'Intermediate', requiredProficiency: 70, gap: 30, recommendedImprovement: 'Focus on pandas and NumPy libraries.', whyMatters: 'Required for data analysis scripts.' }
  ];

  const strongSkills = [
    { id: 4, name: 'Medical Terminology', level: 'Advanced', proficiency: 95, requiredProficiency: 60, evidence: 'Certified Professional', certificateLink: 'Verified' }
  ];

  const skillImportance = [
    { skill: 'HL7 Standards', importance: 90, userLevel: 0 },
    { skill: 'Python', importance: 70, userLevel: 40 },
    { skill: 'Med Terminology', importance: 50, userLevel: 95 }
  ];

  const aiExplanations = [
    { id: 1, title: 'Why HL7 is Critical', explanation: '85% of job postings for this role require HL7 v2 or v3 knowledge. Your lack of this skill is the primary drag on your readiness score.', relatedSkill: 'HL7 Standards' },
    { id: 2, title: 'Python Proficiency Gap', explanation: 'While you know basic syntax, the role requires data manipulation capabilities which you haven\'t demonstrated yet.', relatedSkill: 'Python' }
  ];

  const recommendedActions = [
    { rank: 1, skill: 'HL7 Standards', reason: 'High impact gap', course: 'HL7 Fundamentals', duration: '5h', priority: 'Critical' },
    { rank: 2, skill: 'Python', reason: 'Quick win to improve score', course: 'Data Science with Python', duration: '12h', priority: 'High' }
  ];

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
    { id: 'insights-reports', label: 'Insights & Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
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
                    Calculation: Coverage (40%) + Proficiency Match (35%) + Skill Importance Weights (25%)
                  </p>
                </div>
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
                    onClick={() => setActiveTab('weak')}
                    className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                      activeTab === 'weak'
                        ? 'border-yellow-500 text-yellow-400 bg-yellow-950/10'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <TrendingDown className="inline h-4 w-4 mr-2" />
                    Weak Skills ({weakSkills.length})
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
                      missingSkills.map((skill) => (
                        <div key={skill.id} className="p-4 bg-red-950/10 rounded-lg border border-red-900/30 hover:border-red-800/50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-red-200">{skill.name}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-red-900/40 text-red-300 rounded border border-red-900/50">{skill.category}</span>
                                <span className="text-[10px] uppercase font-bold px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">{skill.importance}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-red-400">{skill.impactOnReadiness}</p>
                              <p className="text-[10px] text-red-300/60 uppercase tracking-wide">readiness impact</p>
                            </div>
                          </div>
                          <p className="text-sm text-zinc-400 mb-4 border-l-2 border-red-900/50 pl-3">{skill.whyMatters}</p>
                          <div className="flex items-center justify-between pt-3 border-t border-red-900/20">
                            <span className="text-xs text-zinc-500">Est. time: <span className="text-zinc-300">{skill.estimatedLearnTime}</span></span>
                            <Button
                              onClick={() => navigate('/learning-path')}
                              size="sm"
                              className="bg-red-900/30 text-red-300 hover:bg-red-900/50 border border-red-900/50 h-8 text-xs"
                            >
                              Learn This Skill
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                        <p className="text-zinc-400 mb-2">No missing skills detected</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Weak Skills Tab */}
                {activeTab === 'weak' && (
                  <div className="space-y-4">
                    {weakSkills.map((skill) => (
                      <div key={skill.id} className="p-4 bg-yellow-950/10 rounded-lg border border-yellow-900/30 hover:border-yellow-800/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-yellow-200">{skill.name}</h4>
                            <p className="text-xs text-zinc-400 mt-1">{skill.whyMatters}</p>
                          </div>
                          <span className="text-sm font-bold text-yellow-500 bg-yellow-950/30 px-2 py-1 rounded border border-yellow-900/50">Gap: {skill.gap}%</span>
                        </div>

                        {/* Level comparison */}
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Current: {skill.currentLevel}</p>
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-yellow-600 h-full" style={{ width: `${skill.currentProficiency}%` }} />
                            </div>
                            <p className="text-xs text-yellow-600 mt-1 font-mono">{skill.currentProficiency}%</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Required: {skill.requiredLevel}</p>
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full" style={{ width: `${skill.requiredProficiency}%` }} />
                            </div>
                            <p className="text-xs text-red-500 mt-1 font-mono">{skill.requiredProficiency}%</p>
                          </div>
                        </div>

                        <div className="p-3 bg-yellow-950/20 rounded border border-yellow-900/30 mt-3">
                            <p className="text-xs text-yellow-200/80 flex gap-2">
                                <Zap className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                {skill.recommendedImprovement}
                            </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Strong Skills Tab */}
                {activeTab === 'strong' && (
                  <div className="space-y-4">
                    {strongSkills.map((skill) => (
                      <div key={skill.id} className="p-4 bg-green-950/10 rounded-lg border border-green-900/30 hover:border-green-800/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-green-200 flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              {skill.name}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-1">Level: <span className="font-semibold text-green-400">{skill.level}</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-500">{skill.proficiency}%</p>
                            <p className="text-[10px] text-green-400/60 font-semibold uppercase">Exceeds Req.</p>
                          </div>
                        </div>

                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-3">
                          <div className="bg-green-500 h-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" style={{ width: `${skill.proficiency}%` }} />
                        </div>

                        <div className="p-3 bg-zinc-950 rounded border border-zinc-800 flex justify-between items-center">
                          <p className="text-xs text-zinc-400"><span className="font-semibold text-zinc-300">Evidence:</span> {skill.evidence}</p>
                          <span className="text-xs text-green-500 flex items-center gap-1"><Award className="w-3 h-3" /> Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 3. Skill Importance Breakdown */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  Skill Importance Breakdown
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Weightage of skills in your target role</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillImportance.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-32">
                        <p className="text-xs font-semibold text-zinc-300 truncate">{item.skill}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 h-8 items-center">
                          {/* Importance bar */}
                          <div className="flex-1 bg-zinc-800 rounded h-4 relative overflow-hidden">
                            <div
                              className="bg-cyan-600 h-full rounded transition-all"
                              style={{ width: `${item.importance}%` }}
                            />
                            <span className="absolute right-2 top-0 text-[10px] font-bold text-zinc-400 leading-4">
                              {item.importance}% Imp.
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* User level */}
                      <div className="w-16">
                        <div className="text-right">
                          <div className={`text-xs font-bold ${item.userLevel === 0 ? 'text-red-400' : item.userLevel < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {item.userLevel}%
                          </div>
                          <div className="text-[10px] text-zinc-600 uppercase">Your Lvl</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 4. AI Explanation Panel */}
            <Card className="bg-purple-950/10 border border-purple-900/30 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-purple-200 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-400" />
                  AI Explainability Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiExplanations.map((item) => (
                    <div key={item.id} className="p-4 bg-zinc-900/80 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <h4 className="font-semibold text-purple-300 mb-2 text-sm">{item.title}</h4>
                      <p className="text-sm text-zinc-300 mb-3 leading-relaxed">{item.explanation}</p>
                      <div className="text-xs text-purple-400 font-mono bg-purple-950/30 inline-block px-2 py-1 rounded border border-purple-900/50">
                        → {item.relatedSkill}
                      </div>
                    </div>
                  ))}
                </div>
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
                  {recommendedActions.map((action) => (
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
                              action.priority === 'Critical'
                                ? 'bg-red-950/30 text-red-400 border-red-900/50'
                                : 'bg-orange-950/30 text-orange-400 border-orange-900/50'
                            }`}>
                              {action.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 6. Historical Comparison */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cyan-500" />
                  Readiness Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                      <div className="w-20">
                        <p className="text-xs font-semibold text-zinc-400">{data.date}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1">
                          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-cyan-600 h-full rounded-full shadow-[0_0_8px_rgba(8,145,178,0.4)]"
                              style={{ width: `${data.readiness}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-bold text-cyan-400 w-10 text-right">{data.readiness}%</div>
                      </div>
                      {index > 0 && (
                        <div className="text-xs font-bold text-green-500 w-12 text-right">
                          +{data.readiness - historicalData[index - 1].readiness}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button
                onClick={() => navigate('/learning-path')}
                className="bg-white text-black hover:bg-zinc-200 font-bold py-6"
              >
                <Map className="w-4 h-4 mr-2" />
                Create Learning Path
              </Button>
              <Button
                onClick={() => toast.info('Export feature coming soon!')}
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white py-6"
              >
                Export Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;
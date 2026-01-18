import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, ArrowRight, AlertCircle, CheckCircle, Zap, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  // Real data from career analysis
  const readinessScore = careerAnalysis ? 
    (careerAnalysis.readiness_score || (100 - careerAnalysis.gap_percentage)) : 0;
  const targetRole = careerAnalysis?.career_goal || 'Health Informatics Engineer';
  const roleDescription = 'Design healthcare IT systems with FHIR, HL7, and HIPAA compliance';
  
  const skillsStats = {
    total: careerAnalysis?.skill_gap?.length || 0,
    completed: careerAnalysis?.skill_gap?.filter(s => s.completed).length || 0,
    pending: careerAnalysis?.skill_gap?.filter(s => !s.completed).length || 0
  };

  const skillGaps = {
    missing: careerAnalysis?.skill_gap?.filter(s => !s.completed).length || 0,
    weak: careerAnalysis?.skill_gap?.filter(s => s.importance === 'critical' && !s.completed).length || 0
  };

  const radarData = careerAnalysis?.skill_gap?.slice(0, 5).map(skill => ({
    skill: skill.skill_name,
    required: skill.importance === 'critical' ? 90 : skill.importance === 'important' ? 80 : 70,
    current: skill.completed ? 85 : 20
  })) || [
    { skill: 'FHIR', required: 90, current: 0 },
    { skill: 'HL7', required: 85, current: 0 },
    { skill: 'SQL', required: 80, current: 0 },
    { skill: 'HIPAA', required: 95, current: 0 },
    { skill: 'Data Analytics', required: 75, current: 0 }
  ];

  const nextActions = careerAnalysis?.skill_gap?.filter(s => !s.completed).slice(0, 3).map((skill, index) => ({
    id: index + 1,
    skill: skill.skill_name,
    type: 'Course',
    priority: skill.importance === 'critical' ? 'High' : 'Medium',
    icon: index === 0 ? '🎯' : index === 1 ? '📚' : '⚡'
  })) || [];

  const progressData = [
    { week: 'Week 1', readiness: Math.max(0, readinessScore - 30) },
    { week: 'Week 2', readiness: Math.max(0, readinessScore - 25) },
    { week: 'Week 3', readiness: Math.max(0, readinessScore - 20) },
    { week: 'Week 4', readiness: Math.max(0, readinessScore - 15) },
    { week: 'Week 5', readiness: Math.max(0, readinessScore - 10) },
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
    { id: 'insights-reports', label: 'Insights & Reports', icon: BarChart3 }
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
    navigate('/skills-profile');
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
              <h2 className="text-2xl font-bold text-white tracking-tight">Career Dashboard</h2>
              <p className="text-sm text-zinc-400">Your healthcare skill intelligence overview</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            
            {/* Top Row: Career Readiness, Target Role, Skills Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* 1. Career Readiness Score */}
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-zinc-100 flex items-center justify-between text-lg">
                    <span>Career Readiness</span>
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#27272a" // zinc-800
                          strokeWidth="8"
                        />
                        {/* Progress Circle with Gradient */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeDasharray={`${readinessScore * 2.83} 283`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
                            <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-white">{readinessScore}%</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Ready</span>
                      </div>
                    </div>
                    <p className="text-center text-sm text-zinc-400 mt-2 px-4">
                      {readinessScore === 0 ? (
                        <>Complete a <span className="text-cyan-400 font-medium">skill analysis</span> to calculate readiness.</>
                      ) : (
                        <>You are <span className="text-cyan-400 font-medium">moderately prepared</span> for {targetRole}.</>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Target Healthcare Role */}
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-zinc-100 text-lg">Target Role</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-4 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                      <p className="text-xl font-bold text-cyan-400 mb-2">{targetRole}</p>
                      <p className="text-sm text-zinc-400 leading-relaxed">{roleDescription}</p>
                    </div>
                  </div>
                  {/* BUTTON UPDATED: Consistent styling with other pages */}
                  <Button
                    onClick={handleChangeRole}
                    className="w-full text-sm bg-cyan-600 hover:bg-cyan-700 text-white border-0 font-medium"
                  >
                    Change Role
                  </Button>
                </CardContent>
              </Card>

              {/* 3. Skills Overview */}
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100 text-lg">Skills Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-baseline gap-2">
                      <p className="text-5xl font-bold text-white">{skillsStats.total}</p>
                      <p className="text-sm text-white font-medium">Total Skills Added</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-zinc-800/50 transition-colors">
                        <span className="text-zinc-400 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div> Courses Completed
                        </span>
                        <span className="font-mono text-white">{skillsStats.completed}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm p-2 rounded hover:bg-zinc-800/50 transition-colors">
                        <span className="text-zinc-400 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div> Courses Pending
                        </span>
                        <span className="font-mono text-white">{skillsStats.pending}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Row: Skill Radar, Gap Summary, Next Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* 4. Skill Radar Chart */}
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-zinc-100">Skill Radar</CardTitle>
                      <p className="text-xs text-zinc-500 mt-1">Required vs Current Proficiency</p>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        <span className="text-zinc-400">You</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                        <span className="text-zinc-400">Required</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {radarData.map((item) => (
                      <div key={item.skill}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-zinc-300">{item.skill}</span>
                          <span className="text-xs font-mono text-zinc-500">{item.current}% / {item.required}%</span>
                        </div>
                        <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                          {/* Required Marker (Background Bar) */}
                          <div 
                             className="absolute top-0 left-0 h-full bg-pink-900/30 border-r-2 border-pink-600 box-content opacity-60"
                             style={{ width: `${item.required}%` }}
                          />
                          {/* Current Value (Foreground Bar) */}
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                            style={{ width: `${item.current}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next Actions Column */}
              <div className="space-y-6">
                
                {/* 5. Gap Summary */}
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Skill Gap Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-red-950/20 rounded-lg border border-red-900/50">
                        <span className="text-sm font-medium text-red-200">Missing Skills</span>
                        <span className="text-xl font-bold text-red-500">{skillGaps.missing}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-yellow-950/20 rounded-lg border border-yellow-900/50">
                        <span className="text-sm font-medium text-yellow-200">Weak Skills</span>
                        <span className="text-xl font-bold text-yellow-500">{skillGaps.weak}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-2 text-center">
                        Based on your target role requirements.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 6. Next Recommended Actions */}
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 flex-1">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-cyan-400" />
                      Next Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {nextActions.length > 0 ? (
                        nextActions.map((action) => (
                          <div key={action.id} className="flex items-start gap-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-cyan-700/50 transition-colors group cursor-pointer"
                               onClick={() => navigate('/progress-tracking')}>
                            <span className="text-xl">{action.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-zinc-200 truncate group-hover:text-white">{action.skill}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-cyan-900/30 text-cyan-300 border border-cyan-900/50 rounded">
                                  {action.type}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded border ${
                                  action.priority === 'High'
                                    ? 'bg-red-900/30 text-red-300 border-red-900/50'
                                    : 'bg-yellow-900/30 text-yellow-300 border-yellow-900/50'
                                }`}>
                                  {action.priority}
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-sm text-zinc-500 mb-3">No actions generated yet.</p>
                          <Button 
                            onClick={() => navigate('/progress-tracking')} 
                            variant="outline" 
                            size="sm" 
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-cyan-500 bg-cyan-600 hover:bg-cyan-700 text-white border-0"
                          >
                            Start Progress Tracking
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
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100">Progress Over Time</CardTitle>
                  <p className="text-xs text-zinc-500 mt-1">Readiness score trend analysis</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end justify-between gap-2 h-40 pt-4 px-2">
                      {progressData.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center group">
                          <div className="relative w-full h-32 flex items-end justify-center mb-3 bg-zinc-950/50 rounded-lg">
                            <div
                              className="w-10 bg-gradient-to-t from-cyan-900 to-cyan-500 rounded-t shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 group-hover:from-cyan-800 group-hover:to-cyan-400"
                              style={{ height: `${(data.readiness / 100) * 100}%` }}
                            />
                            {/* Tooltip on hover */}
                            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-xs px-2 py-1 rounded">
                                {data.readiness}%
                            </div>
                          </div>
                          <span className="text-xs text-zinc-500 font-medium">{data.week}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-zinc-800 mt-2">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">Starting Score</p>
                        <p className="text-xl font-bold text-white">{progressData[0].readiness}%</p>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-8"></div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider">Current Score</p>
                        <p className="text-xl font-bold text-cyan-400">{progressData[progressData.length - 1].readiness}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 8. Achievement Panel */}
            {readinessScore > 0 && (
              <Card className="bg-emerald-950/10 border border-emerald-900/30 shadow-lg shadow-black/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-900/20 rounded-full border border-emerald-800/50">
                        <CheckCircle className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-400 text-lg">Great Progress!</p>
                      <p className="text-sm text-emerald-200/70 mt-1 leading-relaxed">
                        Your readiness score is <span className="font-bold text-white">{readinessScore}%</span>. 
                        {careerAnalysis?.skill_gap?.filter(s => s.completed).length > 0 && 
                          ` You've completed ${careerAnalysis.skill_gap.filter(s => s.completed).length} skills!`
                        } Keep pushing forward!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Footer / Copyright */}
            <div className="mt-8 text-center text-xs text-zinc-600 pb-4">
               © 2024 HealthCare+. All rights reserved.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
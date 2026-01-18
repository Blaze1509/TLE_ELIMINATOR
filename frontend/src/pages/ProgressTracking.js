import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Calendar, Trophy, Zap, Target, CheckCircle, Clock, ArrowUp, Activity, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import { api } from '../api/apiClient';
import toast from 'react-hot-toast';

const ProgressTracking = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('progress-tracking');
  const [loading, setLoading] = useState(true);

  // Sample Data for Visualization
  const progressOverview = {
    targetRole: 'Health Informatics Engineer',
    readinessPercentage: 68,
    readinessIncrease: 12,
    coursesCompleted: 4,
    coursesTotal: 7,
    skillsImproved: 3
  };

  const activityTimeline = [
    { id: 1, type: 'course-completed', title: 'Completed "HL7 Fundamentals"', description: 'Achieved 95% score on final assessment.', date: '2025-01-14', skillImpacted: 'HL7 Standards' },
    { id: 2, type: 'skill-upgraded', title: 'Skill Level Up: Python', description: 'Proficiency increased from Beginner to Intermediate.', date: '2025-01-10', skillImpacted: 'Python' },
    { id: 3, type: 'course-started', title: 'Started "FHIR for Developers"', description: 'Enrolled in 8-week specialization track.', date: '2025-01-05', skillImpacted: 'FHIR API' },
    { id: 4, type: 'skill-added', title: 'New Skill Added: HIPAA', description: 'Added to profile based on recent work experience.', date: '2024-12-28', skillImpacted: 'HIPAA Compliance' }
  ];

  const skillGrowth = [
    { skill: 'HL7 Standards', improvement: '+35%', progression: [{ stage: 'Start', level: 30 }, { stage: 'Current', level: 65 }] },
    { skill: 'Python', improvement: '+20%', progression: [{ stage: 'Start', level: 20 }, { stage: 'Current', level: 40 }] }
  ];

  const readinessTrend = [
    { week: 'W1', readiness: 30 },
    { week: 'W2', readiness: 32 },
    { week: 'W3', readiness: 35 },
    { week: 'W4', readiness: 35 },
    { week: 'W5', readiness: 42 },
    { week: 'W6', readiness: 48 },
    { week: 'W7', readiness: 50 },
    { week: 'W8', readiness: 55 },
    { week: 'W9', readiness: 62 },
    { week: 'W10', readiness: 68 }
  ];

  const courseTracking = [
    { id: 101, title: 'HL7 Fundamentals', status: 'completed', completionDate: '2025-01-14', platform: 'Coursera', skillImpacted: 'HL7 Standards' },
    { id: 102, title: 'Python for Health Data', status: 'in-progress', completionDate: null, platform: 'Udemy', skillImpacted: 'Python' },
    { id: 103, title: 'FHIR API Masterclass', status: 'not-started', completionDate: null, platform: 'Pluralsight', skillImpacted: 'FHIR' }
  ];

  const timeInsights = {
    avgHoursPerWeek: 5.2,
    consistencyScore: 88,
    weeksToReadiness: 4,
    learningStreak: 12
  };

  useEffect(() => {
    // Simulate API fetch
    setLoading(false);
  }, []);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'border-green-500/30 bg-green-950/20';
      case 'in-progress': return 'border-cyan-500/30 bg-cyan-950/20';
      case 'not-started': return 'border-zinc-700 bg-zinc-900/50';
      default: return 'border-zinc-800 bg-zinc-900';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-cyan-400" />;
      case 'not-started': return <Calendar className="h-4 w-4 text-zinc-500" />;
      default: return null;
    }
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'course-completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'skill-upgraded': return <ArrowUp className="h-4 w-4 text-cyan-400" />;
      case 'course-started': return <PlayCircle className="h-4 w-4 text-yellow-400" />;
      case 'skill-added': return <Zap className="h-4 w-4 text-purple-400" />;
      default: return <Trophy className="h-4 w-4 text-zinc-400" />;
    }
  };

  const chartHeight = 200;
  const chartWidth = 600;

  // Generate SVG line chart for readiness trend
  const generatePath = () => {
    const padding = 40;
    const effectiveWidth = chartWidth - padding * 2;
    const effectiveHeight = chartHeight - padding * 2;
    
    let path = `M ${padding + (0 * effectiveWidth) / (readinessTrend.length - 1)} ${
      padding + effectiveHeight - (readinessTrend[0].readiness / 100) * effectiveHeight
    }`;

    for (let i = 1; i < readinessTrend.length; i++) {
      const x = padding + (i * effectiveWidth) / (readinessTrend.length - 1);
      const y = padding + effectiveHeight - (readinessTrend[i].readiness / 100) * effectiveHeight;
      path += ` L ${x} ${y}`;
    }

    return path;
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
              <h2 className="text-2xl font-bold text-white tracking-tight">Progress Tracking</h2>
              <p className="text-sm text-zinc-400">Monitor your learning velocity and career readiness evolution</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            
            {/* Progress Overview */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Target Role</p>
                    <p className="text-sm font-semibold text-white mt-2">{progressOverview.targetRole}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Readiness</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="text-2xl font-bold text-green-400">{progressOverview.readinessPercentage}%</p>
                      <span className="text-xs font-semibold text-green-500 flex items-center gap-1 bg-green-950/30 px-1.5 py-0.5 rounded">
                        <ArrowUp className="h-3 w-3" />
                        {progressOverview.readinessIncrease}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Courses</p>
                    <p className="text-lg font-bold text-white mt-2">
                      {progressOverview.coursesCompleted} <span className="text-zinc-500 text-sm">/ {progressOverview.coursesTotal}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Skills Improved</p>
                    <p className="text-lg font-bold text-cyan-400 mt-2">+{progressOverview.skillsImproved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Learning Streak</p>
                    <p className="text-lg font-bold text-purple-400 mt-2">{timeInsights.learningStreak} days 🔥</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              
              {/* Learning Activity Timeline */}
              <div className="col-span-1">
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 h-full">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2 text-base">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityTimeline.map((activity, index) => (
                        <div key={activity.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="p-2 rounded-full bg-zinc-800 border border-zinc-700">
                              {getTimelineIcon(activity.type)}
                            </div>
                            {index < activityTimeline.length - 1 && (
                              <div className="w-0.5 h-full bg-zinc-800 mt-2 min-h-[20px]" />
                            )}
                          </div>
                          <div className="flex-1 pt-1 pb-4">
                            <p className="text-xs font-bold text-zinc-200">{activity.title}</p>
                            <p className="text-xs text-zinc-500 mt-1 leading-snug">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] text-zinc-600">{activity.date}</span>
                              <span className="text-[10px] px-2 py-0.5 bg-blue-900/20 text-blue-300 rounded border border-blue-900/30">
                                {activity.skillImpacted}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skill Growth & Time Insights */}
              <div className="col-span-1 lg:col-span-2 space-y-8">
                
                {/* Skill Growth Tracking */}
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-cyan-400" />
                      Skill Growth Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {skillGrowth.map((item) => (
                        <div key={item.skill} className="p-5 bg-zinc-950/50 rounded-lg border border-zinc-800">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-white">{item.skill}</h4>
                            <span className="text-sm font-bold text-green-400 bg-green-950/30 px-2 py-1 rounded border border-green-900/50">
                              {item.improvement}
                            </span>
                          </div>

                          {/* Progression visualization */}
                          <div className="flex items-center gap-4 relative">
                            {item.progression.map((stage, idx) => (
                              <div key={idx} className="flex-1 relative z-10">
                                <div className="text-[10px] text-zinc-500 mb-1 uppercase font-bold tracking-wider">{stage.stage}</div>
                                <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden border border-zinc-700">
                                  <div
                                    className={`h-full rounded-full transition-all duration-1000 ${
                                      idx === 0 ? 'bg-zinc-600' : 'bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]'
                                    }`}
                                    style={{ width: `${stage.level}%` }}
                                  />
                                </div>
                                <div className="text-xs font-mono text-zinc-300 mt-1 text-right">{stage.level}%</div>
                              </div>
                            ))}
                            {/* Connector Arrow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-600 z-0">
                                <ArrowUp className="h-6 w-6 rotate-90 opacity-20" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Time-Based Insights */}
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-400" />
                      Learning Insights 

[Image of Time management concept]

                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-purple-950/20 rounded-lg border border-purple-900/40">
                        <p className="text-[10px] text-purple-300/70 uppercase tracking-wide mb-2 font-bold">Avg. Hours/Week</p>
                        <p className="text-3xl font-bold text-purple-400">{timeInsights.avgHoursPerWeek}</p>
                      </div>
                      <div className="p-4 bg-orange-950/20 rounded-lg border border-orange-900/40">
                        <p className="text-[10px] text-orange-300/70 uppercase tracking-wide mb-2 font-bold">Consistency</p>
                        <p className="text-3xl font-bold text-orange-400">{timeInsights.consistencyScore}%</p>
                      </div>
                      <div className="p-4 bg-indigo-950/20 rounded-lg border border-indigo-900/40">
                        <p className="text-[10px] text-indigo-300/70 uppercase tracking-wide mb-2 font-bold">To Readiness</p>
                        <p className="text-3xl font-bold text-indigo-400">{timeInsights.weeksToReadiness} wks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Readiness Progress Over Time */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-400" />
                  Readiness Progress Over Time
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Weekly readiness score trend </p>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[250px] bg-zinc-950/50 rounded-lg border border-zinc-800 p-4 relative">
                  <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                    
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((val) => {
                      const padding = 40;
                      const effectiveHeight = chartHeight - padding * 2;
                      const y = padding + effectiveHeight - (val / 100) * effectiveHeight;
                      return (
                        <g key={`grid-${val}`}>
                          <line x1={padding} y1={y} x2={chartWidth - 20} y2={y} stroke="#3f3f46" strokeDasharray="4" strokeWidth="0.5" />
                          <text x={padding - 10} y={y + 4} fontSize="10" textAnchor="end" fill="#71717a">
                            {val}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>

                    {/* Line chart */}
                    <path d={generatePath()} stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                    {/* Data points */}
                    {readinessTrend.map((data, index) => {
                      const padding = 40;
                      const effectiveWidth = chartWidth - padding * 2;
                      const effectiveHeight = chartHeight - padding * 2;
                      const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
                      const y = padding + effectiveHeight - (data.readiness / 100) * effectiveHeight;
                      return (
                        <g key={`point-${index}`}>
                            <circle
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#18181b" 
                            stroke="#22d3ee"
                            strokeWidth="2"
                            />
                            {/* X Axis Labels */}
                            <text x={x} y={chartHeight - 15} fontSize="9" textAnchor="middle" fill="#71717a">{data.week}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Course Completion Tracking */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Course Completion Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseTracking.map((course) => (
                    <div key={course.id} className={`p-4 rounded-lg border flex items-center justify-between ${getStatusColor(course.status)}`}>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-full bg-black/20 border border-white/10">
                          {getStatusIcon(course.status)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-zinc-200">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                            <span className="bg-black/30 px-1.5 py-0.5 rounded">{course.platform}</span>
                            <span>•</span>
                            <span>Skill: <span className="text-zinc-300">{course.skillImpacted}</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">{course.status.replace('-', ' ')}</p>
                        {course.completionDate && (
                          <p className="text-[10px] text-zinc-500 mt-1">{course.completionDate}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Improvement Impact Panel */}
            <Card className="bg-gradient-to-r from-green-950/30 to-emerald-950/30 border border-green-900/30 shadow-lg shadow-black/50 mt-8 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-500" />
                  Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-zinc-300">
                    <span className="font-bold text-white">Completing "HL7 Fundamentals"</span> increased your HL7 skill from Beginner (30%) to Intermediate (65%), <span className="font-bold text-green-400">+35 proficiency points</span>.
                  </p>
                  <p className="text-sm text-zinc-300">
                    This improvement contributed to a <span className="font-bold text-green-400">+12% readiness boost</span> toward your Health Informatics Engineer role.
                  </p>
                  <p className="text-sm text-zinc-300">
                    Combined with your other skill improvements, you're now <span className="font-bold text-white">68% ready</span> for your target role (up from 30% ten weeks ago).
                  </p>
                  <div className="pt-4 border-t border-green-900/30 mt-2">
                    <p className="text-xs text-zinc-400 flex items-center gap-2">
                      <span className="font-bold text-green-500 bg-green-950/50 px-2 py-0.5 rounded border border-green-900">Next Step:</span> 
                      Continue "Python for Health Data" to boost your data analysis capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
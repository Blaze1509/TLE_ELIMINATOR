import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Lightbulb, Download, Award, CheckCircle, AlertCircle, ArrowRight, Users, Activity } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const InsightsReports = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('insights-reports');
  const [reportFormat, setReportFormat] = useState('pdf');

  // Key insights data
  const keyInsights = [
    {
      id: 1,
      icon: TrendingUp,
      title: 'Readiness Growth',
      value: '+14%',
      description: 'Readiness increased by 14% in the last 30 days',
      status: 'positive',
      color: 'green'
    },
    {
      id: 2,
      icon: Award,
      title: 'Strongest Area',
      value: 'SQL',
      description: 'SQL for Healthcare - 75% proficiency',
      status: 'positive',
      color: 'blue'
    },
    {
      id: 3,
      icon: AlertCircle,
      title: 'Priority Gap',
      value: 'FHIR',
      description: 'FHIR Standards - 0% proficiency (+8% impact potential)',
      status: 'warning',
      color: 'orange'
    },
    {
      id: 4,
      icon: CheckCircle,
      title: 'Courses Completed',
      value: '3',
      description: '3 courses completed in the last 60 days',
      status: 'positive',
      color: 'purple'
    }
  ];

  // Skill impact insights
  const skillImpactInsights = [
    {
      id: 1,
      action: 'Completed "FHIR Fundamentals"',
      result: 'FHIR upgraded from 0% → 65%',
      impact: '+8% readiness',
      date: '2024-12-15',
      impactValue: 8
    },
    {
      id: 2,
      action: 'Completed "HIPAA Compliance Essentials"',
      result: 'HIPAA upgraded to 80% proficiency',
      impact: '+6% readiness',
      date: '2024-11-28',
      impactValue: 6
    },
    {
      id: 3,
      action: 'Started "SQL for Healthcare Analytics"',
      result: 'SQL improved from 65% → 75%',
      impact: '+3% readiness',
      date: '2024-11-15',
      impactValue: 3
    }
  ];

  // Readiness trend data
  const readinessTrend = [
    { week: 'Week 1', readiness: 50 },
    { week: 'Week 2', readiness: 52 },
    { week: 'Week 3', readiness: 54 },
    { week: 'Week 4', readiness: 56 },
    { week: 'Week 5', readiness: 58 },
    { week: 'Week 6', readiness: 60 },
    { week: 'Week 7', readiness: 62 },
    { week: 'Week 8', readiness: 64 }
  ];

  // Personalized recommendations
  const recommendations = [
    {
      rank: 1,
      skill: 'HL7 Standards',
      reason: 'Critical for healthcare data exchange',
      estimatedGain: '+8%',
      timeframe: '5 weeks',
      priority: 'Critical',
      course: 'HL7 Messaging Standards'
    },
    {
      rank: 2,
      skill: 'EHR Systems',
      reason: 'Essential for role, highest ROI',
      estimatedGain: '+12%',
      timeframe: '8 weeks',
      priority: 'Critical',
      course: 'EHR Implementation & Workflow'
    },
    {
      rank: 3,
      skill: 'Healthcare Cloud',
      reason: 'Modern healthcare infrastructure',
      estimatedGain: '+10%',
      timeframe: '6 weeks',
      priority: 'High',
      course: 'Microsoft Azure for Healthcare'
    }
  ];

  // Benchmark insights
  const benchmarkInsights = {
    userReadiness: 64,
    peerAverage: 55,
    benchmark: 75,
    comparison: 'You are ahead of 60% of learners targeting the same role'
  };

  // Time insights
  const timeInsights = {
    avgHoursPerWeek: 8.5,
    consistencyScore: 85,
    estimatedWeeksToReady: 6,
    estimatedMonthsToReady: 1.5
  };

  // Report summary data
  const reportSummary = {
    generatedDate: '2024-12-15',
    reportPeriod: 'Last 60 days',
    skillsAssessed: 11,
    skillsLearned: 4,
    coursesCompleted: 3,
    totalHours: 51,
    currentReadiness: 64,
    targetReadiness: 80,
    readinessGain: 14
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
    if (itemId === 'dashboard') navigate('/dashboard-main');
    else if (itemId === 'skills-profile') navigate('/skills-profile');
    else if (itemId === 'learning-path') navigate('/learning-path');
    else if (itemId === 'progress-tracking') navigate('/progress-tracking');
    else if (itemId === 'skill-analysis') navigate('/skill-analysis');
    else if (itemId === 'insights-reports') navigate('/insights-reports');
    else setActiveSection(itemId);
  };

  const handleExportReport = (format) => {
    toast.success(`Report exported as ${format.toUpperCase()}!`);
  };

  const generateSVGChart = () => {
    const chartHeight = 200;
    const chartWidth = 700;
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

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = padding + effectiveHeight - (val / 100) * effectiveHeight;
          return (
            <g key={`grid-${val}`}>
              <line x1={padding} y1={y} x2={chartWidth - 20} y2={y} stroke="#27272a" strokeDasharray="4" />
              <text x={padding - 10} y={y + 4} fontSize="10" textAnchor="end" fill="#71717a">
                {val}%
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {readinessTrend.map((data, index) => {
          const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
          return (
            <text key={`label-${index}`} x={x} y={chartHeight - 10} fontSize="10" textAnchor="middle" fill="#71717a">
              {data.week}
            </text>
          );
        })}

        {/* Gradient Defs */}
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Line chart */}
        <path d={path} stroke="url(#chartGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />

        {/* Data points */}
        {readinessTrend.map((data, index) => {
          const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
          const y = padding + effectiveHeight - (data.readiness / 100) * effectiveHeight;
          return (
            <circle key={`point-${index}`} cx={x} cy={y} r="4" fill="#18181b" stroke="#22d3ee" strokeWidth="2" />
          );
        })}
      </svg>
    );
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'green': return 'text-green-400 bg-green-900/20 border-green-900/50';
      case 'blue': return 'text-blue-400 bg-blue-900/20 border-blue-900/50';
      case 'orange': return 'text-orange-400 bg-orange-900/20 border-orange-900/50';
      case 'purple': return 'text-purple-400 bg-purple-900/20 border-purple-900/50';
      default: return 'text-zinc-400 bg-zinc-900 border-zinc-800';
    }
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
              <h2 className="text-2xl font-bold text-white tracking-tight">Insights & Reports</h2>
              <p className="text-sm text-zinc-400">AI-driven analysis of your career readiness</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            
            {/* 1. Key Insights Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {keyInsights.map((insight) => {
                const Icon = insight.icon;
                const classes = getColorClasses(insight.color);
                return (
                  <Card key={insight.id} className={`shadow-lg border bg-zinc-900 ${classes.split(' ')[2]}`}> {/* Use border color only for card border */}
                    <CardContent className="pt-6 relative overflow-hidden">
                      {/* Background tint based on color */}
                      <div className={`absolute inset-0 opacity-5 ${classes.split(' ')[1]}`}></div>
                      
                      <div className="flex items-start justify-between mb-3 relative z-10">
                        <div className={`p-2 rounded-full ${classes.split(' ')[1]}`}>
                           <Icon className={`h-5 w-5 ${classes.split(' ')[0]}`} />
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide relative z-10">{insight.title}</p>
                      <p className={`text-2xl font-bold mt-2 ${classes.split(' ')[0]} relative z-10`}>{insight.value}</p>
                      <p className="text-xs text-zinc-400 mt-2 relative z-10">{insight.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 2. Skill Impact Insights */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Skill Impact Insights
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">How your actions translate to readiness</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillImpactInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-yellow-500/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-zinc-200">{insight.action}</h4>
                          <p className="text-xs text-zinc-500 mt-1">{new Date(insight.date).toLocaleDateString()}</p>
                        </div>
                        <span className="text-sm font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">
                          {insight.impact}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
                        <ArrowRight className="h-4 w-4 text-zinc-600" />
                        <p className="text-xs font-semibold text-zinc-300">{insight.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 3. Career Readiness Trends */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cyan-400" />
                  Readiness Trend (Last 8 Weeks)
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Steady growth from 50% to 64% based on learning activity</p>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[220px] bg-zinc-950/50 rounded-lg border border-zinc-800 p-4 mb-4">
                  {generateSVGChart()}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-cyan-900/20 border border-cyan-900/50 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-1">Total Growth</p>
                    <p className="text-lg font-bold text-cyan-400">+14%</p>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-900/50 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-1">Avg Weekly Gain</p>
                    <p className="text-lg font-bold text-green-400">+1.75%</p>
                  </div>
                  <div className="p-3 bg-purple-900/20 border border-purple-900/50 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-1">Courses Completed</p>
                    <p className="text-lg font-bold text-purple-400">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Personalized Recommendations */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Personalized Next Steps
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Highest ROI actions for the next 30 days</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.rank} className="p-4 bg-zinc-950/80 rounded-lg border border-zinc-800 hover:border-green-500/30 transition-colors">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-900/30 text-green-400 font-bold text-sm flex-shrink-0 border border-green-900/50">
                          {rec.rank}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-zinc-200">{rec.skill}</h4>
                          <p className="text-xs text-zinc-500 mt-1">{rec.reason}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-green-400">{rec.estimatedGain}</p>
                          <p className="text-[10px] text-zinc-600 uppercase">gain</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs">
                        <div className="flex gap-4">
                           <span className="text-zinc-500">Duration: <span className="text-zinc-300">{rec.timeframe}</span></span>
                           <span className="text-zinc-500">Course: <span className="text-zinc-300">{rec.course}</span></span>
                        </div>
                        <Button 
                          onClick={() => navigate('/learning-path')} 
                          size="sm" 
                          className="h-7 text-xs bg-white text-black hover:bg-zinc-200 border-0"
                        >
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Benchmark & Time Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Benchmark Comparison */}
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                    <CardHeader>
                        <CardTitle className="text-zinc-100 flex items-center gap-2">
                        <Users className="h-5 w-5 text-indigo-400" />
                        Benchmark Comparison
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                {/* Your Readiness */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-zinc-400">Your Readiness</span>
                                        <span className="text-sm font-bold text-indigo-400">{benchmarkInsights.userReadiness}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full" style={{ width: `${benchmarkInsights.userReadiness}%` }} />
                                    </div>
                                </div>
                                {/* Peer Average */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-zinc-400">Peer Average</span>
                                        <span className="text-sm font-bold text-blue-400">{benchmarkInsights.peerAverage}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full" style={{ width: `${benchmarkInsights.peerAverage}%` }} />
                                    </div>
                                </div>
                                {/* Target */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-zinc-400">Target (Job-Ready)</span>
                                        <span className="text-sm font-bold text-green-400">{benchmarkInsights.benchmark}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: `${benchmarkInsights.benchmark}%` }} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-zinc-950 rounded-lg border border-indigo-900/30">
                                <p className="text-sm text-white font-semibold mb-1">📊 Percentile Rank</p>
                                <p className="text-xs text-zinc-400">{benchmarkInsights.comparison}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Time-Based Insights */}
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                    <CardHeader>
                        <CardTitle className="text-zinc-100">Time-Based Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-900/10 rounded-lg border border-purple-900/30">
                                <p className="text-[10px] text-purple-400/80 uppercase tracking-wide mb-2 font-bold">Avg Hours/Week</p>
                                <p className="text-2xl font-bold text-purple-400">{timeInsights.avgHoursPerWeek}</p>
                            </div>
                            <div className="p-4 bg-blue-900/10 rounded-lg border border-blue-900/30">
                                <p className="text-[10px] text-blue-400/80 uppercase tracking-wide mb-2 font-bold">Consistency</p>
                                <p className="text-2xl font-bold text-blue-400">{timeInsights.consistencyScore}%</p>
                            </div>
                            <div className="p-4 bg-green-900/10 rounded-lg border border-green-900/30">
                                <p className="text-[10px] text-green-400/80 uppercase tracking-wide mb-2 font-bold">To Job-Ready</p>
                                <p className="text-2xl font-bold text-green-400">{timeInsights.estimatedWeeksToReady} wks</p>
                            </div>
                            <div className="p-4 bg-indigo-900/10 rounded-lg border border-indigo-900/30">
                                <p className="text-[10px] text-indigo-400/80 uppercase tracking-wide mb-2 font-bold">Months to Goal</p>
                                <p className="text-2xl font-bold text-indigo-400">~{timeInsights.estimatedMonthsToReady}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 7. Reports & Export */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 border-l-4 border-l-cyan-500">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Download className="h-5 w-5 text-cyan-400" />
                  Downloadable Reports
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Export comprehensive skill readiness data</p>
              </CardHeader>
              <CardContent>
                {/* Report Summary */}
                <div className="p-5 bg-zinc-950/80 rounded-lg border border-zinc-800 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Skills Assessed</p>
                      <p className="text-xl font-bold text-white">{reportSummary.skillsAssessed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Skills Learned</p>
                      <p className="text-xl font-bold text-green-400">{reportSummary.skillsLearned}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Courses Done</p>
                      <p className="text-xl font-bold text-cyan-400">{reportSummary.coursesCompleted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Total Hours</p>
                      <p className="text-xl font-bold text-purple-400">{reportSummary.totalHours}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-500 flex justify-between">
                    <span>Generated: {reportSummary.generatedDate}</span>
                    <span>Period: {reportSummary.reportPeriod}</span>
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-300 mb-3">Export Format</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer p-3 rounded-md bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors flex-1">
                        <input
                          type="radio"
                          value="pdf"
                          checked={reportFormat === 'pdf'}
                          onChange={(e) => setReportFormat(e.target.value)}
                          className="accent-cyan-500 bg-black border-zinc-600"
                        />
                        <span className="text-sm text-zinc-300">PDF Document</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer p-3 rounded-md bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors flex-1">
                        <input
                          type="radio"
                          value="json"
                          checked={reportFormat === 'json'}
                          onChange={(e) => setReportFormat(e.target.value)}
                          className="accent-cyan-500 bg-black border-zinc-600"
                        />
                        <span className="text-sm text-zinc-300">JSON Data</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleExportReport(reportFormat)}
                    className="h-12 px-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 8. Ethical & Data Transparency Note */}
            <Card className="bg-amber-950/10 border border-amber-900/30 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-amber-200 flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Data Transparency & Ethical Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-amber-200/70">
                  <p>
                    <span className="font-semibold text-amber-400">📋 Insights are Advisory:</span> All recommendations provided are for career guidance only.
                  </p>
                  <p>
                    <span className="font-semibold text-amber-400">🔒 Privacy First:</span> No patient data is stored or processed. Analysis is based solely on your skill profile.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsReports;
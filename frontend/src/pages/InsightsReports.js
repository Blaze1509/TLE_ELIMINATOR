import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Lightbulb, Download, Award, CheckCircle, AlertCircle, ArrowRight, Users, Activity, Target, GitBranch } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const InsightsReports = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('insights-reports');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Fetch insights data from backend
  useEffect(() => {
    fetchInsightsData();
  }, []);

  const fetchInsightsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/insights/data', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        setInsightsData(result.data);
      } else {
        throw new Error('Failed to fetch insights');
      }
    } catch (error) {
      console.error('Fetch insights error:', error);
      toast.error('Failed to load insights data');
    } finally {
      setLoading(false);
    }
  };

  // Generate key insights from data
  const getKeyInsights = () => {
    if (!insightsData) return [];
    
    return [
      {
        id: 1,
        icon: TrendingUp,
        title: 'Readiness Growth',
        value: insightsData.keyInsights.readinessGrowth.value,
        description: insightsData.keyInsights.readinessGrowth.description,
        status: insightsData.keyInsights.readinessGrowth.status,
        color: insightsData.keyInsights.readinessGrowth.status === 'positive' ? 'green' : 
               insightsData.keyInsights.readinessGrowth.status === 'negative' ? 'red' : 'gray'
      },
      {
        id: 2,
        icon: Award,
        title: 'Strongest Area',
        value: insightsData.keyInsights.strongestArea.value,
        description: insightsData.keyInsights.strongestArea.description,
        status: insightsData.keyInsights.strongestArea.status,
        color: 'blue'
      },
      {
        id: 3,
        icon: AlertCircle,
        title: 'Priority Gap',
        value: insightsData.keyInsights.priorityGap.value,
        description: insightsData.keyInsights.priorityGap.description,
        status: insightsData.keyInsights.priorityGap.status,
        color: insightsData.keyInsights.priorityGap.status === 'warning' ? 'orange' : 'green'
      },
      {
        id: 4,
        icon: CheckCircle,
        title: 'Courses Completed',
        value: insightsData.keyInsights.coursesCompleted.value,
        description: insightsData.keyInsights.coursesCompleted.description,
        status: 'positive',
        color: 'purple'
      }
    ];
  };

  const getSkillImpactInsights = () => {
    return insightsData?.skillImpactInsights || [];
  };

  const getReadinessTrend = () => {
    return insightsData?.readinessTrend || [];
  };

  const getRecommendations = () => {
    if (!insightsData) return [];
    // Generate recommendations from skill gaps
    return insightsData.skillImpactInsights.slice(0, 3).map((insight, index) => ({
      rank: index + 1,
      skill: insight.action.replace('Completed "', '').replace('"', ''),
      reason: 'Based on your analysis results',
      estimatedGain: insight.impact,
      timeframe: '4-6 weeks',
      priority: 'High',
      course: `${insight.action.replace('Completed "', '').replace('"', '')} Course`
    }));
  };

  const getBenchmarkInsights = () => {
    return insightsData?.benchmarkComparison || {
      userReadiness: 0,
      peerAverage: 0,
      benchmark: 80,
      percentileRank: 0,
      comparison: 'Loading benchmark data...'
    };
  };

  const getTimeInsights = () => {
    return insightsData?.timeInsights || {
      avgHoursPerWeek: 0,
      consistencyScore: 0,
      estimatedWeeksToReady: 0,
      estimatedMonthsToReady: 0
    };
  };

  const getReportSummary = () => {
    return insightsData?.reportSummary || {
      generatedDate: new Date().toLocaleDateString(),
      reportPeriod: 'All time',
      skillsAssessed: 0,
      skillsLearned: 0,
      coursesCompleted: 0,
      totalHours: 0,
      currentReadiness: 0,
      targetReadiness: 80,
      readinessGain: 0
    };
  };

  const getVisualizationData = () => {
    return insightsData?.visualizationData || { skillGapData: [], careerPathwayData: [], skillDistribution: [] };
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
    { id: 'insights-reports', label: 'Insights & Reports', icon: BarChart3 }
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

  const handleExportReport = async (format) => {
    try {
      setDownloading(true);
      const endpoint = format === 'pdf' ? '/api/insights/report/pdf' : '/api/insights/report/json';
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `career-insights-${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success(`Report downloaded as ${format.toUpperCase()}!`);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to download report');
    } finally {
      setDownloading(false);
    }
  };

  const generateSVGChart = () => {
    const readinessTrend = getReadinessTrend();
    if (!readinessTrend.length) {
      return (
        <div className="flex items-center justify-center h-full text-zinc-500">
          No trend data available
        </div>
      );
    }

    const chartHeight = 280;
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
      case 'red': return 'text-red-400 bg-red-900/20 border-red-900/50';
      case 'gray': return 'text-gray-400 bg-gray-900/20 border-gray-900/50';
      default: return 'text-zinc-400 bg-zinc-900 border-zinc-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading insights data...</p>
        </div>
      </div>
    );
  }

  if (!insightsData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
          <p className="text-zinc-400 mb-4">No analysis data found</p>
          <Button onClick={() => navigate('/skill-analysis')} className="bg-cyan-600 hover:bg-cyan-700">
            Complete Skill Analysis
          </Button>
        </div>
      </div>
    );
  }

  const keyInsights = getKeyInsights();
  const skillImpactInsights = getSkillImpactInsights();
  const readinessTrend = getReadinessTrend();
  const recommendations = getRecommendations();
  const benchmarkInsights = getBenchmarkInsights();
  const timeInsights = getTimeInsights();
  const reportSummary = getReportSummary();
  const { skillGapData, careerPathwayData, skillDistribution } = getVisualizationData();

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
                  {skillImpactInsights.length > 0 ? skillImpactInsights.map((insight) => (
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
                  )) : (
                    <div className="p-8 text-center text-zinc-500">
                      <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Complete more skills to see impact insights</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 3. Data Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Career Pathway Visualization */}
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-purple-400" />
                    Career Pathway Progress
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-1">Your progression through career stages</p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={careerPathwayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="stage" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#18181b', 
                            border: '1px solid #374151', 
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Bar dataKey="completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Gap Analysis */}
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-400" />
                    Skill Gap Analysis
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-1">Current vs required skill levels</p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={skillGapData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ fill: '#9ca3af', fontSize: 10 }}
                        />
                        <Radar 
                          name="Current" 
                          dataKey="current" 
                          stroke="#22d3ee" 
                          fill="#22d3ee" 
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                        <Radar 
                          name="Required" 
                          dataKey="required" 
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#18181b', 
                            border: '1px solid #374151', 
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 4. Skill Distribution */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                  Skill Distribution Overview
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Breakdown of your skill completion status</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={skillDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {skillDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#18181b', 
                            border: '1px solid #374151', 
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend and Stats */}
                  <div className="flex flex-col justify-center space-y-4">
                    {skillDistribution.map((item, index) => {
                      const totalSkills = skillDistribution.reduce((sum, s) => sum + s.value, 0);
                      const percentage = totalSkills > 0 ? Math.round((item.value / totalSkills) * 100) : 0;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm font-medium text-zinc-300">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-white">{item.value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cyan-400" />
                  Readiness Trend (Last 8 Weeks)
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-1">Steady growth from 50% to 64% based on learning activity</p>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[320px] bg-zinc-950/50 rounded-lg border border-zinc-800 p-4 mb-4">
                  {generateSVGChart()}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-cyan-900/20 border border-cyan-900/50 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-1">Total Growth</p>
                    <p className="text-lg font-bold text-cyan-400">{reportSummary.readinessGain > 0 ? '+' : ''}{reportSummary.readinessGain}%</p>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-900/50 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-1">Avg Weekly Gain</p>
                    <p className="text-lg font-bold text-green-400">+{(reportSummary.readinessGain / Math.max(readinessTrend.length, 1)).toFixed(1)}%</p>
                  </div>
                  <div className="p-3 bg-purple-900/20 border border-purple-900/50 rounded-lg">
                    <p className="text-xs text-zinc-400 mb-1">Courses Completed</p>
                    <p className="text-lg font-bold text-purple-400">{reportSummary.coursesCompleted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* 6. Benchmark & Time Insights */}
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

            {/* 8. Reports & Export */}
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
                    disabled={downloading}
                    className="h-12 px-8 bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    {downloading ? 'Downloading...' : 'Download Report'}
                  </Button>
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
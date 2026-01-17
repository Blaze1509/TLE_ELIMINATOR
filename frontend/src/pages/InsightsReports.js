import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, TrendingDown, Lightbulb, Download, Eye, Award, CheckCircle, AlertCircle, ArrowRight, Users } from 'lucide-react';
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
      description: 'FHIR Standards - 0% proficiency (estimated +8% impact)',
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
      color: 'green'
    }
  ];

  // Skill impact insights
  const skillImpactInsights = [
    {
      id: 1,
      action: 'Completed "FHIR Fundamentals" course',
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
    { week: 'Week 1', readiness: 50, courses: 0, date: '2024-10-01' },
    { week: 'Week 2', readiness: 52, courses: 0, date: '2024-10-08' },
    { week: 'Week 3', readiness: 54, courses: 0, date: '2024-10-15' },
    { week: 'Week 4', readiness: 56, courses: 1, date: '2024-10-22' },
    { week: 'Week 5', readiness: 58, courses: 1, date: '2024-10-29' },
    { week: 'Week 6', readiness: 60, courses: 1, date: '2024-11-05' },
    { week: 'Week 7', readiness: 62, courses: 2, date: '2024-11-12' },
    { week: 'Week 8', readiness: 64, courses: 3, date: '2024-11-19' }
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
      course: 'HL7 Messaging Standards (Coursera)'
    },
    {
      rank: 2,
      skill: 'EHR Systems (Epic/Cerner)',
      reason: 'Essential for role, highest ROI',
      estimatedGain: '+12%',
      timeframe: '8 weeks',
      priority: 'Critical',
      course: 'EHR Implementation & Workflow (Udemy)'
    },
    {
      rank: 3,
      skill: 'Healthcare Cloud (Azure)',
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
    percentile: 60,
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
      <svg width={chartWidth} height={chartHeight} className="w-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = padding + effectiveHeight - (val / 100) * effectiveHeight;
          return (
            <g key={`grid-${val}`}>
              <line x1={padding} y1={y} x2={chartWidth - 20} y2={y} stroke="#e5e7eb" strokeDasharray="4" />
              <text x={padding - 5} y={y + 4} fontSize="10" textAnchor="end" fill="#9ca3af">
                {val}%
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {readinessTrend.map((data, index) => {
          const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
          return (
            <text key={`label-${index}`} x={x} y={chartHeight - 10} fontSize="9" textAnchor="middle" fill="#6b7280">
              {data.week}
            </text>
          );
        })}

        {/* Line chart */}
        <path d={path} stroke="#3b82f6" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />

        {/* Data points */}
        {readinessTrend.map((data, index) => {
          const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
          const y = padding + effectiveHeight - (data.readiness / 100) * effectiveHeight;
          return (
            <circle key={`point-${index}`} cx={x} cy={y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
          );
        })}
      </svg>
    );
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
            <Button onClick={handleLogout} variant="destructive" className="w-full flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <h2 className="text-2xl font-bold text-gray-900">Insights & Reports</h2>
            <p className="text-sm text-gray-600">AI-driven insights on your healthcare skill development and career readiness</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* 1. Key Insights Summary */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {keyInsights.map((insight) => {
                const Icon = insight.icon;
                const bgColors = {
                  green: 'bg-green-50 border-green-200',
                  blue: 'bg-blue-50 border-blue-200',
                  orange: 'bg-orange-50 border-orange-200'
                };
                const textColors = {
                  green: 'text-green-600',
                  blue: 'text-blue-600',
                  orange: 'text-orange-600'
                };
                return (
                  <Card key={insight.id} className={`shadow-lg border ${bgColors[insight.color]}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <Icon className={`h-5 w-5 ${textColors[insight.color]}`} />
                      </div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">{insight.title}</p>
                      <p className={`text-2xl font-bold mt-2 ${textColors[insight.color]}`}>{insight.value}</p>
                      <p className="text-xs text-gray-600 mt-2">{insight.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 2. Skill Impact Insights */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Skill Impact Insights (Cause → Effect)
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">How your learning actions translated into skill improvements</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillImpactInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{insight.action}</h4>
                          <p className="text-xs text-gray-600 mt-1">{new Date(insight.date).toLocaleDateString()}</p>
                        </div>
                        <span className="text-sm font-bold text-green-600">{insight.impact}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-orange-200">
                        <ArrowRight className="h-4 w-4 text-orange-600" />
                        <p className="text-xs font-semibold text-gray-900">{insight.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 3. Career Readiness Trends */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Career Readiness Trends (Last 8 Weeks)
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">Consistent learning over the last 8 weeks led to steady readiness growth from 50% to 64%</p>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                  {generateSVGChart()}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total Growth</p>
                    <p className="text-lg font-bold text-blue-600">+14%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Avg Weekly Gain</p>
                    <p className="text-lg font-bold text-green-600">+1.75%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Courses Completed</p>
                    <p className="text-lg font-bold text-purple-600">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Personalized Recommendations */}
            <Card className="shadow-lg border-0 border-l-4 border-l-green-500 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Personalized Next Steps (Next 30 Days)
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">Recommended skills to focus on for maximum readiness gain</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.rank} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm flex-shrink-0">
                          {rec.rank}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{rec.skill}</h4>
                          <p className="text-xs text-gray-600 mt-1">{rec.reason}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-green-600">{rec.estimatedGain}</p>
                          <p className="text-xs text-gray-600">readiness gain</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-green-200 text-xs">
                        <div>
                          <span className="text-gray-600">Duration: </span>
                          <span className="font-semibold text-gray-900">{rec.timeframe}</span>
                        </div>
                        <Button onClick={() => navigate('/learning-path')} size="sm" className="enhanced-button text-xs">
                          Start Learning
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Comparative & Benchmark Insights */}
            <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Benchmark Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Your Position vs Role Benchmark</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-600">Your Readiness</span>
                          <span className="text-sm font-bold text-indigo-600">{benchmarkInsights.userReadiness}%</span>
                        </div>
                        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full" style={{ width: `${benchmarkInsights.userReadiness}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-600">Peer Average</span>
                          <span className="text-sm font-bold text-blue-600">{benchmarkInsights.peerAverage}%</span>
                        </div>
                        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                          <div className="bg-blue-400 h-full" style={{ width: `${benchmarkInsights.peerAverage}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-600">Target (Job-Ready)</span>
                          <span className="text-sm font-bold text-green-600">{benchmarkInsights.benchmark}%</span>
                        </div>
                        <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: `${benchmarkInsights.benchmark}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-indigo-200">
                    <p className="text-sm text-gray-900 font-semibold mb-2">📊 Percentile Rank</p>
                    <p className="text-sm text-gray-700">{benchmarkInsights.comparison}</p>
                    <p className="text-xs text-gray-600 mt-2">You're on track to exceed the role benchmark in approximately 6–8 weeks.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 6. Time-Based Insights */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900">Time-Based Learning Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Avg Hours/Week</p>
                    <p className="text-2xl font-bold text-purple-600">{timeInsights.avgHoursPerWeek}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Consistency</p>
                    <p className="text-2xl font-bold text-blue-600">{timeInsights.consistencyScore}%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">To Job-Ready</p>
                    <p className="text-2xl font-bold text-green-600">{timeInsights.estimatedWeeksToReady}–8 wks</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Months to Goal</p>
                    <p className="text-2xl font-bold text-indigo-600">~{timeInsights.estimatedMonthsToReady}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7. Reports & Export */}
            <Card className="shadow-lg border-0 border-l-4 border-l-blue-500 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-600" />
                  Downloadable Reports
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">Export comprehensive skill readiness reports for employers or training institutions</p>
              </CardHeader>
              <CardContent>
                {/* Report Summary */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Skills Assessed</p>
                      <p className="text-lg font-bold text-gray-900">{reportSummary.skillsAssessed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Skills Learned</p>
                      <p className="text-lg font-bold text-green-600">{reportSummary.skillsLearned}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Courses Completed</p>
                      <p className="text-lg font-bold text-blue-600">{reportSummary.coursesCompleted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total Hours</p>
                      <p className="text-lg font-bold text-purple-600">{reportSummary.totalHours}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-blue-200 text-xs text-gray-700">
                    <p>Report Period: {reportSummary.reportPeriod} | Generated: {reportSummary.generatedDate}</p>
                  </div>
                </div>

                {/* Export Options */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Export Format</p>
                    <div className="flex gap-3 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="pdf"
                          checked={reportFormat === 'pdf'}
                          onChange={(e) => setReportFormat(e.target.value)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">PDF (Recommended)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="json"
                          checked={reportFormat === 'json'}
                          onChange={(e) => setReportFormat(e.target.value)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">JSON (API-friendly)</span>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleExportReport(reportFormat)}
                    className="enhanced-button w-full flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Report ({reportFormat.toUpperCase()})
                  </Button>

                  <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-1">Report Includes:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Profile summary and target role</li>
                      <li>Complete skill inventory</li>
                      <li>Gap analysis and recommendations</li>
                      <li>Learning progress timeline</li>
                      <li>Current readiness score: {reportSummary.currentReadiness}%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 8. Ethical & Data Transparency Note */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-amber-50 to-orange-50 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Data Transparency & Ethical Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs text-gray-700">
                  <p>
                    <span className="font-semibold">📋 Insights are Advisory:</span> All recommendations and insights provided by HealthCare+ are advisory in nature and should not be considered medical, clinical, or employment advice.
                  </p>
                  <p>
                    <span className="font-semibold">🔒 No Patient Data:</span> This platform does not collect, store, or use any patient health records or sensitive patient information. All analysis is based solely on your educational profile.
                  </p>
                  <p>
                    <span className="font-semibold">✅ HIPAA Compliant:</span> All data is handled in compliance with HIPAA standards where applicable. Your skill development data is private and encrypted.
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

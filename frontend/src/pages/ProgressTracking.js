import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Calendar, Trophy, Zap, Target, CheckCircle, Clock, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const ProgressTracking = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('progress-tracking');

  // Dummy progress data
  const progressOverview = {
    targetRole: 'Health Informatics Engineer',
    readinessPercentage: 68,
    readinessIncrease: 12,
    coursesCompleted: 3,
    coursesTotal: 7,
    skillsImproved: 4
  };

  // Timeline activities
  const activityTimeline = [
    {
      id: 1,
      type: 'course-completed',
      title: 'Completed "FHIR Fundamentals"',
      description: 'Successfully finished the course on FHIR basics',
      date: '2024-12-15',
      skillImpacted: 'FHIR'
    },
    {
      id: 2,
      type: 'skill-upgraded',
      title: 'FHIR skill upgraded to Intermediate',
      description: 'Your proficiency increased from 35% to 65%',
      date: '2024-12-15',
      skillImpacted: 'FHIR'
    },
    {
      id: 3,
      type: 'course-started',
      title: 'Started "SQL for Healthcare Analytics"',
      description: 'Began learning SQL for healthcare data analysis',
      date: '2024-12-10',
      skillImpacted: 'SQL'
    },
    {
      id: 4,
      type: 'skill-added',
      title: 'Skill added: Data Analytics',
      description: 'New skill added to your learning profile',
      date: '2024-12-05',
      skillImpacted: 'Data Analytics'
    },
    {
      id: 5,
      type: 'course-completed',
      title: 'Completed "HIPAA Compliance Essentials"',
      description: 'Successfully finished the HIPAA course',
      date: '2024-11-28',
      skillImpacted: 'HIPAA'
    },
    {
      id: 6,
      type: 'course-started',
      title: 'Started "FHIR Fundamentals"',
      description: 'Began learning FHIR standards',
      date: '2024-11-20',
      skillImpacted: 'FHIR'
    }
  ];

  // Skill growth data
  const skillGrowth = [
    {
      skill: 'FHIR',
      progression: [
        { stage: 'Initial', level: 35, date: '2024-11-20' },
        { stage: 'Current', level: 65, date: '2024-12-15' }
      ],
      improvement: '+30%',
      status: 'intermediate'
    },
    {
      skill: 'SQL',
      progression: [
        { stage: 'Initial', level: 65, date: '2024-10-15' },
        { stage: 'Current', level: 75, date: '2024-12-15' }
      ],
      improvement: '+10%',
      status: 'advanced'
    },
    {
      skill: 'HIPAA',
      progression: [
        { stage: 'Initial', level: 50, date: '2024-11-01' },
        { stage: 'Current', level: 80, date: '2024-12-15' }
      ],
      improvement: '+30%',
      status: 'advanced'
    },
    {
      skill: 'Data Analytics',
      progression: [
        { stage: 'Initial', level: 0, date: '2024-12-05' },
        { stage: 'Current', level: 40, date: '2024-12-15' }
      ],
      improvement: '+40%',
      status: 'beginner'
    }
  ];

  // Readiness trend data (weekly)
  const readinessTrend = [
    { week: 'Week 1', readiness: 45, date: '2024-10-01' },
    { week: 'Week 2', readiness: 48, date: '2024-10-08' },
    { week: 'Week 3', readiness: 50, date: '2024-10-15' },
    { week: 'Week 4', readiness: 52, date: '2024-10-22' },
    { week: 'Week 5', readiness: 55, date: '2024-10-29' },
    { week: 'Week 6', readiness: 58, date: '2024-11-05' },
    { week: 'Week 7', readiness: 60, date: '2024-11-12' },
    { week: 'Week 8', readiness: 62, date: '2024-11-19' },
    { week: 'Week 9', readiness: 65, date: '2024-11-26' },
    { week: 'Week 10', readiness: 68, date: '2024-12-03' }
  ];

  // Course completion tracking
  const courseTracking = [
    {
      id: 1,
      title: 'FHIR Fundamentals',
      status: 'completed',
      skillImpacted: 'FHIR',
      completionDate: '2024-12-15',
      platform: 'Coursera'
    },
    {
      id: 2,
      title: 'HIPAA Compliance Essentials',
      status: 'completed',
      skillImpacted: 'HIPAA',
      completionDate: '2024-11-28',
      platform: 'edX'
    },
    {
      id: 3,
      title: 'Healthcare Data Fundamentals',
      status: 'completed',
      skillImpacted: 'Data Analytics',
      completionDate: '2024-11-15',
      platform: 'Udemy'
    },
    {
      id: 4,
      title: 'SQL for Healthcare Analytics',
      status: 'in-progress',
      skillImpacted: 'SQL',
      completionDate: null,
      platform: 'Udemy'
    },
    {
      id: 5,
      title: 'HL7 Messaging Standards',
      status: 'not-started',
      skillImpacted: 'HL7',
      completionDate: null,
      platform: 'Coursera'
    }
  ];

  // Time-based insights
  const timeInsights = {
    avgHoursPerWeek: 8.5,
    consistencyScore: 85,
    weeksToReadiness: 6,
    learningStreak: 12
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'not-started':
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'course-completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'skill-upgraded':
        return <ArrowUp className="h-4 w-4 text-blue-600" />;
      case 'course-started':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'skill-added':
        return <Zap className="h-4 w-4 text-purple-600" />;
      default:
        return <Trophy className="h-4 w-4 text-gray-600" />;
    }
  };

  const maxReadiness = Math.max(...readinessTrend.map(d => d.readiness));
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
            <h2 className="text-2xl font-bold text-gray-900">Progress Tracking</h2>
            <p className="text-sm text-gray-600">Monitor your learning progress and career readiness evolution</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* Progress Overview */}
            <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Target Role</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{progressOverview.targetRole}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Readiness</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="text-2xl font-bold text-green-600">{progressOverview.readinessPercentage}%</p>
                      <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        +{progressOverview.readinessIncrease}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Courses</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {progressOverview.coursesCompleted}/{progressOverview.coursesTotal}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Skills Improved</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">{progressOverview.skillsImproved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Learning Streak</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">{timeInsights.learningStreak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {/* Learning Activity Timeline */}
              <div className="col-span-1">
                <Card className="shadow-lg border-0 h-full">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2 text-base">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityTimeline.slice(0, 6).map((activity, index) => (
                        <div key={activity.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="p-2 rounded-full bg-gray-100">
                              {getTimelineIcon(activity.type)}
                            </div>
                            {index < activityTimeline.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-xs font-semibold text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
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
              <div className="col-span-2 space-y-8">
                {/* Skill Growth Tracking */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Skill Growth Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillGrowth.map((item) => (
                        <div key={item.skill} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{item.skill}</h4>
                            <span className="text-sm font-bold text-green-600">{item.improvement}</span>
                          </div>

                          {/* Progression visualization */}
                          <div className="flex items-center gap-3 mb-2">
                            {item.progression.map((stage, idx) => (
                              <div key={idx} className="flex-1">
                                <div className="text-xs text-gray-600 mb-1">{stage.stage}: {stage.level}%</div>
                                <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      idx === 0 ? 'bg-gray-400' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${stage.level}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Arrow showing progression */}
                          <div className="flex justify-center mt-2">
                            <ArrowUp className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Time-Based Insights */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      Learning Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Avg. Hours/Week</p>
                        <p className="text-2xl font-bold text-purple-600">{timeInsights.avgHoursPerWeek}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Consistency</p>
                        <p className="text-2xl font-bold text-orange-600">{timeInsights.consistencyScore}%</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">To Readiness</p>
                        <p className="text-2xl font-bold text-indigo-600">{timeInsights.weeksToReadiness} wks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Readiness Progress Over Time */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  Readiness Progress Over Time
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">Weekly readiness score trend</p>
              </CardHeader>
              <CardContent>
                <svg width={chartWidth} height={chartHeight} className="w-full border border-gray-200 rounded-lg bg-white p-4">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((val) => {
                    const padding = 40;
                    const effectiveHeight = chartHeight - padding * 2;
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
                    const padding = 40;
                    const effectiveWidth = chartWidth - padding * 2;
                    const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
                    return (
                      <text
                        key={`label-${index}`}
                        x={x}
                        y={chartHeight - 10}
                        fontSize="9"
                        textAnchor="middle"
                        fill="#6b7280"
                      >
                        {data.week}
                      </text>
                    );
                  })}

                  {/* Line chart */}
                  <path d={generatePath()} stroke="#6366f1" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />

                  {/* Data points */}
                  {readinessTrend.map((data, index) => {
                    const padding = 40;
                    const effectiveWidth = chartWidth - padding * 2;
                    const effectiveHeight = chartHeight - padding * 2;
                    const x = padding + (index * effectiveWidth) / (readinessTrend.length - 1);
                    const y = padding + effectiveHeight - (data.readiness / 100) * effectiveHeight;
                    return (
                      <circle
                        key={`point-${index}`}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#6366f1"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </CardContent>
            </Card>

            {/* Course Completion Tracking */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Course Completion Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courseTracking.map((course) => (
                    <div key={course.id} className={`p-4 rounded-lg border flex items-center justify-between ${getStatusColor(course.status)}`}>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-full bg-white bg-opacity-50">
                          {getStatusIcon(course.status)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs opacity-75">
                            <span>{course.platform}</span>
                            <span>•</span>
                            <span>Skill: {course.skillImpacted}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold uppercase tracking-wide">{course.status.replace('-', ' ')}</p>
                        {course.completionDate && (
                          <p className="text-xs opacity-75 mt-1">{new Date(course.completionDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Improvement Impact Panel */}
            <Card className="shadow-lg border-0 border-l-4 border-l-green-500 mt-8 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Completing "FHIR Fundamentals"</span> increased your FHIR skill from Beginner (35%) to Intermediate (65%), <span className="font-semibold text-green-600">+30 proficiency points</span>.
                  </p>
                  <p className="text-sm text-gray-700">
                    This improvement contributed to a <span className="font-semibold text-green-600">+4% readiness boost</span> toward your Health Informatics Engineer role.
                  </p>
                  <p className="text-sm text-gray-700">
                    Combined with your other skill improvements, you're now <span className="font-semibold">68% ready</span> for your target role (up from 56% three months ago).
                  </p>
                  <div className="pt-3 border-t border-green-200">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-green-700">Next Step:</span> Continue "SQL for Healthcare Analytics" to boost your data analysis capabilities and gain an estimated +6% readiness.
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

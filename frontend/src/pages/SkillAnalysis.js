import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, AlertCircle, Check, X, Target, Zap, TrendingDown, Award, Lightbulb, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const SkillAnalysis = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('missing');
  const [activeSection, setActiveSection] = useState('skill-analysis');

  // Career readiness data
  const readinessData = {
    role: 'Health Informatics Engineer',
    overallReadiness: 64,
    level: 'Moderately-ready',
    requiredSkillsCovered: 7,
    totalRequiredSkills: 11,
    lastUpdated: '2024-12-15'
  };

  // Missing skills (not in user profile)
  const missingSkills = [
    {
      id: 1,
      name: 'HL7 Standards',
      category: 'Healthcare IT',
      importance: 'High',
      whyMatters: 'Required for healthcare data exchange and interoperability between systems',
      impactOnReadiness: '+8%',
      estimatedLearnTime: '5 weeks'
    },
    {
      id: 2,
      name: 'EHR Systems (Epic/Cerner)',
      category: 'Healthcare IT',
      importance: 'High',
      whyMatters: 'Foundational knowledge for Health Informatics Engineer role - most healthcare organizations use these systems',
      impactOnReadiness: '+12%',
      estimatedLearnTime: '8 weeks'
    },
    {
      id: 3,
      name: 'Healthcare Cloud Architecture (Azure)',
      category: 'Cloud Infrastructure',
      importance: 'High',
      whyMatters: 'Azure is the primary cloud platform for healthcare applications and HIPAA-compliant deployments',
      impactOnReadiness: '+10%',
      estimatedLearnTime: '6 weeks'
    }
  ];

  // Weak skills (present but below required proficiency)
  const weakSkills = [
    {
      id: 1,
      name: 'SQL',
      currentLevel: 'Intermediate',
      requiredLevel: 'Advanced',
      currentProficiency: 75,
      requiredProficiency: 90,
      gap: 15,
      whyMatters: 'Healthcare queries require complex joins, window functions, and performance optimization',
      recommendedImprovement: 'Advanced SQL optimization for healthcare datasets'
    },
    {
      id: 2,
      name: 'Data Analytics',
      currentLevel: 'Beginner',
      requiredLevel: 'Intermediate',
      currentProficiency: 40,
      requiredProficiency: 70,
      gap: 30,
      whyMatters: 'Critical for clinical decision support and population health analytics',
      recommendedImprovement: 'Healthcare analytics and BI tools (Tableau/Power BI)'
    },
    {
      id: 3,
      name: 'Clinical Workflow Knowledge',
      currentLevel: 'Beginner',
      requiredLevel: 'Intermediate',
      currentProficiency: 35,
      requiredProficiency: 70,
      gap: 35,
      whyMatters: 'Essential to understand clinical processes for system design and implementation',
      recommendedImprovement: 'Clinical informatics fundamentals and healthcare processes'
    }
  ];

  // Strong skills (meeting or exceeding requirements)
  const strongSkills = [
    {
      id: 1,
      name: 'FHIR',
      proficiency: 65,
      requiredProficiency: 60,
      level: 'Intermediate',
      exceeds: true,
      evidence: 'Completed FHIR API development project',
      certificateLink: 'FHIR Basics Certification'
    },
    {
      id: 2,
      name: 'HIPAA Compliance',
      proficiency: 80,
      requiredProficiency: 75,
      level: 'Advanced',
      exceeds: true,
      evidence: 'HIPAA Compliance Certification completed',
      certificateLink: 'HIPAA Business Associate Certification'
    },
    {
      id: 3,
      name: 'Python Programming',
      proficiency: 60,
      requiredProficiency: 50,
      level: 'Intermediate',
      exceeds: true,
      evidence: 'Built 3 healthcare automation tools',
      certificateLink: 'Python Advanced Developer'
    }
  ];

  // Skill importance breakdown
  const skillImportance = [
    { skill: 'EHR Systems', importance: 18, userLevel: 10 },
    { skill: 'HL7 Standards', importance: 15, userLevel: 0 },
    { skill: 'FHIR', importance: 14, userLevel: 65 },
    { skill: 'SQL', importance: 13, userLevel: 75 },
    { skill: 'Healthcare Cloud', importance: 12, userLevel: 0 },
    { skill: 'HIPAA Compliance', importance: 11, userLevel: 80 },
    { skill: 'Data Analytics', importance: 10, userLevel: 40 },
    { skill: 'Clinical Workflow', importance: 7, userLevel: 35 }
  ];

  // AI explanations
  const aiExplanations = [
    {
      id: 1,
      title: 'EHR Systems Impact',
      explanation: 'EHR Systems account for 18% of your readiness score because nearly all healthcare organizations in the US use Epic, Cerner, or similar platforms. Proficiency here is non-negotiable.',
      relatedSkill: 'EHR Systems'
    },
    {
      id: 2,
      title: 'Improving HL7 Standards',
      explanation: 'Learning HL7 Standards would increase your readiness by ~8% and would also unlock understanding of clinical data exchange, making it one of the highest-ROI skills to learn next.',
      relatedSkill: 'HL7 Standards'
    },
    {
      id: 3,
      title: 'Your SQL Strength',
      explanation: 'Your SQL proficiency at 75% exceeds the 65% requirement. However, advancing to 90% would unlock advanced healthcare analytics capabilities (+6% readiness).',
      relatedSkill: 'SQL'
    }
  ];

  // Recommended next actions
  const recommendedActions = [
    {
      rank: 1,
      skill: 'EHR Systems Fundamentals',
      reason: 'Highest impact on readiness (+12%)',
      course: 'EHR Implementation & Workflow (Udemy)',
      duration: '8 weeks',
      priority: 'Critical'
    },
    {
      rank: 2,
      skill: 'HL7 Standards Basics',
      reason: 'Essential for healthcare interoperability',
      course: 'HL7 Messaging Standards (Coursera)',
      duration: '5 weeks',
      priority: 'Critical'
    },
    {
      rank: 3,
      skill: 'Healthcare Cloud Architecture',
      reason: 'Modern healthcare infrastructure requirement',
      course: 'Microsoft Azure for Healthcare (Microsoft Learn)',
      duration: '6 weeks',
      priority: 'High'
    }
  ];

  // Historical comparison
  const historicalData = [
    { date: '2024-10-15', readiness: 52, skillsLearned: 0 },
    { date: '2024-11-01', readiness: 56, skillsLearned: 1 },
    { date: '2024-11-15', readiness: 58, skillsLearned: 2 },
    { date: '2024-12-01', readiness: 61, skillsLearned: 3 },
    { date: '2024-12-15', readiness: 64, skillsLearned: 4 }
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

  const getReadinessColor = (readiness) => {
    if (readiness >= 80) return 'text-green-600';
    if (readiness >= 60) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getReadinessLevel = (readiness) => {
    if (readiness >= 80) return 'Job-ready';
    if (readiness >= 60) return 'Moderately-ready';
    return 'Beginner-ready';
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
            <h2 className="text-2xl font-bold text-gray-900">Skill Analysis</h2>
            <p className="text-sm text-gray-600">Analyze your healthcare skills against role requirements and identify growth areas</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* 1. Career Readiness Overview */}
            <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Career Readiness Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Target Role</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{readinessData.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Overall Readiness</p>
                    <p className={`text-3xl font-bold mt-2 ${getReadinessColor(readinessData.overallReadiness)}`}>
                      {readinessData.overallReadiness}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Readiness Level</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{getReadinessLevel(readinessData.overallReadiness)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Skills Coverage</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      {readinessData.requiredSkillsCovered}/{readinessData.totalRequiredSkills}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        readinessData.overallReadiness >= 80 ? 'bg-green-500' : 
                        readinessData.overallReadiness >= 60 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${readinessData.overallReadiness}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    How is readiness calculated? Coverage (40%) + Proficiency Match (35%) + Skill Importance Weights (25%)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 2. Skill Gap Tabs */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900">Skill Analysis by Category</CardTitle>
                {/* Tabs */}
                <div className="flex gap-4 mt-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('missing')}
                    className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                      activeTab === 'missing'
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <X className="inline h-4 w-4 mr-2" />
                    Missing Skills ({missingSkills.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('weak')}
                    className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                      activeTab === 'weak'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <TrendingDown className="inline h-4 w-4 mr-2" />
                    Weak Skills ({weakSkills.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('strong')}
                    className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                      activeTab === 'strong'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Check className="inline h-4 w-4 mr-2" />
                    Strong Skills ({strongSkills.length})
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Missing Skills Tab */}
                {activeTab === 'missing' && (
                  <div className="space-y-4">
                    {missingSkills.map((skill) => (
                      <div key={skill.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 bg-red-200 text-red-800 rounded">{skill.category}</span>
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">{skill.importance}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-red-600">{skill.impactOnReadiness}</p>
                            <p className="text-xs text-gray-600">readiness impact</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 mb-3">{skill.whyMatters}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-red-200">
                          <span className="text-xs text-gray-600">Est. time: {skill.estimatedLearnTime}</span>
                          <Button
                            onClick={() => navigate('/learning-path')}
                            className="enhanced-button text-xs"
                          >
                            Learn This Skill
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Weak Skills Tab */}
                {activeTab === 'weak' && (
                  <div className="space-y-4">
                    {weakSkills.map((skill) => (
                      <div key={skill.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{skill.whyMatters}</p>
                          </div>
                          <span className="text-sm font-bold text-yellow-600">Gap: {skill.gap}%</span>
                        </div>

                        {/* Level comparison */}
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Current: {skill.currentLevel}</p>
                            <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                              <div className="bg-yellow-500 h-full" style={{ width: `${skill.currentProficiency}%` }} />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{skill.currentProficiency}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Required: {skill.requiredLevel}</p>
                            <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full" style={{ width: `${skill.requiredProficiency}%` }} />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{skill.requiredProficiency}%</p>
                          </div>
                        </div>

                        <p className="text-xs text-gray-700">{skill.recommendedImprovement}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Strong Skills Tab */}
                {activeTab === 'strong' && (
                  <div className="space-y-4">
                    {strongSkills.map((skill) => (
                      <div key={skill.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                              <Check className="h-5 w-5 text-green-600" />
                              {skill.name}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">Level: <span className="font-semibold">{skill.level}</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-600">{skill.proficiency}%</p>
                            <p className="text-xs text-green-700 font-semibold">Exceeds {skill.requiredProficiency}%</p>
                          </div>
                        </div>

                        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden mb-3">
                          <div className="bg-green-500 h-full" style={{ width: `${skill.proficiency}%` }} />
                        </div>

                        <div className="p-3 bg-white rounded border border-green-200">
                          <p className="text-xs text-gray-700"><span className="font-semibold">Evidence:</span> {skill.evidence}</p>
                          <p className="text-xs text-green-600 mt-1">{skill.certificateLink} ✓</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 3. Skill Importance Breakdown */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Skill Importance Breakdown
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">How each skill contributes to your readiness score</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillImportance.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24">
                        <p className="text-xs font-semibold text-gray-900">{item.skill}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2 h-6">
                          {/* Importance bar */}
                          <div className="flex-1 bg-gray-200 rounded h-full relative">
                            <div
                              className="bg-blue-500 rounded h-full transition-all"
                              style={{ width: `${item.importance}%` }}
                            />
                            <span className="absolute right-2 top-0.5 text-xs font-semibold text-gray-700">
                              {item.importance}%
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* User level */}
                      <div className="w-12">
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-900">{item.userLevel}%</div>
                          <div className="text-xs text-gray-600">your level</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 4. AI Explanation Panel */}
            <Card className="shadow-lg border-0 border-l-4 border-l-purple-500 mb-8 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  AI Explainability Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiExplanations.map((item) => (
                    <div key={item.id} className="p-4 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-700 mb-2">{item.explanation}</p>
                      <div className="text-xs text-purple-600 font-semibold">→ {item.relatedSkill}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 5. Recommended Skill Actions */}
            <Card className="shadow-lg border-0 border-l-4 border-l-green-500 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <ArrowUp className="h-5 w-5 text-green-600" />
                  Next Best Actions (Top 3)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedActions.map((action) => (
                    <div
                      key={action.rank}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm flex-shrink-0">
                          {action.rank}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{action.skill}</h4>
                          <p className="text-xs text-gray-600 mt-1">{action.reason}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs">
                              <span className="text-gray-600">Course: </span>
                              <span className="font-semibold text-gray-900">{action.course}</span>
                              <span className="text-gray-600 ml-2">({action.duration})</span>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded font-semibold ${
                              action.priority === 'Critical'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
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
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Readiness Trend (Last 2 Months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historicalData.map((data, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-32">
                        <p className="text-xs font-semibold text-gray-900">{data.date}</p>
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1">
                          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-500 h-full"
                              style={{ width: `${data.readiness}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-bold text-indigo-600 w-12 text-right">{data.readiness}%</div>
                      </div>
                      {index > 0 && (
                        <div className="text-sm font-semibold text-green-600">
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
                className="enhanced-button"
              >
                Create Personalized Learning Path
              </Button>
              <Button
                onClick={() => toast.info('Export feature coming soon!')}
                variant="outline"
              >
                Export Full Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;

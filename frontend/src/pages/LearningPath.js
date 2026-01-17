import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Plus, Check, Clock, Trash2, ChevronRight, Star, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const LearningPath = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('learning-path');
  const [learningPath, setLearningPath] = useState([
    { id: 1, courseTitle: 'FHIR Fundamentals', skill: 'FHIR', status: 'in-progress', progress: 65, platform: 'Coursera', duration: '4 weeks' },
    { id: 2, courseTitle: 'SQL for Healthcare', skill: 'SQL', status: 'not-started', progress: 0, platform: 'Udemy', duration: '6 weeks' }
  ]);

  // Dummy recommended courses
  const recommendedCourses = [
    {
      id: 1,
      title: 'FHIR Fundamentals',
      platform: 'Coursera',
      skill: 'FHIR',
      difficulty: 'Beginner',
      duration: '4 weeks',
      rating: 4.8,
      explanation: 'This course covers FHIR basics required for healthcare interoperability.',
      alreadyAdded: true
    },
    {
      id: 2,
      title: 'SQL for Healthcare Analytics',
      platform: 'Udemy',
      skill: 'SQL',
      difficulty: 'Intermediate',
      duration: '6 weeks',
      rating: 4.6,
      explanation: 'Master SQL queries for healthcare data analysis and reporting.',
      alreadyAdded: true
    },
    {
      id: 3,
      title: 'HIPAA Compliance Essentials',
      platform: 'edX',
      skill: 'HIPAA',
      difficulty: 'Beginner',
      duration: '3 weeks',
      rating: 4.7,
      explanation: 'Comprehensive guide to HIPAA requirements for healthcare professionals.',
      alreadyAdded: false
    },
    {
      id: 4,
      title: 'HL7 Messaging Standards',
      platform: 'Coursera',
      skill: 'HL7',
      difficulty: 'Intermediate',
      duration: '5 weeks',
      rating: 4.5,
      explanation: 'Learn HL7 standards for clinical data exchange in healthcare systems.',
      alreadyAdded: false
    },
    {
      id: 5,
      title: 'Healthcare Data Analytics',
      platform: 'Udemy',
      skill: 'Data Analytics',
      difficulty: 'Advanced',
      duration: '8 weeks',
      rating: 4.9,
      explanation: 'Advanced techniques for analyzing healthcare datasets and trends.',
      alreadyAdded: false
    }
  ];

  // Learning path overview data
  const pathOverview = {
    targetRole: 'Health Informatics Engineer',
    skillsToAcquire: 4,
    estimatedDuration: '8 weeks',
    progress: 25,
    expectedReadinessIncrease: 18
  };

  const skillImpactData = [
    { skill: 'FHIR', currentLevel: 'Beginner (35%)', expectedLevel: 'Intermediate (65%)', impact: '+30%' },
    { skill: 'SQL', currentLevel: 'Intermediate (65%)', expectedLevel: 'Advanced (85%)', impact: '+20%' },
    { skill: 'HIPAA', currentLevel: 'Beginner', expectedLevel: 'Intermediate', impact: '+25%' }
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

  const handleAddCourse = (course) => {
    const newPathItem = {
      id: Math.max(...learningPath.map(p => p.id), 0) + 1,
      courseTitle: course.title,
      skill: course.skill,
      status: 'not-started',
      progress: 0,
      platform: course.platform,
      duration: course.duration
    };
    setLearningPath([...learningPath, newPathItem]);
    toast.success(`${course.title} added to your learning path!`);
  };

  const handleRemoveCourse = (courseId) => {
    setLearningPath(learningPath.filter(p => p.id !== courseId));
    toast.success('Course removed from learning path');
  };

  const handleProgressUpdate = (courseId, newStatus, newProgress) => {
    setLearningPath(learningPath.map(p => 
      p.id === courseId 
        ? { ...p, status: newStatus, progress: newProgress }
        : p
    ));
    if (newStatus === 'completed') {
      toast.success('🎉 Great! Course completed. Skill updated!');
    }
  };

  const inProgressCourses = learningPath.filter(p => p.status === 'in-progress');
  const notStartedCourses = learningPath.filter(p => p.status === 'not-started');
  const completedCourses = learningPath.filter(p => p.status === 'completed');

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            <h2 className="text-2xl font-bold text-gray-900">Learning Path</h2>
            <p className="text-sm text-gray-600">Transform skill gaps into a personalized learning journey</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* Learning Path Overview */}
            <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Map className="h-5 w-5 text-blue-600" />
                  Your Learning Path Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Target Role</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{pathOverview.targetRole}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Skills to Acquire</p>
                    <p className="text-lg font-semibold text-blue-600 mt-1">{pathOverview.skillsToAcquire}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Est. Duration</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{pathOverview.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Readiness Boost</p>
                    <p className="text-lg font-semibold text-green-600 mt-1">+{pathOverview.expectedReadinessIncrease}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-blue-600">{pathOverview.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${pathOverview.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Recommended Courses (AI-Curated)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                              {course.platform}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(course.difficulty)}`}>
                              {course.difficulty}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {course.skill}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 italic">
                        "{course.explanation}"
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        {course.alreadyAdded ? (
                          <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Added to Path
                          </span>
                        ) : (
                          <Button
                            onClick={() => handleAddCourse(course)}
                            size="sm"
                            className="enhanced-button text-sm"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add to Path
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Learning Path */}
            <div className="space-y-6 mb-8">
              {/* In Progress */}
              {inProgressCourses.length > 0 && (
                <Card className="shadow-lg border-0 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      In Progress ({inProgressCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inProgressCourses.map((course) => (
                        <div key={course.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{course.courseTitle}</h4>
                              <p className="text-xs text-gray-600 mt-1">Skill: <span className="font-medium">{course.skill}</span> | Platform: {course.platform}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCourse(course.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-gray-700">Progress</span>
                              <span className="text-xs font-bold text-blue-600">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleProgressUpdate(course.id, 'in-progress', Math.min(course.progress + 15, 100))}
                              className="text-xs"
                            >
                              Update Progress
                            </Button>
                            <Button
                              size="sm"
                              className="enhanced-button text-xs"
                              onClick={() => handleProgressUpdate(course.id, 'completed', 100)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Complete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Not Started */}
              {notStartedCourses.length > 0 && (
                <Card className="shadow-lg border-0 border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-yellow-500" />
                      Not Started ({notStartedCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notStartedCourses.map((course) => (
                        <div key={course.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-all">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{course.courseTitle}</h4>
                              <p className="text-xs text-gray-600 mt-1">Skill: <span className="font-medium">{course.skill}</span> | Platform: {course.platform}</p>
                              <p className="text-xs text-gray-500 mt-1">Duration: {course.duration}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="enhanced-button text-xs"
                                onClick={() => handleProgressUpdate(course.id, 'in-progress', 10)}
                              >
                                <ChevronRight className="h-3 w-3 mr-1" />
                                Start
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCourse(course.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Completed */}
              {completedCourses.length > 0 && (
                <Card className="shadow-lg border-0 border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      Completed ({completedCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {completedCourses.map((course) => (
                        <div key={course.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{course.courseTitle}</h4>
                              <p className="text-xs text-gray-600">Skill: {course.skill}</p>
                            </div>
                            <span className="text-green-600 font-bold">✓ Completed</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Skill Impact Summary */}
            <Card className="shadow-lg border-0 border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Skill Impact Summary
                </CardTitle>
                <p className="text-xs text-gray-600 mt-2">Completing your current learning path will improve:</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillImpactData.map((item, index) => (
                    <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{item.skill}</span>
                        <span className="text-sm font-bold text-green-600">{item.impact}</span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Current: <span className="font-medium text-gray-900">{item.currentLevel}</span></p>
                        <p>Expected: <span className="font-medium text-gray-900">{item.expectedLevel}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-sm font-semibold text-green-900">
                    📈 Your overall readiness will increase by <span className="text-lg">+{pathOverview.expectedReadinessIncrease}%</span> after completing this path!
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

export default LearningPath;

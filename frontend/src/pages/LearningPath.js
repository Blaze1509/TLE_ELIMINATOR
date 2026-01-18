import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Plus, Check, Clock, Trash2, ChevronRight, Star, Zap, Activity, PlayCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const LearningPath = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('learning-path');
  
  // Sample Data for Visualization
  const [learningPath, setLearningPath] = useState([
    { id: 101, courseTitle: 'HL7 Fundamentals', skill: 'HL7 Standards', status: 'in-progress', progress: 45, platform: 'Coursera', duration: '5h' },
    { id: 102, courseTitle: 'Python for Health Data', skill: 'Python', status: 'not-started', progress: 0, platform: 'Udemy', duration: '12h' }
  ]);

  const recommendedCourses = [
    { id: 1, title: 'FHIR for Developers', skill: 'FHIR API', platform: 'Pluralsight', difficulty: 'Intermediate', rating: 4.8, duration: '8h', explanation: 'Directly addresses your missing FHIR skill gap.' },
    { id: 2, title: 'HIPAA Compliance Masterclass', skill: 'HIPAA', platform: 'LinkedIn Learning', difficulty: 'Beginner', rating: 4.5, duration: '4h', explanation: 'Essential for the Target Role requirements.' }
  ];

  const pathOverview = {
    targetRole: 'Health Informatics Engineer',
    skillsToAcquire: 5,
    estimatedDuration: '6 weeks',
    progress: 15,
    expectedReadinessIncrease: 28
  };

  const skillImpactData = [
    { skill: 'HL7 Standards', currentLevel: 'Novice', expectedLevel: 'Competent', impact: 'High' },
    { skill: 'Python', currentLevel: 'Beginner', expectedLevel: 'Intermediate', impact: 'Medium' }
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
    else if (itemId === 'learning-path') navigate('/learning-path');
    else if (itemId === 'progress-tracking') navigate('/progress-tracking');
    else if (itemId === 'skill-analysis') navigate('/skill-analysis');
    else if (itemId === 'insights-reports') navigate('/insights-reports');
    else setActiveSection(itemId);
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
      case 'Beginner': return 'bg-cyan-900/30 text-cyan-300 border border-cyan-800/50';
      case 'Intermediate': return 'bg-blue-900/30 text-blue-300 border border-blue-800/50';
      case 'Advanced': return 'bg-purple-900/30 text-purple-300 border border-purple-800/50';
      default: return 'bg-zinc-800 text-zinc-400';
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
              <h2 className="text-2xl font-bold text-white tracking-tight">Learning Path</h2>
              <p className="text-sm text-zinc-400">Curated roadmap to close your skill gaps</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            
            {/* Learning Path Overview */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 overflow-hidden relative">
              {/* Background gradient splash */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2 relative z-10">
                  <Map className="h-5 w-5 text-cyan-400" />
                  Your Learning Path Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Target Role</p>
                    <p className="text-lg font-bold text-white mt-1">{pathOverview.targetRole}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Skills to Acquire</p>
                    <p className="text-lg font-bold text-cyan-400 mt-1">{pathOverview.skillsToAcquire}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Est. Duration</p>
                    <p className="text-lg font-bold text-white mt-1">{pathOverview.estimatedDuration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Readiness Boost</p>
                    <p className="text-lg font-bold text-green-400 mt-1">+{pathOverview.expectedReadinessIncrease}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-zinc-300">Overall Progress</span>
                    <span className="text-sm font-bold text-cyan-400">{pathOverview.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden border border-zinc-700">
                    <div
                      className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                      style={{ width: `${pathOverview.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8 border-l-4 border-l-yellow-500">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Recommended Courses (AI-Curated)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {recommendedCourses.map((course) => {
                      // Check if course is already in the path
                      const isAdded = learningPath.some(p => p.courseTitle === course.title);
                      
                      return (
                        <div
                          key={course.id}
                          className="p-5 border border-zinc-800 bg-zinc-950/50 rounded-lg hover:border-cyan-500/30 transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                                  {course.platform}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(course.difficulty)}`}>
                                  {course.difficulty}
                                </span>
                                <span className="text-xs px-2 py-1 bg-blue-900/20 text-blue-300 rounded border border-blue-900/30">
                                  {course.skill}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 bg-yellow-950/20 px-2 py-1 rounded border border-yellow-900/30">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold text-yellow-500">{course.rating}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-zinc-400 mb-4 italic pl-3 border-l-2 border-zinc-700">
                            "{course.explanation}"
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </span>
                            {isAdded ? (
                              <span className="text-xs px-3 py-1 bg-green-900/30 text-green-400 rounded-full font-medium flex items-center gap-1 border border-green-900/50">
                                <Check className="h-3 w-3" />
                                Added to Path
                              </span>
                            ) : (
                              <Button
                                onClick={() => handleAddCourse(course)}
                                size="sm"
                                className="bg-cyan-600 hover:bg-cyan-700 text-white border-0 h-8 text-xs"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add to Path
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500 mb-4">No course recommendations available. Complete a skill analysis first.</p>
                    <Button onClick={() => navigate('/skill-analysis')} variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      Start Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Learning Path */}
            <div className="space-y-6 mb-8">
              
              {/* In Progress */}
              {inProgressCourses.length > 0 && (
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 border-l-4 border-l-cyan-500">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-cyan-400" />
                      In Progress ({inProgressCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inProgressCourses.map((course) => (
                        <div key={course.id} className="p-4 bg-zinc-950/80 rounded-lg border border-cyan-900/30 shadow-[0_0_15px_rgba(8,145,178,0.05)]">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{course.courseTitle}</h4>
                              <p className="text-xs text-zinc-400 mt-1">Skill: <span className="text-cyan-400">{course.skill}</span> | Platform: {course.platform}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCourse(course.id)}
                              className="text-zinc-600 hover:text-red-400 hover:bg-red-950/20 p-1 h-auto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Progress</span>
                              <span className="text-xs font-bold text-cyan-400">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleProgressUpdate(course.id, 'in-progress', Math.min(course.progress + 15, 100))}
                              className="text-xs h-7 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                              +15% Progress
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleProgressUpdate(course.id, 'completed', 100)}
                              className="text-xs h-7 bg-white text-black hover:bg-zinc-200 border-0"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Complete
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
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 border-l-4 border-l-zinc-600">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-zinc-500" />
                      Not Started ({notStartedCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notStartedCourses.map((course) => (
                        <div key={course.id} className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all opacity-80 hover:opacity-100">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-zinc-300">{course.courseTitle}</h4>
                              <p className="text-xs text-zinc-500 mt-1">Skill: {course.skill} | Platform: {course.platform}</p>
                              <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Button
                                size="sm"
                                className="bg-zinc-800 text-white hover:bg-cyan-600 hover:text-white border-0 text-xs h-8"
                                onClick={() => handleProgressUpdate(course.id, 'in-progress', 10)}
                              >
                                <ChevronRight className="h-3 w-3 mr-1" />
                                Start
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveCourse(course.id)}
                                className="text-zinc-600 hover:text-red-400 hover:bg-red-950/20 p-1 h-auto"
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
                <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 border-l-4 border-l-green-600 opacity-70 hover:opacity-100 transition-opacity">
                  <CardHeader>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      Completed ({completedCourses.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {completedCourses.map((course) => (
                        <div key={course.id} className="p-3 bg-green-950/10 rounded-lg border border-green-900/20 flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-zinc-400 line-through decoration-zinc-600">{course.courseTitle}</h4>
                            <p className="text-xs text-zinc-600">Skill: {course.skill}</p>
                          </div>
                          <span className="text-green-500 font-bold text-xs flex items-center gap-1">
                            <Check className="h-3 w-3" /> Done
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Skill Impact Summary */}
            {skillImpactData.length > 0 && (
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-500" />
                    Skill Impact Summary
                  </CardTitle>
                  <p className="text-xs text-zinc-500 mt-2">Completing your current learning path will improve:</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillImpactData.map((item, index) => (
                      <div key={index} className="p-4 bg-purple-950/10 rounded-lg border border-purple-900/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-purple-200">{item.skill}</span>
                          <span className="text-sm font-bold text-green-400">{item.impact} Impact</span>
                        </div>
                        <div className="text-xs text-zinc-400 space-y-1">
                          <p>Current: <span className="font-medium text-zinc-200">{item.currentLevel}</span></p>
                          <p>Expected: <span className="font-medium text-green-400">{item.expectedLevel}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-950/20 border border-green-900/30 rounded-lg">
                    <p className="text-sm font-semibold text-green-300">
                      📈 Your overall readiness will increase by <span className="text-lg text-white">+{pathOverview.expectedReadinessIncrease}%</span> after completing this path!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
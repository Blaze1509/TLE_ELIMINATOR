import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Plus, Edit2, Trash2, Star, Upload, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const SkillsProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('skills-profile');
  
  // State for skills management
  const [skills, setSkills] = useState([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  const [showAddSkill, setShowAddSkill] = useState(false);
  
  // State for career goal
  const [careerGoal, setCareerGoal] = useState('Health Informatics Engineer');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(careerGoal);
  
  // State for certificates/documents
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const profileInfo = {
    fullName: user?.username || 'Healthcare Professional',
    email: user?.email || 'user@healthcare.com',
    targetRole: careerGoal,
    joinDate: 'January 2024',
    totalSkills: skills.length,
    completionRate: 68
  };

  const skillsByLevel = {
    beginner: skills.filter(s => s.level === 'Beginner').length,
    intermediate: skills.filter(s => s.level === 'Intermediate').length,
    advanced: skills.filter(s => s.level === 'Advanced').length
  };

  const handleAddSkill = () => {
    if (newSkillName.trim() === '') {
      toast.error('Please enter a skill name');
      return;
    }

    const newSkill = {
      id: Math.max(...skills.map(s => s.id), 0) + 1,
      name: newSkillName,
      level: newSkillLevel,
      proficiency: newSkillLevel === 'Beginner' ? 25 : newSkillLevel === 'Intermediate' ? 50 : 75
    };

    setSkills([...skills, newSkill]);
    setNewSkillName('');
    setNewSkillLevel('Beginner');
    setShowAddSkill(false);
    toast.success(`${newSkillName} added to your skills!`);
  };

  const handleDeleteSkill = (id) => {
    const skill = skills.find(s => s.id === id);
    setSkills(skills.filter(s => s.id !== id));
    toast.success(`${skill.name} removed from your skills!`);
  };

  const handleSaveGoal = () => {
    if (tempGoal.trim() === '') {
      toast.error('Please enter a career goal');
      return;
    }
    setCareerGoal(tempGoal);
    setIsEditingGoal(false);
    toast.success('Career goal updated!');
  };

  const handleFileUpload = (files) => {
    const allowedFormats = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg'];

    Array.from(files).forEach((file) => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedFormats.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        toast.error(`${file.name} is not a supported format (PDF, DOCX, PNG)`);
        return;
      }

      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type || 'unknown',
        size: (file.size / 1024).toFixed(2), // KB
        uploadedAt: new Date().toLocaleDateString()
      };

      setUploadedFiles([...uploadedFiles, newFile]);
      toast.success(`${file.name} uploaded successfully!`);
    });
  };

  const handleRemoveFile = (id) => {
    const file = uploadedFiles.find(f => f.id === id);
    setUploadedFiles(uploadedFiles.filter(f => f.id !== id));
    toast.success(`${file.name} removed!`);
  };

  const handleSubmitProfile = () => {
    if (skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }

    const profileData = {
      skills: skills,
      careerGoal: careerGoal,
      certificates: uploadedFiles,
      submittedAt: new Date().toISOString()
    };

    console.log('Profile Data Submitted:', profileData);
    toast.success('Your profile has been submitted successfully!');
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 70) return 'bg-gradient-to-r from-green-400 to-green-500';
    if (proficiency >= 50) return 'bg-gradient-to-r from-blue-400 to-blue-500';
    return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
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
                {profileInfo.fullName}
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
            <h2 className="text-2xl font-bold text-gray-900">Skills & Profile</h2>
            <p className="text-sm text-gray-600">Manage your skills and professional information</p>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8">
            {/* Profile Header Card */}
            <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-gray-900">Professional Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-8">
                  {/* Profile Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Full Name</p>
                      <p className="text-lg font-semibold text-gray-900">{profileInfo.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Email</p>
                      <p className="text-sm text-gray-700">{profileInfo.email}</p>
                    </div>
                  </div>

                  {/* Target Role */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Target Role</p>
                      <p className="text-lg font-semibold text-blue-600">{profileInfo.targetRole}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-3 h-3 mr-2" />
                      Edit Profile
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium">Member Since</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{profileInfo.joinDate}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-medium">Completion</p>
                      <p className="text-sm font-semibold text-blue-600 mt-1">{profileInfo.completionRate}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Overview Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{profileInfo.totalSkills}</p>
                    <p className="text-sm text-gray-600 mt-2">Total Skills</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-500">{skillsByLevel.beginner}</p>
                    <p className="text-sm text-gray-600 mt-2">Beginner Level</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{skillsByLevel.intermediate}</p>
                    <p className="text-sm text-gray-600 mt-2">Intermediate Level</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">{skillsByLevel.advanced}</p>
                    <p className="text-sm text-gray-600 mt-2">Advanced Level</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills List with Actions */}
            <Card className="shadow-lg border-0 mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-gray-900">Your Skills</CardTitle>
                <Button 
                  onClick={() => setShowAddSkill(!showAddSkill)} 
                  className="enhanced-button"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </CardHeader>
              <CardContent>
                {/* Add Skill Form */}
                {showAddSkill && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Add New Skill</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                        <input
                          type="text"
                          placeholder="e.g., Electronic Health Records (EHR)"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          className="enhanced-input w-full"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level</label>
                        <select
                          value={newSkillLevel}
                          onChange={(e) => setNewSkillLevel(e.target.value)}
                          className="enhanced-input w-full"
                        >
                          <option value="Beginner">Beginner (0-33%)</option>
                          <option value="Intermediate">Intermediate (34-66%)</option>
                          <option value="Advanced">Advanced (67-100%)</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          onClick={handleAddSkill} 
                          className="enhanced-button flex-1"
                        >
                          Add Skill
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowAddSkill(false);
                            setNewSkillName('');
                            setNewSkillLevel('Beginner');
                          }} 
                          variant="outline" 
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills List */}
                <div className="space-y-4">
                  {skills.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No skills added yet. Click "Add Skill" to get started!</p>
                    </div>
                  ) : (
                    skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>

                          {/* Proficiency Bar */}
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getProficiencyColor(skill.proficiency)}`}
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 min-w-12">{skill.proficiency}%</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete skill"
                            onClick={() => handleDeleteSkill(skill.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Career Goal Section */}
            <Card className="shadow-lg border-0 border-l-4 border-l-blue-500 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Healthcare Career Goal</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setTempGoal(careerGoal);
                      setIsEditingGoal(!isEditingGoal);
                    }}
                  >
                    <Edit2 className="w-3 h-3 mr-2" />
                    {isEditingGoal ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditingGoal ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Healthcare Role</label>
                      <textarea
                        placeholder="e.g., Health Informatics Engineer, Clinical Data Analyst, Healthcare IT Manager"
                        value={tempGoal}
                        onChange={(e) => setTempGoal(e.target.value)}
                        className="enhanced-input w-full min-h-24 resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">Describe your career aspiration in healthcare</p>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleSaveGoal} 
                        className="enhanced-button flex-1"
                      >
                        Save Goal
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsEditingGoal(false);
                          setTempGoal(careerGoal);
                        }} 
                        variant="outline" 
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900">{careerGoal}</h3>
                    <p className="text-sm text-gray-600 mt-2">Your skills are being aligned to help you achieve this goal.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documents & Certificates Upload Section */}
            <Card className="shadow-lg border-0 border-l-4 border-l-green-500 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900">Documents & Certificates (Optional)</CardTitle>
                <p className="text-xs text-gray-600 mt-2">Upload your resume, certificates, or professional documents (PDF, DOCX, PNG)</p>
              </CardHeader>
              <CardContent>
                {/* Drag & Drop Upload Area */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 mb-6 ${
                    isDragging
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-600 mb-4">Supported formats: PDF, DOCX, PNG (Max 10 files)</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button 
                    onClick={() => document.getElementById('file-upload').click()}
                    className="enhanced-button"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Uploaded Files ({uploadedFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-600">
                              {file.size} KB • Uploaded {file.uploadedAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {uploadedFiles.length === 0 && (
                  <p className="text-sm text-gray-600 text-center py-4">No files uploaded yet</p>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-3 mb-8">
              <Button 
                onClick={handleSubmitProfile}
                className="enhanced-button flex-1 py-3 text-base"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Profile & Skills
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProfile;

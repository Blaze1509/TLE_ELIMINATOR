import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { LogOut, LayoutDashboard, User, BookOpen, TrendingUp, Map, BarChart3, Settings, HelpCircle, Plus, Edit2, Trash2, Upload, X, CheckCircle, Activity, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const SkillsProfile = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('skills-profile');
  
  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  
  // State for skills management
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  const [showAddSkill, setShowAddSkill] = useState(false);
  
  // State for career goal
  const [careerGoal, setCareerGoal] = useState('Health Informatics Engineer');
  const [selectedCareerGoal, setSelectedCareerGoal] = useState('Health Informatics Engineer');
  const [customCareerGoals, setCustomCareerGoals] = useState([]);
  const [customGoalInput, setCustomGoalInput] = useState('');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  
  // Predefined skills list
  const healthcareSkills = [
    'Electronic Health Records (EHR)', 'FHIR', 'HL7', 'HIPAA Compliance', 'Medical Coding (ICD-10)', 
    'Clinical Data Analysis', 'Healthcare Analytics', 'Telemedicine', 'Medical Imaging', 'Laboratory Information Systems',
    'Pharmacy Management Systems', 'Clinical Decision Support', 'Healthcare Quality Metrics', 'Patient Safety',
    'Medical Device Integration', 'Healthcare Interoperability', 'Clinical Workflow Optimization', 'Healthcare IT Security',
    'Population Health Management', 'Healthcare Data Mining', 'Clinical Research', 'Biomedical Informatics',
    'Healthcare Project Management', 'Medical Terminology', 'Others'
  ];
  
  // Predefined career goals list
  const healthcareCareers = [
    'Health Informatics Engineer', 'Clinical Data Analyst', 'Healthcare IT Specialist', 'Medical Software Developer',
    'Healthcare Systems Administrator', 'Clinical Research Coordinator', 'Healthcare Data Scientist', 'Telemedicine Specialist',
    'Healthcare Quality Analyst', 'Medical Device Engineer', 'Healthcare Compliance Officer', 'Clinical Informatics Specialist',
    'Healthcare Project Manager', 'Biomedical Engineer', 'Healthcare Consultant', 'Medical Records Manager',
    'Healthcare Database Administrator', 'Clinical Applications Analyst', 'Healthcare Security Specialist', 'Medical Imaging Technologist',
    'Healthcare Business Analyst', 'Clinical Systems Analyst', 'Healthcare Network Administrator', 'Medical Research Scientist',
    'Others'
  ];
  
  // State for certificates/documents
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileInfo = {
    fullName: user?.username || 'Healthcare Professional',
    email: user?.email || 'user@healthcare.com',
    targetRole: careerGoal,
    joinDate: 'January 2024',
    totalSkills: skills.length,
    completionRate: 68
  };

  const handleEditProfile = () => {
    setEditedName(profileInfo.fullName);
    setEditedEmail(profileInfo.email);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    // Here you would typically update the user profile via API
    toast.success('Profile updated successfully!');
    setIsEditingProfile(false);
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    setEditedName('');
    setEditedEmail('');
  };

  const skillsByLevel = {
    beginner: skills.filter(s => s.level === 'Beginner').length,
    intermediate: skills.filter(s => s.level === 'Intermediate').length,
    advanced: skills.filter(s => s.level === 'Advanced').length
  };

  const handleAddSkill = () => {
    let skillName = '';
    
    if (selectedSkill === 'Others') {
      if (customSkill.trim() === '') {
        toast.error('Please enter custom skills');
        return;
      }
      // Handle multiple skills separated by commas
      const customSkills = customSkill.split(',').map(s => s.trim()).filter(s => s);
      
      customSkills.forEach(skill => {
        const newSkill = {
          id: Math.max(...skills.map(s => s.id), 0) + Math.random(),
          name: skill,
          level: newSkillLevel,
          proficiency: newSkillLevel === 'Beginner' ? 25 : newSkillLevel === 'Intermediate' ? 50 : 75
        };
        setSkills(prev => [...prev, newSkill]);
      });
      
      toast.success(`${customSkills.length} skill(s) added!`);
      setCustomSkill('');
    } else {
      if (selectedSkill === '') {
        toast.error('Please select a skill');
        return;
      }
      
      const newSkill = {
        id: Math.max(...skills.map(s => s.id), 0) + 1,
        name: selectedSkill,
        level: newSkillLevel,
        proficiency: newSkillLevel === 'Beginner' ? 25 : newSkillLevel === 'Intermediate' ? 50 : 75
      };
      
      setSkills([...skills, newSkill]);
      toast.success(`${selectedSkill} added to your skills!`);
    }
    
    setSelectedSkill('');
    setNewSkillLevel('Beginner');
    setShowAddSkill(false);
  };

  const handleDeleteSkill = (id) => {
    const skill = skills.find(s => s.id === id);
    setSkills(skills.filter(s => s.id !== id));
    toast.success(`${skill.name} removed from your skills!`);
  };

  const handleSaveGoal = () => {
    if (selectedCareerGoal === 'Others') {
      if (customGoalInput.trim() === '') {
        toast.error('Please enter a custom career goal');
        return;
      }
      // Add to custom goals list and set as current goal
      const newGoals = customGoalInput.split(',').map(g => g.trim()).filter(g => g);
      setCustomCareerGoals(prev => [...prev, ...newGoals]);
      setCareerGoal(newGoals[0]); // Set first goal as current
      setCustomGoalInput('');
    } else {
      setCareerGoal(selectedCareerGoal);
    }
    setIsEditingGoal(false);
    toast.success('Career goal updated!');
  };

  const handleFileUpload = (files) => {
    const allowedFormats = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.png', '.jpg', '.jpeg'];

    Array.from(files).forEach((file) => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedFormats.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        toast.error(`${file.name} is not a supported format`);
        return;
      }

      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type || 'unknown',
        size: (file.size / 1024).toFixed(2), // KB
        uploadedAt: new Date().toLocaleDateString(),
        file: file // Store the actual file object for prediction
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

  const handleSubmitProfile = async () => {
    if (skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const profileData = {
        skills: skills.map(skill => skill.name),
        careerGoal
      };
      
      const response = await fetch('/api/auth/profile/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        const result = await response.json();
        toast.success('Your profile has been submitted successfully!');
        console.log('Profile submission result:', result);
      } else {
        const errorText = await response.text();
        console.error('Profile submission error:', errorText);
        throw new Error('Failed to submit profile');
      }
    } catch (error) {
      console.error('Profile submission error:', error);
      toast.error('Failed to submit profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePredictDocument = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload a document first');
      return;
    }

    if (!token) {
      toast.error('Please login again');
      navigate('/login');
      return;
    }

    setIsPredicting(true);
    try {
      const formData = new FormData();
      formData.append('pdf', uploadedFiles[0].file);

      console.log('Sending request to /api/pdf/analyze');
      const response = await fetch('http://localhost:5000/api/pdf/analyze', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('Response status:', response.status);
      if (response.ok) {
        const result = await response.json();
        toast.success('Document analyzed successfully!');
        console.log('Prediction result:', result);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to analyze document: ${response.status}`);
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to analyze document. Please try again.');
    } finally {
      setIsPredicting(false);
    }
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-cyan-950/40 text-cyan-400 border border-cyan-900/50';
      case 'Intermediate': return 'bg-blue-950/40 text-blue-400 border border-blue-900/50';
      case 'Advanced': return 'bg-purple-950/40 text-purple-400 border border-purple-900/50';
      default: return 'bg-zinc-800 text-zinc-400';
    }
  };

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 70) return 'bg-gradient-to-r from-purple-500 to-purple-400';
    if (proficiency >= 50) return 'bg-gradient-to-r from-blue-500 to-blue-400';
    return 'bg-gradient-to-r from-cyan-500 to-cyan-400';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully!');
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
                {profileInfo.fullName}
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
              <h2 className="text-2xl font-bold text-white tracking-tight">Skills & Profile</h2>
              <p className="text-sm text-zinc-400">Manage your professional identity</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-8 px-8 custom-scrollbar">
            
            {/* Profile Header Card */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <User className="h-5 w-5 text-cyan-400" /> Professional Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Profile Info */}
                  <div className="space-y-5">
                    {isEditingProfile ? (
                      <>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-2">Full Name</p>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full bg-black border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-2">Email</p>
                          <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="w-full bg-black border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveProfile} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white" size="sm">
                            Save
                          </Button>
                          <Button onClick={handleCancelProfileEdit} className="flex-1 bg-zinc-600 hover:bg-zinc-700 text-white" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Full Name</p>
                          <p className="text-lg font-bold text-white mt-1">{profileInfo.fullName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Email</p>
                          <p className="text-sm text-zinc-300 mt-1">{profileInfo.email}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Target Role */}
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold">Target Role</p>
                      <p className="text-lg font-bold text-cyan-400 mt-1">{profileInfo.targetRole}</p>
                    </div>
                    <Button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        size="sm" 
                        onClick={handleEditProfile}
                    >
                      <Edit2 className="w-3 h-3 mr-2" /> Edit Profile
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                      <p className="text-xs text-zinc-500 font-medium uppercase">Member Since</p>
                      <p className="text-sm font-semibold text-white mt-1">{profileInfo.joinDate}</p>
                    </div>
                    <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                      <p className="text-xs text-zinc-500 font-medium uppercase">Completion</p>
                      <p className="text-sm font-semibold text-cyan-400 mt-1">{profileInfo.completionRate}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents & Certificates Upload Section */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-zinc-100">Documents & Certificates</CardTitle>
                <p className="text-xs text-zinc-400 mt-1">Upload your resume or professional documents (PDF, DOCX, PNG)</p>
              </CardHeader>
              <CardContent>
                {/* Drag & Drop Upload Area */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 mb-6 ${
                    isDragging
                      ? 'border-cyan-500 bg-cyan-950/20'
                      : 'border-zinc-700 bg-zinc-950 hover:border-zinc-500 hover:bg-zinc-900'
                  }`}
                >
                  <Upload className="w-10 h-10 text-zinc-500 mx-auto mb-4" />
                  <p className="text-sm font-bold text-zinc-300 mb-1">Drop files here or click to upload</p>
                  <p className="text-xs text-zinc-500 mb-6">Supported formats: PDF, DOCX, PNG (Max 10 files)</p>
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
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    Choose Files
                  </Button>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                        Uploaded Files ({uploadedFiles.length})
                      </h4>
                      <Button
                        onClick={handlePredictDocument}
                        disabled={isPredicting}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        size="sm"
                      >
                        {isPredicting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Analyze Document
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800 hover:bg-zinc-900 hover:border-cyan-500/30 transition-all duration-200 group"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-zinc-200">{file.name}</p>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              {file.size} KB • Uploaded {file.uploadedAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-500 hover:text-red-400 hover:bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills List with Actions */}
            <Card className="bg-zinc-900 border-zinc-800 shadow-lg shadow-black/50 mb-8">
              <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800 pb-4">
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" /> Your Skills
                </CardTitle>
                <Button 
                  onClick={() => setShowAddSkill(!showAddSkill)} 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Skill
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                
                {/* Add Skill Form */}
                {showAddSkill && (
                  <div className="p-6 bg-zinc-950/50 rounded-lg border border-zinc-800 mb-6 animate-in fade-in slide-in-from-top-2">
                    <h3 className="font-semibold text-white mb-4">Add New Skill</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Select Skill</label>
                        <select
                          value={selectedSkill}
                          onChange={(e) => setSelectedSkill(e.target.value)}
                          className="w-full bg-black border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                        >
                          <option value="">Choose a skill...</option>
                          {healthcareSkills.map((skill) => (
                            <option key={skill} value={skill}>{skill}</option>
                          ))}
                        </select>
                      </div>
                      {selectedSkill === 'Others' && (
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-2">Custom Skills</label>
                          <input
                            type="text"
                            placeholder="Enter skills separated by commas (e.g., Skill1, Skill2, Skill3)"
                            value={customSkill}
                            onChange={(e) => setCustomSkill(e.target.value)}
                            className="w-full bg-black border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                          />
                          <p className="text-xs text-zinc-500 mt-1">Separate multiple skills with commas</p>
                        </div>
                      )}
                      <div className="flex gap-3 pt-2">
                        <Button 
                          onClick={handleAddSkill} 
                          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          Save Skill
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowAddSkill(false);
                            setSelectedSkill('');
                            setCustomSkill('');
                            setNewSkillLevel('Beginner');
                          }} 
                          className="flex-1 bg-zinc-600 hover:bg-zinc-700 text-white"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills List */}
                <div className="space-y-3">
                  {skills.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-lg">
                      <p className="text-zinc-500">No skills added yet. Click "Add Skill" to build your profile.</p>
                    </div>
                  ) : (
                    skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-cyan-500/30 transition-all duration-200 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-white text-lg">{skill.name}</h3>
                          </div>

                          {/* Proficiency Bar */}
                          <div className="flex items-center gap-3 max-w-md">
                            <div className="flex-1 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getProficiencyColor(skill.proficiency)} shadow-[0_0_8px_rgba(6,182,212,0.4)]`}
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-zinc-400 min-w-[3rem] text-right">{skill.proficiency}%</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-500 hover:text-red-400 hover:bg-red-950/20"
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
            <Card id="career-goal-section" className="bg-zinc-900 border-zinc-800 border-l-4 border-l-cyan-500 shadow-lg shadow-black/50 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-cyan-400" /> Career Goal
                  </CardTitle>
                  <Button 
                    size="sm"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => {
                      setSelectedCareerGoal(careerGoal);
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
                      <label className="block text-sm font-medium text-zinc-400 mb-2">Select Career Goal</label>
                      <select
                        value={selectedCareerGoal}
                        onChange={(e) => setSelectedCareerGoal(e.target.value)}
                        className="w-full bg-black border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        {[...healthcareCareers, ...customCareerGoals].map((career) => (
                          <option key={career} value={career}>{career}</option>
                        ))}
                      </select>
                    </div>
                    {selectedCareerGoal === 'Others' && (
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Custom Career Goals</label>
                        <input
                          type="text"
                          placeholder="Enter goals separated by commas (e.g., Goal1, Goal2)"
                          value={customGoalInput}
                          onChange={(e) => setCustomGoalInput(e.target.value)}
                          className="w-full bg-black border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                        <p className="text-xs text-zinc-500 mt-2">Separate multiple goals with commas</p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleSaveGoal} 
                        className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        Save Goal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:bg-zinc-900/50 hover:border-cyan-500/30 transition-all duration-200">
                    <h3 className="text-xl font-bold text-white mb-2">{careerGoal}</h3>
                    <p className="text-sm text-zinc-400">Your skills are being aligned to help you achieve this goal.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="mb-12">
              <Button 
                onClick={handleSubmitProfile}
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-6 text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Profile & Skills
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProfile;
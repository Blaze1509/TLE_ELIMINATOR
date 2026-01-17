import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const healthcareRoles = [
  'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon',
  'Radiologist', 'Anesthesiologist', 'Emergency Medicine Doctor',
  'Family Medicine Doctor', 'Internal Medicine Doctor', 'Psychiatrist',
  'Dermatologist', 'Ophthalmologist', 'ENT Specialist', 'Urologist',
  'Gynecologist', 'Oncologist', 'Endocrinologist', 'Gastroenterologist',
  'Pulmonologist', 'Rheumatologist', 'Infectious Disease Specialist',
  'Pathologist', 'Healthcare Data Analyst', 'Medical Researcher',
  'Healthcare Administrator', 'Nurse Practitioner', 'Physician Assistant'
];

const predefinedSkills = [
  'Patient Care', 'Medical Diagnosis', 'Surgery', 'Emergency Care',
  'Medical Research', 'Clinical Trials', 'Medical Imaging', 'Laboratory Analysis',
  'Electronic Health Records', 'Medical Coding', 'Healthcare Analytics',
  'Telemedicine', 'Medical Device Operation', 'Pharmacology',
  'Anatomy & Physiology', 'Medical Ethics', 'Patient Communication',
  'Healthcare Management', 'Quality Assurance', 'Infection Control',
  'Medical Documentation', 'Healthcare IT', 'Data Analysis',
  'Statistical Analysis', 'Python Programming', 'R Programming',
  'Machine Learning', 'Artificial Intelligence', 'Database Management',
  'Healthcare Informatics', 'HIPAA Compliance', 'Medical Terminology',
  'Clinical Decision Support', 'Healthcare Policy', 'Public Health',
  'Epidemiology', 'Biostatistics', 'Health Economics', 'Medical Writing',
  'Regulatory Affairs', 'Clinical Research', 'Bioinformatics'
];

const SkillAnalysisForm = ({ onAnalysisComplete }) => {
  const [formData, setFormData] = useState({
    role: '',
    skills: [],
    otherSkills: '',
    document: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOtherSkillsModal, setShowOtherSkillsModal] = useState(false);
  const [tempOtherSkills, setTempOtherSkills] = useState('');
  const { token } = useAuthStore();

  const filteredSkills = predefinedSkills.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
    !formData.skills.includes(skill)
  );

  const handleSkillSelect = (skill) => {
    if (skill === 'Other Skills...') {
      setShowOtherSkillsModal(true);
      setShowDropdown(false);
      return;
    }
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
    setSkillSearch('');
  };

  const handleOtherSkillsSubmit = () => {
    if (tempOtherSkills.trim()) {
      const otherSkillsArray = tempOtherSkills.split(',').map(s => s.trim()).filter(s => s);
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, ...otherSkillsArray]
      }));
    }
    setTempOtherSkills('');
    setShowOtherSkillsModal(false);
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleRemoveAllSkills = () => {
    setFormData(prev => ({
      ...prev,
      skills: []
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      document: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    setIsLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('role', formData.role);
      
      // Combine predefined and other skills
      const allSkills = [...formData.skills];
      if (formData.otherSkills) {
        const otherSkillsArray = formData.otherSkills.split(',').map(s => s.trim());
        allSkills.push(...otherSkillsArray);
      }
      
      submitData.append('skills', JSON.stringify(allSkills));
      
      if (formData.document) {
        submitData.append('document', formData.document);
      }

      const response = await apiClient.post('/analysis/create', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        toast.success('Analysis completed successfully!');
        onAnalysisComplete();
        // Reset form
        setFormData({
          role: '',
          skills: [],
          otherSkills: '',
          document: null
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        📝 Create New Skill Analysis
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Document (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported: PDF, DOC, DOCX, TXT, JPG, PNG
          </p>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Healthcare Role *
          </label>
          <div className="relative">
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              required
            >
              <option value="">Select your target role</option>
              {healthcareRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Skills Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Skills
          </label>
          
          {/* Skills Dropdown */}
          <div className="relative mb-3">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white"
            >
              <span className="text-gray-500">
                {formData.skills.length > 0 
                  ? `${formData.skills.length} skills selected` 
                  : 'Select skills...'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Skills Dropdown - Show when focused */}
            {showDropdown && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-hidden shadow-lg">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    placeholder="Search skills..."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    autoFocus
                  />
                </div>
                
                {/* Skills List */}
                <div className="max-h-80 overflow-y-auto">
                  {(skillSearch ? filteredSkills : predefinedSkills.filter(skill => !formData.skills.includes(skill)))
                    .slice(0, 20).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillSelect(skill)}
                      className="w-full text-left p-2 hover:bg-gray-100 text-sm border-b border-gray-100 last:border-b-0"
                    >
                      {skill}
                    </button>
                  ))}
                  
                  {/* Other Skills Option - Always at bottom */}
                  <button
                    type="button"
                    onClick={() => handleSkillSelect('Other Skills...')}
                    className="w-full text-left p-2 hover:bg-blue-50 text-sm text-blue-600 font-medium border-t border-gray-200"
                  >
                    + Other Skills...
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Selected Skills */}
          {formData.skills.length > 0 && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">Selected Skills:</p>
                <button
                  type="button"
                  onClick={handleRemoveAllSkills}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleSkillRemove(skill)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Other Skills Modal */}
        {showOtherSkillsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Other Skills
              </h3>
              <textarea
                value={tempOtherSkills}
                onChange={(e) => setTempOtherSkills(e.target.value)}
                placeholder="Enter skills separated by commas...\ne.g., Custom skill 1, Custom skill 2, Another skill"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                rows={3}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowOtherSkillsModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleOtherSkillsSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Skills
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors"
        >
          {isLoading ? '🔄 Analyzing...' : '🚀 Analyze Skills'}
        </button>
      </form>
    </div>
  );
};

export default SkillAnalysisForm;
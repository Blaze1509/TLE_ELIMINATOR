import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const SkillAnalysisForm = ({ onAnalysisComplete }) => {
  const [formData, setFormData] = useState({
    mode: 'combined'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const response = await apiClient.post('/analysis/create', {
        mode: formData.mode
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        toast.success('Analysis completed successfully!');
        onAnalysisComplete();
      }
      
      // Reset form
      setFormData({
        mode: 'combined'
      });
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
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Analysis Mode *
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div
              onClick={() => setFormData(prev => ({ ...prev, mode: 'skills-only' }))}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.mode === 'skills-only'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-sm">Skills Only</h3>
                <p className="text-xs text-gray-600 mt-1">Analyze based on your current skills</p>
              </div>
            </div>
            
            <div
              onClick={() => setFormData(prev => ({ ...prev, mode: 'resume-only' }))}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.mode === 'resume-only'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📄</div>
                <h3 className="font-semibold text-sm">Resume Only</h3>
                <p className="text-xs text-gray-600 mt-1">Analyze based on your resume/CV</p>
              </div>
            </div>
            
            <div
              onClick={() => setFormData(prev => ({ ...prev, mode: 'combined' }))}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.mode === 'combined'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-sm">Combined</h3>
                <p className="text-xs text-gray-600 mt-1">Most comprehensive analysis</p>
              </div>
            </div>
          </div>
        </div>


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
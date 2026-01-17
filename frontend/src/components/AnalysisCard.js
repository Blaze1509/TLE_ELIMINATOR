import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const AnalysisCard = ({ analysis, onDelete }) => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  const handleCardClick = () => {
    navigate(`/comp/${analysis._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent card click
    
    if (!window.confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      const response = await apiClient.delete(`/analysis/${analysis._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        toast.success('Analysis deleted successfully');
        onDelete(); // Refresh the list
      }
    } catch (error) {
      toast.error('Failed to delete analysis');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {analysis.role}
          </h3>
          <p className="text-sm text-gray-600">Healthcare</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(analysis.status)}`}>
            {analysis.status}
          </span>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
            title="Delete analysis"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Readiness Score */}
      {analysis.status === 'completed' && analysis.analysisResult && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Readiness Score</span>
            <span className="text-lg font-bold text-blue-600">
              {analysis.analysisResult.readinessScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${analysis.analysisResult.readinessScore}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Skills Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{analysis.skills.length}</span> skills analyzed
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {analysis.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {analysis.skills.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{analysis.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{formatDate(analysis.createdAt)}</span>
        <span className="text-blue-600 hover:text-blue-800">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default AnalysisCard;
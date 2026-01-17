import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const response = await apiClient.get(`/analysis/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setAnalysis(response.data.analysis);
      }
    } catch (error) {
      toast.error('Failed to fetch analysis');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Analysis not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to Dashboard
        </button>

        {/* Analysis Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {analysis.role}
              </h1>
              <p className="text-gray-600">Healthcare Domain</p>
            </div>
            <div className="text-right">
              {analysis.status === 'completed' && analysis.analysisResult && (
                <div className="text-3xl font-bold text-blue-600">
                  {analysis.analysisResult.readinessScore}%
                </div>
              )}
              <p className="text-sm text-gray-500">Readiness Score</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📋 Analyzed Skills ({analysis.skills.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Document Data */}
        {analysis.documentData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📄 Extracted Document Data
            </h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {analysis.documentData}
            </p>
          </div>
        )}

        {/* Analysis Results */}
        {analysis.status === 'completed' && analysis.analysisResult && (
          <>
            {/* Skill Gaps */}
            {analysis.analysisResult.skillGaps && analysis.analysisResult.skillGaps.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  🎯 Skill Gaps
                </h2>
                <div className="space-y-2">
                  {analysis.analysisResult.skillGaps.map((gap, index) => (
                    <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-600 mr-2">⚠️</span>
                      <span className="text-red-800">{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.analysisResult.recommendations && analysis.analysisResult.recommendations.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  💡 Recommendations
                </h2>
                <div className="space-y-2">
                  {analysis.analysisResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-600 mr-2">✅</span>
                      <span className="text-green-800">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Roadmap */}
            {analysis.analysisResult.roadmap && analysis.analysisResult.roadmap.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  🗺️ Learning Roadmap
                </h2>
                <div className="space-y-3">
                  {analysis.analysisResult.roadmap.map((step, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                        {index + 1}
                      </span>
                      <span className="text-blue-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Processing State */}
        {analysis.status === 'processing' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analysis in progress...</p>
          </div>
        )}

        {/* Failed State */}
        {analysis.status === 'failed' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-red-600">Analysis failed. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisDetail;
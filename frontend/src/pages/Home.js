import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SkillAnalysisForm from '../components/SkillAnalysisForm';
import AnalysisCard from '../components/AnalysisCard';
import apiClient from '../api/apiClient';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Home = () => {
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await apiClient.get('/analysis/user-analyses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setAnalyses(response.data.analyses);
      }
    } catch (error) {
      toast.error('Failed to fetch analyses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisComplete = () => {
    fetchAnalyses(); // Refresh the analyses list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Input Form Section */}
        <SkillAnalysisForm onAnalysisComplete={handleAnalysisComplete} />
        
        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📊 Your Skill Analyses
          </h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading analyses...</p>
            </div>
          ) : analyses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-2">No analyses yet</p>
              <p className="text-sm text-gray-500">Create your first skill analysis above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyses.map((analysis) => (
                <AnalysisCard key={analysis._id} analysis={analysis} onDelete={fetchAnalyses} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
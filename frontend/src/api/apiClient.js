import axios from 'axios';
import useAuthStore from '../store/authStore';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API methods
export const api = {
  // User data
  getUserStats: () => apiClient.get('/analysis/stats'),
  getUserAnalyses: () => apiClient.get('/analysis/user'),
  
  // Analysis
  createAnalysis: (data) => apiClient.post('/analysis', data),
  getAnalysis: (id) => apiClient.get(`/analysis/${id}`),
};

export default apiClient;
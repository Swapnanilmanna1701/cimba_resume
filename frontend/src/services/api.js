import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

export const analyzeResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescription', jobDescription);
  
  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllAnalyses = async () => {
  const response = await api.get('/analyses');
  return response.data;
};

export const getAnalysisById = async (id) => {
  const response = await api.get(`/analyses/${id}`);
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;

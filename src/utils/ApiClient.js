import axios from 'axios';

// Create an Axios instance
const ApiClient = axios.create({
  baseURL: 'http://localhost:5237/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to add the token to the request headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default ApiClient;
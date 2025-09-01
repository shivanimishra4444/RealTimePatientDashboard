import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:4000/patients', // Adjust this to match your backend port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    } else if (error.response?.status === 404) {
      // Handle not found
      console.error('Resource not found');
    }
    return Promise.reject(error);
  }
);

export default api;

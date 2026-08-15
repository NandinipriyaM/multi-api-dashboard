/**
 * API Configuration
 * Centralized configuration for all API endpoints used in the application.
 * Using environment variables with fallback to default endpoints.
 * All endpoints are CORS-friendly and reliable.
 */

const API_CONFIG = {
  userApi: {
    url: import.meta.env.VITE_USER_API_URL || 'https://jsonplaceholder.typicode.com/users/1',
    title: 'User Data',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 15000,
  },
  randomApi: {
    // Primary API - JSONPlaceholder (very reliable and CORS-friendly)
    url: import.meta.env.VITE_RANDOM_API_URL || 'https://jsonplaceholder.typicode.com/posts/1',
    title: 'Random Public API',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 15000,
  },
  failingApi: {
    url: import.meta.env.VITE_FAILING_API_URL || 'https://jsonplaceholder.typicode.com/posts/invalid-endpoint',
    title: 'Failing Request',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 15000,
  },
};

export default API_CONFIG;
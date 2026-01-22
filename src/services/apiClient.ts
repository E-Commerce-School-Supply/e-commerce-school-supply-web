// src/services/api.service.ts
import axios, { 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, 
  type AxiosError 
} from 'axios';

// Type the API client instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Vue CLI provides types for process.env
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true' 
  },
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = sessionStorage.getItem('accessToken');
    
    if (token) {
      // Use the .set() method for AxiosHeaders
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    // === UPDATED LOGIC for FormData ===
    // If the request data is FormData (a file upload),
    // delete the Content-Type header.
    if (config.data instanceof FormData) {
      console.log("Content-Type is deleted!");
      
      // In axios v1+, you MUST use the .delete() method.
      // `delete config.headers['Content-Type']` will not work reliably.
      config.headers.delete('Content-Type');
    }
    // ===================================

    return config;
  },
  (error: AxiosError) => { // Type the error
    return Promise.reject(error);
  }
);

export default apiClient;
import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError } from 'axios'

// Type the API client instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Vue CLI provides types for process.env
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
})

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = sessionStorage.getItem('accessToken')

  if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    // DEBUG: log token troubleshooting
    try {
      console.debug('[apiClient] request', { 
        url: config.url, 
        tokenPreview: token ? `${token.slice(0, 8)}...` : null, 
        authorizationHeader: config.headers?.get('Authorization') 
      })
    } catch (e) { /* ignore */ }

    // ✅ FIX: Use the .delete() method if the data is FormData
    if (config.data instanceof FormData && config.headers) {
      config.headers.delete('Content-Type')
    }

    return config
  },
  (error: AxiosError) => {
    // Type the error
    return Promise.reject(error)
  },
)

export default apiClient

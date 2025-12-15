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

    // Normalize headers to a plain object and set Authorization header
    // Some Axios versions expose AxiosHeaders which implement .set/.delete,
    // but using plain property assignment is more robust across versions.
    if (!config.headers) config.headers = {}
    if (token) {
      // @ts-ignore
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // DEBUG: log token and Authorization header for troubleshooting 403s
    try {
      // eslint-disable-next-line no-console
      console.debug('[apiClient] request', { url: config.url, tokenPreview: token ? `${token.slice(0, 8)}...` : null, authorizationHeader: config.headers['Authorization'] })
    } catch (e) {
      // ignore
    }

    // If the request data is FormData (a file upload), remove Content-Type so browser sets the multipart boundary
    if (config.data instanceof FormData) {
      // @ts-ignore
      delete config.headers['Content-Type']
    }
    // ===================================

    return config
  },
  (error: AxiosError) => {
    // Type the error
    return Promise.reject(error)
  },
)

export default apiClient

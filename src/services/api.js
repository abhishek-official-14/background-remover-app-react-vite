import axios from 'axios'
import { getApiConfig } from '@lib/axiosConfig'

class ApiService {
  constructor() {
    this.api = axios.create(getApiConfig())
    this.setupInterceptors()
  }

  setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            const refreshToken = localStorage.getItem('refresh_token')
            const response = await this.api.post('/auth/refresh', { refreshToken })
            const { token } = response.data
            
            localStorage.setItem('auth_token', token)
            originalRequest.headers.Authorization = `Bearer ${token}`
            
            return this.api(originalRequest)
          } catch (refreshError) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  get(url, config = {}) {
    return this.api.get(url, config)
  }

  post(url, data = {}, config = {}) {
    return this.api.post(url, data, config)
  }

  put(url, data = {}, config = {}) {
    return this.api.put(url, data, config)
  }

  patch(url, data = {}, config = {}) {
    return this.api.patch(url, data, config)
  }

  delete(url, config = {}) {
    return this.api.delete(url, config)
  }

  upload(url, file, onProgress, config = {}) {
    const formData = new FormData()
    formData.append('file', file)
    
    return this.api.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    })
  }
}

export const api = new ApiService()
export default api
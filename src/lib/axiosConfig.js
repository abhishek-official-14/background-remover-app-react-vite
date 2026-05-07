import axios from 'axios'

export const getApiConfig = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.backgroundremover.ai'
  
  return {
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}

export const setupAxiosInterceptors = (onUnauthorized) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized?.()
      }
      return Promise.reject(error)
    }
  )
}
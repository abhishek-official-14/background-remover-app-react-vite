export const APP_CONFIG = {
  name: 'AI Background Remover',
  version: '1.0.0',
  description: 'Professional AI-powered background removal tool',
  url: 'https://backgroundremover.ai',
  supportEmail: 'support@backgroundremover.ai'
}

export const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  batchLimit: 10
}

export const PROCESSING_CONFIG = {
  defaultQuality: 0.9,
  maxWidth: 1920,
  maxHeight: 1920,
  supportedFormats: ['png', 'jpg', 'jpeg', 'webp']
}

export const STORAGE_KEYS = {
  theme: 'app_theme',
  user: 'user_data',
  preferences: 'user_preferences',
  history: 'processing_history',
  favorites: 'favorite_templates'
}

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh'
  },
  user: {
    profile: '/user/profile',
    credits: '/user/credits',
    history: '/user/history'
  },
  processing: {
    removeBackground: '/remove-background',
    batchProcess: '/batch-process',
    status: '/processing-status'
  }
}
import { useState, useCallback, useEffect } from 'react'

export const useNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission)
  const [supported, setSupported] = useState('Notification' in window)

  const requestPermission = useCallback(async () => {
    if (!supported) return false
    
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch (error) {
      console.error('Failed to request notification permission:', error)
      return false
    }
  }, [supported])

  const showNotification = useCallback((title, options = {}) => {
    if (!supported || permission !== 'granted') return
    
    try {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        silent: false,
        ...options
      })
      
      if (options.onClick) {
        notification.onclick = options.onClick
      }
      
      if (options.onClose) {
        notification.onclose = options.onClose
      }
      
      setTimeout(() => notification.close(), options.timeout || 5000)
      
      return notification
    } catch (error) {
      console.error('Failed to show notification:', error)
    }
  }, [supported, permission])

  useEffect(() => {
    if (supported && permission === 'default') {
      requestPermission()
    }
  }, [supported, permission, requestPermission])

  return {
    supported,
    permission,
    requestPermission,
    showNotification
  }
}
Services
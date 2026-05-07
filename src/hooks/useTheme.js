import { useContext, useEffect } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  useEffect(() => {
    const root = document.documentElement
    if (context.theme === 'dark') {
      root.classList.add('dark-theme')
    } else {
      root.classList.remove('dark-theme')
    }
  }, [context.theme])
  
  return context
}
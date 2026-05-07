import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@contexts/ToastContext'

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const shortcuts = {
    'ctrl+u': () => {
      document.querySelector('input[type="file"]')?.click()
      toast.success('Upload dialog opened')
    },
    'ctrl+d': () => {
      const downloadButton = document.querySelector('[data-download-btn]')
      if (downloadButton) {
        downloadButton.click()
        toast.success('Download started')
      }
    },
    'ctrl+z': () => {
      document.querySelector('[data-undo-btn]')?.click()
      toast.info('Undo action')
    },
    'ctrl+y': () => {
      document.querySelector('[data-redo-btn]')?.click()
      toast.info('Redo action')
    },
    'ctrl+s': (e) => {
      e.preventDefault()
      document.querySelector('[data-save-btn]')?.click()
      toast.success('Saved')
    },
    'ctrl+h': () => {
      navigate('/dashboard/history')
    },
    'escape': () => {
      document.querySelector('[data-close-modal]')?.click()
    },
    '?': () => {
      toast.info('Press Ctrl+/ to see all shortcuts')
    }
  }

  const getKeyCombo = useCallback((e) => {
    const keys = []
    if (e.ctrlKey) keys.push('ctrl')
    if (e.shiftKey) keys.push('shift')
    if (e.altKey) keys.push('alt')
    if (e.metaKey) keys.push('meta')
    keys.push(e.key.toLowerCase())
    return keys.join('+')
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const combo = getKeyCombo(e)
      
      if (shortcuts[combo]) {
        e.preventDefault()
        shortcuts[combo](e)
      }
      
      if (e.key === '/' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        showShortcutsHelp()
      }
    }

    const showShortcutsHelp = () => {
      const shortcutsList = Object.entries(shortcuts).map(([key, value]) => 
        `${key.toUpperCase()}: ${value.name || 'Action'}`
      ).join('\n')
      
      toast.info(`Keyboard Shortcuts:\n${shortcutsList}`, { duration: 5000 })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [getKeyCombo, shortcuts, toast])

  return shortcuts
}
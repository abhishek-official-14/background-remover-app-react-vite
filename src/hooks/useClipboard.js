import { useState, useCallback } from 'react'

export const useClipboard = () => {
  const [isSupported, setIsSupported] = useState(!!navigator.clipboard)
  const [error, setError] = useState(null)

  const readImageFromClipboard = useCallback(async () => {
    if (!isSupported) {
      setError('Clipboard API not supported')
      return null
    }

    try {
      const clipboardItems = await navigator.clipboard.read()
      
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.filter(type => type.startsWith('image/'))
        
        for (const type of imageTypes) {
          const blob = await clipboardItem.getType(type)
          const file = new File([blob], `clipboard-image.${type.split('/')[1]}`, { type })
          return file
        }
      }
      
      return null
    } catch (err) {
      setError(err.message)
      return null
    }
  }, [isSupported])

  const copyToClipboard = useCallback(async (text) => {
    if (!isSupported) {
      setError('Clipboard API not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [isSupported])

  const copyImageToClipboard = useCallback(async (blob) => {
    if (!isSupported) {
      setError('Clipboard API not supported')
      return false
    }

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [isSupported])

  return {
    isSupported,
    error,
    readImageFromClipboard,
    copyToClipboard,
    copyImageToClipboard
  }
}
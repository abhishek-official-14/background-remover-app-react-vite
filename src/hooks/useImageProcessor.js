import { useState, useCallback, useRef } from 'react'
import { processImageBackground, batchProcessImages } from '@services/backgroundRemover'
import { compressImage } from '@services/compression'

export const useImageProcessor = () => {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const abortControllerRef = useRef(null)

  const processImage = useCallback(async (file, options = {}) => {
    setProcessing(true)
    setProgress(0)
    
    try {
      abortControllerRef.current = new AbortController()
      
      let processedFile = file
      if (options.compress) {
        processedFile = await compressImage(file, {
          maxSizeMB: options.maxSizeMB || 1,
          maxWidthOrHeight: options.maxWidthOrHeight || 1920
        })
        setProgress(20)
      }
      
      const result = await processImageBackground(processedFile, {
        onProgress: (percent) => {
          setProgress(20 + (percent * 0.8))
        },
        signal: abortControllerRef.current.signal
      })
      
      setResult(result)
      setProgress(100)
      return result
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error
      }
    } finally {
      setProcessing(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }, [])

  const cancelProcessing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setProcessing(false)
      setProgress(0)
    }
  }, [])

  const processBatch = useCallback(async (files, options = {}) => {
    setProcessing(true)
    setProgress(0)
    
    try {
      const results = await batchProcessImages(files, {
        ...options,
        onProgress: (current, total) => {
          setProgress((current / total) * 100)
        }
      })
      
      setResult(results)
      return results
    } finally {
      setProcessing(false)
    }
  }, [])

  const clearResult = useCallback(() => {
    setResult(null)
  }, [])

  return {
    processing,
    progress,
    result,
    processImage,
    processBatch,
    cancelProcessing,
    clearResult
  }
}
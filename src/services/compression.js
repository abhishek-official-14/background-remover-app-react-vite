import imageCompression from 'browser-image-compression'

export const compressImage = async (file, options = {}) => {
  const defaultOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.8,
    ...options
  }
  
  try {
    const compressedFile = await imageCompression(file, defaultOptions)
    return compressedFile
  } catch (error) {
    console.error('Image compression failed:', error)
    return file
  }
}

export const getOptimizedImageUrl = (file, options = {}) => {
  const url = URL.createObjectURL(file)
  return url
}

export const revokeImageUrl = (url) => {
  if (url) {
    URL.revokeObjectURL(url)
  }
}

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({ width: img.width, height: img.height })
    }
    
    img.onerror = reject
    img.src = url
  })
}

export const resizeImage = async (file, maxWidth, maxHeight) => {
  const img = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      let width = img.width
      let height = img.height
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }
      
      canvas.width = width
      canvas.height = height
      
      ctx.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        resolve(blob)
      }, file.type, 0.9)
    }
    
    img.onerror = reject
    img.src = url
  })
}
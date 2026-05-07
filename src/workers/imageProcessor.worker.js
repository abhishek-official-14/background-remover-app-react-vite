self.addEventListener('message', async (e) => {
  const { imageData, operation, options } = e.data
  
  try {
    let result
    
    switch (operation) {
      case 'removeBackground':
        result = await removeBackground(imageData, options)
        break
      case 'compress':
        result = await compressImage(imageData, options)
        break
      case 'resize':
        result = await resizeImage(imageData, options)
        break
      default:
        throw new Error(`Unknown operation: ${operation}`)
    }
    
    self.postMessage({ success: true, result })
  } catch (error) {
    self.postMessage({ success: false, error: error.message })
  }
})

function removeBackground(imageData, options) {
  const data = imageData.data
  const threshold = options.threshold || 200
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    const brightness = (r + g + b) / 3
    
    if (brightness > threshold) {
      data[i + 3] = 0
    } else {
      data[i + 3] = 255
    }
  }
  
  return imageData
}

function compressImage(imageData, options) {
  // Simplified compression logic
  const quality = options.quality || 0.8
  const canvas = new OffscreenCanvas(imageData.width, imageData.height)
  const ctx = canvas.getContext('2d')
  
  ctx.putImageData(imageData, 0, 0)
  
  return canvas.convertToBlob({ type: 'image/jpeg', quality })
}

function resizeImage(imageData, options) {
  const maxWidth = options.maxWidth || 1920
  const maxHeight = options.maxHeight || 1920
  
  let width = imageData.width
  let height = imageData.height
  
  if (width > maxWidth) {
    height = (height * maxWidth) / width
    width = maxWidth
  }
  
  if (height > maxHeight) {
    width = (width * maxHeight) / height
    height = maxHeight
  }
  
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
  
  const tempCanvas = new OffscreenCanvas(imageData.width, imageData.height)
  const tempCtx = tempCanvas.getContext('2d')
  tempCtx.putImageData(imageData, 0, 0)
  
  ctx.drawImage(tempCanvas, 0, 0, width, height)
  
  return ctx.getImageData(0, 0, width, height)
}
Remaining Files
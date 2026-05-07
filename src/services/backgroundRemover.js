// import api from './api'
// import { compressImage } from './compression'

// class BackgroundRemoverService {
//   async removeBackground(file, options = {}) {
//     const {
//       onProgress,
//       signal,
//       localProcessing = import.meta.env.VITE_ENABLE_LOCAL_PROCESSING === 'true'
//     } = options

//     if (localProcessing) {
//       return this.processLocally(file, { onProgress, signal })
//     } else {
//       return this.processViaAPI(file, { onProgress, signal })
//     }
//   }

//   async processLocally(file, { onProgress, signal }) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         onProgress?.(10)
        
//         const img = new Image()
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')
        
//         const url = URL.createObjectURL(file)
        
//         img.onload = () => {
//           if (signal?.aborted) {
//             URL.revokeObjectURL(url)
//             reject(new Error('Processing cancelled'))
//             return
//           }
          
//           onProgress?.(30)
          
//           canvas.width = img.width
//           canvas.height = img.height
//           ctx.drawImage(img, 0, 0)
          
//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//           const processedData = this.removeBackgroundFromImageData(imageData)
          
//           onProgress?.(70)
          
//           ctx.putImageData(processedData, 0, 0)
          
//           onProgress?.(90)
          
//           canvas.toBlob((blob) => {
//             URL.revokeObjectURL(url)
//             onProgress?.(100)
//             resolve(blob)
//           }, 'image/png')
//         }
        
//         img.onerror = () => {
//           URL.revokeObjectURL(url)
//           reject(new Error('Failed to load image'))
//         }
        
//         img.src = url
        
//         signal?.addEventListener('abort', () => {
//           URL.revokeObjectURL(url)
//           reject(new Error('Processing cancelled'))
//         })
//       } catch (error) {
//         reject(error)
//       }
//     })
//   }

//   removeBackgroundFromImageData(imageData) {
//     const data = imageData.data
//     const width = imageData.width
//     const height = imageData.height
    
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i]
//       const g = data[i + 1]
//       const b = data[i + 2]
      
//       const brightness = (r + g + b) / 3
      
//       if (brightness > 200 && (Math.abs(r - g) < 30 && Math.abs(g - b) < 30)) {
//         data[i + 3] = 0
//       } else {
//         data[i + 3] = 255
//       }
//     }
    
//     return imageData
//   }

//   async processViaAPI(file, { onProgress, signal }) {
//     const formData = new FormData()
//     formData.append('image', file)
    
//     const response = await api.post('/remove-background', formData, {
//       onUploadProgress: (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//         onProgress?.(percentCompleted * 0.5)
//       },
//       signal
//     })
    
//     onProgress?.(100)
    
//     const binaryString = atob(response.data.image)
//     const bytes = new Uint8Array(binaryString.length)
//     for (let i = 0; i < binaryString.length; i++) {
//       bytes[i] = binaryString.charCodeAt(i)
//     }
    
//     return new Blob([bytes], { type: 'image/png' })
//   }

//   async batchProcessImages(files, options = {}) {
//     const results = []
//     const { onProgress } = options
    
//     for (let i = 0; i < files.length; i++) {
//       const result = await this.removeBackground(files[i], {
//         ...options,
//         onProgress: (progress) => {
//           onProgress?.(i + 1, files.length, progress)
//         }
//       })
//       results.push(result)
//       onProgress?.(i + 1, files.length, 100)
//     }
    
//     return results
//   }

//   async changeBackground(originalBlob, backgroundType, options = {}) {
//     const transparentBlob = await this.removeBackground(originalBlob, options)
    
//     const img = new Image()
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')
    
//     return new Promise((resolve, reject) => {
//       const url = URL.createObjectURL(transparentBlob)
      
//       img.onload = () => {
//         canvas.width = img.width
//         canvas.height = img.height
        
//         if (backgroundType === 'color') {
//           ctx.fillStyle = options.color || '#ffffff'
//           ctx.fillRect(0, 0, canvas.width, canvas.height)
//           ctx.drawImage(img, 0, 0)
//         } else if (backgroundType === 'gradient') {
//           const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
//           gradient.addColorStop(0, options.gradientStart || '#667eea')
//           gradient.addColorStop(1, options.gradientEnd || '#764ba2')
//           ctx.fillStyle = gradient
//           ctx.fillRect(0, 0, canvas.width, canvas.height)
//           ctx.drawImage(img, 0, 0)
//         } else if (backgroundType === 'blur') {
//           ctx.filter = 'blur(20px)'
//           ctx.drawImage(img, -img.width * 0.1, -img.height * 0.1, 
//                        img.width * 1.2, img.height * 1.2)
//           ctx.filter = 'none'
//           ctx.drawImage(img, 0, 0)
//         }
        
//         canvas.toBlob((blob) => {
//           URL.revokeObjectURL(url)
//           resolve(blob)
//         }, 'image/png')
//       }
      
//       img.onerror = reject
//       img.src = url
//     })
//   }

//   async addShadow(blob, options = {}) {
//     const img = new Image()
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')
    
//     return new Promise((resolve, reject) => {
//       const url = URL.createObjectURL(blob)
      
//       img.onload = () => {
//         canvas.width = img.width + 40
//         canvas.height = img.height + 40
        
//         ctx.shadowColor = options.color || 'rgba(0,0,0,0.3)'
//         ctx.shadowBlur = options.blur || 10
//         ctx.shadowOffsetX = options.offsetX || 5
//         ctx.shadowOffsetY = options.offsetY || 5
        
//         ctx.drawImage(img, 20, 20, img.width, img.height)
        
//         canvas.toBlob((resultBlob) => {
//           URL.revokeObjectURL(url)
//           resolve(resultBlob)
//         }, 'image/png')
//       }
      
//       img.onerror = reject
//       img.src = url
//     })
//   }
// }

// export const backgroundRemover = new BackgroundRemoverService()
// export const { removeBackground, batchProcessImages, changeBackground, addShadow } = backgroundRemover



import api from './api'
import { compressImage } from './compression'

class BackgroundRemoverService {
  async removeBackground(file, options = {}) {
    const {
      onProgress,
      signal,
      localProcessing = import.meta.env.VITE_ENABLE_LOCAL_PROCESSING === 'true'
    } = options

    if (localProcessing) {
      return this.processLocally(file, { onProgress, signal })
    } else {
      return this.processViaAPI(file, { onProgress, signal })
    }
  }

  async processLocally(file, { onProgress, signal }) {
    return new Promise(async (resolve, reject) => {
      try {
        onProgress?.(10)

        const img = new Image()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const url = URL.createObjectURL(file)

        img.onload = () => {
          if (signal?.aborted) {
            URL.revokeObjectURL(url)
            reject(new Error('Processing cancelled'))
            return
          }

          onProgress?.(30)

          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          )

          const processedData =
            this.removeBackgroundFromImageData(
              imageData
            )

          onProgress?.(70)

          ctx.putImageData(processedData, 0, 0)

          onProgress?.(90)

          canvas.toBlob((blob) => {
            URL.revokeObjectURL(url)

            onProgress?.(100)

            resolve(blob)
          }, 'image/png')
        }

        img.onerror = () => {
          URL.revokeObjectURL(url)

          reject(
            new Error('Failed to load image')
          )
        }

        img.src = url

        signal?.addEventListener('abort', () => {
          URL.revokeObjectURL(url)

          reject(
            new Error('Processing cancelled')
          )
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  removeBackgroundFromImageData(imageData) {
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      const brightness = (r + g + b) / 3

      if (
        brightness > 200 &&
        Math.abs(r - g) < 30 &&
        Math.abs(g - b) < 30
      ) {
        data[i + 3] = 0
      } else {
        data[i + 3] = 255
      }
    }

    return imageData
  }

  async processViaAPI(
    file,
    { onProgress, signal }
  ) {
    const formData = new FormData()

    formData.append('image', file)

    const response = await api.post(
      '/remove-background',
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) /
              progressEvent.total
          )

          onProgress?.(percentCompleted * 0.5)
        },

        signal
      }
    )

    onProgress?.(100)

    const binaryString = atob(
      response.data.image
    )

    const bytes = new Uint8Array(
      binaryString.length
    )

    for (
      let i = 0;
      i < binaryString.length;
      i++
    ) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return new Blob([bytes], {
      type: 'image/png'
    })
  }

  async batchProcessImages(
    files,
    options = {}
  ) {
    const results = []

    const { onProgress } = options

    for (let i = 0; i < files.length; i++) {
      const result = await this.removeBackground(
        files[i],
        {
          ...options,

          onProgress: (progress) => {
            onProgress?.(
              i + 1,
              files.length,
              progress
            )
          }
        }
      )

      results.push(result)

      onProgress?.(
        i + 1,
        files.length,
        100
      )
    }

    return results
  }

  async changeBackground(
    originalBlob,
    backgroundType,
    options = {}
  ) {
    const transparentBlob =
      await this.removeBackground(
        originalBlob,
        options
      )

    const img = new Image()

    const canvas =
      document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    return new Promise((resolve, reject) => {
      const url =
        URL.createObjectURL(transparentBlob)

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        if (backgroundType === 'color') {
          ctx.fillStyle =
            options.color || '#ffffff'

          ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
          )

          ctx.drawImage(img, 0, 0)
        } else if (
          backgroundType === 'gradient'
        ) {
          const gradient =
            ctx.createLinearGradient(
              0,
              0,
              canvas.width,
              canvas.height
            )

          gradient.addColorStop(
            0,
            options.gradientStart || '#667eea'
          )

          gradient.addColorStop(
            1,
            options.gradientEnd || '#764ba2'
          )

          ctx.fillStyle = gradient

          ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
          )

          ctx.drawImage(img, 0, 0)
        } else if (
          backgroundType === 'blur'
        ) {
          ctx.filter = 'blur(20px)'

          ctx.drawImage(
            img,
            -img.width * 0.1,
            -img.height * 0.1,
            img.width * 1.2,
            img.height * 1.2
          )

          ctx.filter = 'none'

          ctx.drawImage(img, 0, 0)
        }

        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url)

          resolve(blob)
        }, 'image/png')
      }

      img.onerror = reject

      img.src = url
    })
  }

  async addShadow(blob, options = {}) {
    const img = new Image()

    const canvas =
      document.createElement('canvas')

    const ctx = canvas.getContext('2d')

    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob)

      img.onload = () => {
        canvas.width = img.width + 40
        canvas.height = img.height + 40

        ctx.shadowColor =
          options.color ||
          'rgba(0,0,0,0.3)'

        ctx.shadowBlur =
          options.blur || 10

        ctx.shadowOffsetX =
          options.offsetX || 5

        ctx.shadowOffsetY =
          options.offsetY || 5

        ctx.drawImage(
          img,
          20,
          20,
          img.width,
          img.height
        )

        canvas.toBlob((resultBlob) => {
          URL.revokeObjectURL(url)

          resolve(resultBlob)
        }, 'image/png')
      }

      img.onerror = reject

      img.src = url
    })
  }
}

export const backgroundRemover =
  new BackgroundRemoverService()

export const {
  removeBackground,
  batchProcessImages,
  changeBackground,
  addShadow
} = backgroundRemover

export const processImageBackground =
  async (file, options = {}) => {
    return backgroundRemover.removeBackground(
      file,
      options
    )
  }

export default backgroundRemover
// import api from './api'

// class BackgroundRemoverService {
//   async removeBackground(file, options = {}) {
//     const {
//       onProgress,
//       signal,
//       localProcessing = import.meta.env.VITE_ENABLE_LOCAL_PROCESSING !== 'false'
//     } = options

//     if (localProcessing) {
//       return this.processLocally(file, { onProgress, signal })
//     }

//     try {
//       return await this.processViaAPI(file, { onProgress, signal })
//     } catch {
//       return this.processLocally(file, { onProgress, signal })
//     }
//   }

//   async processLocally(file, { onProgress, signal }) {
//     return new Promise((resolve, reject) => {
//       onProgress?.(10)

//       const img = new Image()
//       const canvas = document.createElement('canvas')
//       const ctx = canvas.getContext('2d')

//       if (!ctx) {
//         reject(new Error('Canvas context is not available'))
//         return
//       }

//       const url = URL.createObjectURL(file)

//       const abortHandler = () => {
//         URL.revokeObjectURL(url)
//         reject(new DOMException('Processing cancelled', 'AbortError'))
//       }

//       img.onload = () => {
//         if (signal?.aborted) {
//           abortHandler()
//           return
//         }

//         onProgress?.(30)
//         canvas.width = img.width
//         canvas.height = img.height
//         ctx.drawImage(img, 0, 0)

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//         const processedData = this.removeBackgroundFromImageData(imageData)
//         onProgress?.(70)

//         ctx.putImageData(processedData, 0, 0)
//         onProgress?.(90)

//         canvas.toBlob((blob) => {
//           URL.revokeObjectURL(url)
//           if (!blob) {
//             reject(new Error('Failed to generate output image'))
//             return
//           }
//           onProgress?.(100)
//           resolve(blob)
//         }, 'image/png')
//       }

//       img.onerror = () => {
//         URL.revokeObjectURL(url)
//         reject(new Error('Failed to load image'))
//       }

//       if (signal) {
//         signal.addEventListener('abort', abortHandler, { once: true })
//       }

//       img.src = url
//     })
//   }

//   removeBackgroundFromImageData(imageData) {
//     const data = imageData.data
//     for (let i = 0; i < data.length; i += 4) {
//       const r = data[i]
//       const g = data[i + 1]
//       const b = data[i + 2]
//       const brightness = (r + g + b) / 3

//       if (brightness > 200 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
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
//         const total = progressEvent.total || 1
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / total)
//         onProgress?.(Math.min(95, percentCompleted))
//       },
//       signal,
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
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
//         onProgress: (progress) => onProgress?.(i + 1, files.length, progress)
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

//     if (!ctx) {
//       throw new Error('Canvas context is not available')
//     }

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
//           ctx.drawImage(img, -img.width * 0.1, -img.height * 0.1, img.width * 1.2, img.height * 1.2)
//           ctx.filter = 'none'
//           ctx.drawImage(img, 0, 0)
//         }

//         canvas.toBlob((blob) => {
//           URL.revokeObjectURL(url)
//           if (!blob) {
//             reject(new Error('Failed to generate background output'))
//             return
//           }
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

//     if (!ctx) {
//       throw new Error('Canvas context is not available')
//     }

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
//           if (!resultBlob) {
//             reject(new Error('Failed to generate shadow output'))
//             return
//           }
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
// export const processImageBackground = async (file, options = {}) => backgroundRemover.removeBackground(file, options)
// export default backgroundRemover













import api from './api'

// ======================
// REMOVE BACKGROUND
// ======================

export const removeBackground = async (
  file,
  options = {}
) => {
  const { onProgress, signal } = options

  const formData = new FormData()

  // FastAPI expects "file"
  formData.append('file', file)

  onProgress?.(20)

  const response = await api.post(
    '/cutout',
    formData,
    {
      responseType: 'blob',

      onUploadProgress: (
        progressEvent
      ) => {
        const total =
          progressEvent.total || 1

        const percentCompleted =
          Math.round(
            (progressEvent.loaded *
              100) /
              total
          )

        onProgress?.(
          Math.min(
            95,
            percentCompleted
          )
        )
      },

      signal,

      headers: {
        'Content-Type':
          'multipart/form-data'
      }
    }
  )

  onProgress?.(100)

  return response.data
}

// ======================
// BATCH PROCESS
// ======================

export const batchProcessImages =
  async (
    files,
    options = {}
  ) => {
    const results = []

    const { onProgress } =
      options

    for (
      let i = 0;
      i < files.length;
      i++
    ) {
      const result =
        await removeBackground(
          files[i],
          {
            ...options,

            onProgress: (
              progress
            ) =>
              onProgress?.(
                i + 1,
                files.length,
                progress
              )
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

// ======================
// CHANGE BACKGROUND
// ======================

export const changeBackground =
  async ({
    file,
    bgMode = 'color',
    bgColor = '#ffffff',
    bgImage
  }) => {
    const formData =
      new FormData()

    formData.append('file', file)

    formData.append(
      'bg_mode',
      bgMode
    )

    if (bgColor) {
      formData.append(
        'bg_color',
        bgColor
      )
    }

    if (bgImage) {
      formData.append(
        'bg_image',
        bgImage
      )
    }

    const response =
      await api.post(
        '/background',
        formData,
        {
          responseType: 'blob'
        }
      )

    return response.data
  }

// ======================
// APPLY EFFECT
// ======================

export const applyEffect =
  async (
    file,
    effectType = 'blur'
  ) => {
    const formData =
      new FormData()

    formData.append('file', file)

    formData.append(
      'effect_type',
      effectType
    )

    const response =
      await api.post(
        '/effects',
        formData,
        {
          responseType: 'blob'
        }
      )

    return response.data
  }

// ======================
// ADJUST IMAGE
// ======================

export const adjustImage =
  async (
    file,
    adjustments = {}
  ) => {
    const formData =
      new FormData()

    formData.append('file', file)

    Object.entries(
      adjustments
    ).forEach(
      ([key, value]) => {
        formData.append(
          key,
          value
        )
      }
    )

    const response =
      await api.post(
        '/adjust',
        formData,
        {
          responseType: 'blob'
        }
      )

    return response.data
  }

// ======================
// ADD TEXT
// ======================

export const addText = async (
  file,
  textOptions = {}
) => {
  const formData =
    new FormData()

  formData.append('file', file)

  Object.entries(
    textOptions
  ).forEach(
    ([key, value]) => {
      formData.append(
        key,
        value
      )
    }
  )

  const response =
    await api.post(
      '/design',
      formData,
      {
        responseType: 'blob'
      }
    )

  return response.data
}

// ======================
// ADD SHADOW
// ======================

export const addShadow = async (
  blob,
  options = {}
) => {
  const img = new Image()

  const canvas =
    document.createElement(
      'canvas'
    )

  const ctx =
    canvas.getContext('2d')

  if (!ctx) {
    throw new Error(
      'Canvas context is not available'
    )
  }

  return new Promise(
    (resolve, reject) => {
      const url =
        URL.createObjectURL(blob)

      img.onload = () => {
        canvas.width =
          img.width + 40

        canvas.height =
          img.height + 40

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

        canvas.toBlob(
          (resultBlob) => {
            URL.revokeObjectURL(
              url
            )

            if (!resultBlob) {
              reject(
                new Error(
                  'Failed to generate shadow output'
                )
              )

              return
            }

            resolve(resultBlob)
          },
          'image/png'
        )
      }

      img.onerror = reject

      img.src = url
    }
  )
}

// ======================
// DEFAULT EXPORT
// ======================

export const processImageBackground =
  async (file, options = {}) => {
    return removeBackground(
      file,
      options
    )
  }

const backgroundRemover = {
  removeBackground,
  batchProcessImages,
  changeBackground,
  applyEffect,
  adjustImage,
  addText,
  addShadow
}

export default backgroundRemover
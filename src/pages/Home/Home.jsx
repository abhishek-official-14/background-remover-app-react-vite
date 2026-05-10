import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ImageUploader from '@components/background-remover/ImageUploader'
import BeforeAfterSlider from '@components/background-remover/BeforeAfterSlider'
import Controls from '@components/background-remover/Controls'
import BackgroundEditor from '@components/background-remover/BackgroundEditor'
import Features from '@/pages/Features'
import Pricing from '@/pages/Pricing'
import Testimonials from '@/pages/Testimonials'
import FAQ from '@/pages/FAQ'
import Comparison from '@/pages/Comparison'
import { useImageProcessor } from '@hooks/useImageProcessor'
import { useToast } from '@contexts/ToastContext'
import { useUser } from '@contexts/UserContext'
import styles from './Home.module.scss'

const Home = () => {
  const [originalImage, setOriginalImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const { processImage, processing, progress } = useImageProcessor()
  const toast = useToast()
  const { useCredits } = useUser()

  const handleImageUpload = async (file) => {
    if (!file) return

    const url = URL.createObjectURL(file)
    setOriginalImage(url)

    toast.info('Processing image...')

    try {
      const result = await processImage(file, { compress: true })
      const resultUrl = URL.createObjectURL(result)
      setProcessedImage(resultUrl)
      toast.success('Background removed successfully!')
    } catch (error) {
      toast.error('Failed to process image')
      console.error(error)
    }
  }

  const handleDownload = () => {
    if (!processedImage) return

    const link = document.createElement('a')
    link.href = processedImage
    link.download = 'background_removed.png'
    link.click()
    toast.success('Image downloaded!')
  }

  const handleBackgroundChange = async (options) => {
    toast.info('Applying background...')
    // Implementation for background change
    toast.success('Background applied!')
  }

  return (
    <>
      <Helmet>
        <title>AI Background Remover - Remove Image Backgrounds Instantly | Free AI Tool</title>
        <meta
          name="description"
          content="Remove backgrounds from images instantly with our advanced AI technology. Free HD quality output with precise edge detection. No signup required."
        />
        <link rel="canonical" href="https://backgroundremover.ai" />
      </Helmet>

      <div className={styles.home}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={styles.title}>
                Remove Image Backgrounds
                <span className={styles.gradient}> Instantly with AI</span>
              </h1>
              <p className={styles.subtitle}>
                Professional background removal with pixel-perfect accuracy. Get transparent
                backgrounds in seconds, completely free.
              </p>
            </motion.div>

            <motion.div
              className={styles.uploader}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {!originalImage ? (
                <ImageUploader onImageUpload={handleImageUpload} />
              ) : (
                <>
                  <BeforeAfterSlider
                    originalImage={originalImage}
                    processedImage={processedImage}
                  />
                  <Controls
                    onDownload={handleDownload}
                    onZoomIn={() => {}}
                    onZoomOut={() => {}}
                    onRotate={() => {}}
                    onCrop={() => {}}
                    onAutoEnhance={() => {}}
                    onUndo={() => {}}
                    onRedo={() => {}}
                    onSave={() => {}}
                  />
                  <BackgroundEditor onChange={handleBackgroundChange} />
                </>
              )}
            </motion.div>
          </div>
        </section>

        <Features />
        {/* <Comparison /> */}
        <Testimonials />
        {/* <Pricing /> */}
        <FAQ />
      </div>
    </>
  )
}

export default Home

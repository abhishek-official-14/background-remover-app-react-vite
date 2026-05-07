import React from 'react'
import { FiX, FiCheck } from 'react-icons/fi'
import styles from './Comparison.module.scss'

const features = [
  { name: 'HD Quality Output', ours: true, removebg: true },
  { name: 'Batch Processing', ours: true, removebg: false },
  { name: 'Free Credits', ours: 5, removebg: 0 },
  { name: 'AI Edge Detection', ours: true, removebg: true },
  { name: 'Hair & Fur Segmentation', ours: true, removebg: false },
  { name: 'API Access', ours: true, removebg: true },
  { name: 'Background Templates', ours: true, removebg: false },
  { name: 'Image Compression', ours: true, removebg: false },
  { name: '24/7 Support', ours: true, removebg: false },
  { name: 'Privacy Mode', ours: true, removebg: false },
]

const Comparison = () => {
  const renderValue = (value) => {
    if (value === true) return <FiCheck className={styles.check} />
    if (value === false) return <FiX className={styles.close} />
    return <span className={styles.value}>{value}</span>
  }

  return (
    <section className={styles.comparison}>
      <div className="container">
        <h2 className="section-title">Why Choose Us Over Remove.bg?</h2>
        <p className="section-subtitle">
          See how we compare to the competition
        </p>

        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.feature}>Feature</div>
            <div className={styles.ours}>AI Background Remover</div>
            <div className={styles.them}>Remove.bg</div>
          </div>

          {features.map((feature, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.feature}>{feature.name}</div>
              <div className={styles.ours}>{renderValue(feature.ours)}</div>
              <div className={styles.them}>{renderValue(feature.them)}</div>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          * Based on feature comparison as of January 2026
        </div>
      </div>
    </section>
  )
}

export default Comparison
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FiDownload,
//   FiZoomIn,
//   FiZoomOut,
//   FiRotateCw,
//   FiCrop,
//   FiZap,
//   FiUndo,
//   FiRedo,
//   FiSave,
// } from "react-icons/fi";
// import Button from "@components/common/Button";
// import styles from "./Controls.module.scss";

// const Controls = ({
//   onDownload,
//   onZoomIn,
//   onZoomOut,
//   onRotate,
//   onCrop,
//   onAutoEnhance,
//   onUndo,
//   onRedo,
//   onSave,
// }) => {
//   const [autoEnhancing, setAutoEnhancing] = useState(false);

//   const handleAutoEnhance = async () => {
//     setAutoEnhancing(true);
//     await onAutoEnhance();
//     setAutoEnhancing(false);
//   };

//   return (
//     <div className={styles.controls}>
//       <div className={styles.group}>
//         <Button variant="primary" onClick={onDownload} icon={FiDownload}>
//           Download
//         </Button>
//         <Button variant="secondary" onClick={onSave} icon={FiSave}>
//           Save
//         </Button>
//       </div>

//       <div className={styles.divider} />

//       <div className={styles.group}>
//         <Button
//           variant="outline"
//           onClick={onZoomIn}
//           icon={FiZoomIn}
//           size="sm"
//         />
//         <Button
//           variant="outline"
//           onClick={onZoomOut}
//           icon={FiZoomOut}
//           size="sm"
//         />
//         <Button
//           variant="outline"
//           onClick={onRotate}
//           icon={FiRotateCw}
//           size="sm"
//         />
//         <Button variant="outline" onClick={onCrop} icon={FiCrop} size="sm" />
//       </div>

//       <div className={styles.divider} />

//       <div className={styles.group}>
//         <Button variant="outline" onClick={onUndo} icon={FiUndo} size="sm" />
//         <Button variant="outline" onClick={onRedo} icon={FiRedo} size="sm" />
//       </div>

//       <div className={styles.divider} />

//       <div className={styles.group}>
//         <Button
//           variant="secondary"
//           onClick={handleAutoEnhance}
//           icon={FiZap}
//           loading={autoEnhancing}
//         >
//           Auto Enhance
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Controls;

import React, { useState } from 'react'
import { motion } from 'framer-motion'

import {
  FiDownload,
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
  FiRotateCcw,
  FiCrop,
  FiZap,
  FiRefreshCw,
  FiSave,
} from 'react-icons/fi'

import Button from '@components/common/Button'
import styles from './Controls.module.scss'

const Controls = ({
  onDownload,
  onZoomIn,
  onZoomOut,
  onRotate,
  onCrop,
  onAutoEnhance,
  onUndo,
  onRedo,
  onSave,
}) => {
  const [autoEnhancing, setAutoEnhancing] = useState(false)

  const handleAutoEnhance = async () => {
    setAutoEnhancing(true)

    await onAutoEnhance?.()

    setAutoEnhancing(false)
  }

  return (
    <div className={styles.controls}>
      <div className={styles.group}>
        <Button variant="primary" onClick={onDownload} icon={FiDownload}>
          Download
        </Button>

        <Button variant="secondary" onClick={onSave} icon={FiSave}>
          Save
        </Button>
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <Button variant="outline" onClick={onZoomIn} icon={FiZoomIn} size="sm" />

        <Button variant="outline" onClick={onZoomOut} icon={FiZoomOut} size="sm" />

        <Button variant="outline" onClick={onRotate} icon={FiRotateCw} size="sm" />

        <Button variant="outline" onClick={onCrop} icon={FiCrop} size="sm" />
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <Button variant="outline" onClick={onUndo} icon={FiRotateCcw} size="sm" />

        <Button variant="outline" onClick={onRedo} icon={FiRefreshCw} size="sm" />
      </div>

      <div className={styles.divider} />

      <div className={styles.group}>
        <Button
          variant="secondary"
          onClick={handleAutoEnhance}
          icon={FiZap}
          loading={autoEnhancing}
        >
          Auto Enhance
        </Button>
      </div>
    </div>
  )
}

export default Controls

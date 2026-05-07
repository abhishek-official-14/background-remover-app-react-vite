import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiDownload, FiLoader } from "react-icons/fi";
import Button from "@components/common/Button";
import styles from "./BatchProcessor.module.scss";

const BatchProcessor = ({
  files,
  onProcess,
  onRemove,
  processing,
  progress,
}) => {
  const [processingFiles, setProcessingFiles] = useState(false);

  const handleProcessAll = async () => {
    setProcessingFiles(true);
    await onProcess();
    setProcessingFiles(false);
  };

  return (
    <div className={styles.batchProcessor}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Batch Processing ({files.length} files)
        </h3>
        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={handleProcessAll}
            loading={processingFiles}
            disabled={files.length === 0}
          >
            Process All
          </Button>
        </div>
      </div>

      <div className={styles.fileList}>
        {files.map((file, index) => (
          <motion.div
            key={file.id || index}
            className={styles.fileItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.fileInfo}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>

            {progress[index] !== undefined && (
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress[index]}%` }}
                />
              </div>
            )}

            <button
              className={styles.removeBtn}
              onClick={() => onRemove(index)}
            >
              <FiTrash2 />
            </button>
          </motion.div>
        ))}
      </div>

      {files.length === 0 && (
        <div className={styles.empty}>
          <p>No files added yet</p>
        </div>
      )}
    </div>
  );
};

export default BatchProcessor;

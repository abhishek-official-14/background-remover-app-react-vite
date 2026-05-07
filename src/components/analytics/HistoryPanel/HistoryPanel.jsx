import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiTrash2, FiEye } from "react-icons/fi";
import { storage } from "@services/storage";
import styles from "./HistoryPanel.module.scss";

const HistoryPanel = ({ onSelect }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const items = storage.getProcessingHistory();
    setHistory(items);
  };

  const handleDelete = (id) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    storage.setItem("history", updated);
  };

  const handleDownload = (item) => {
    const link = document.createElement("a");
    link.href = item.processedImage;
    link.download = `processed_${item.id}.png`;
    link.click();
  };

  if (history.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No processing history yet</p>
        <p className={styles.hint}>Process an image to see it here</p>
      </div>
    );
  }

  return (
    <div className={styles.history}>
      <h3 className={styles.title}>Recent Processed Images</h3>

      <div className={styles.list}>
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            className={styles.item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <img
              src={item.processedImage}
              alt="Processed"
              className={styles.thumbnail}
              onClick={() => onSelect?.(item.processedImage)}
            />
            <div className={styles.info}>
              <div className={styles.date}>
                {new Date(item.timestamp).toLocaleDateString()}
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => onSelect?.(item.processedImage)}
                  className={styles.actionBtn}
                >
                  <FiEye />
                </button>
                <button
                  onClick={() => handleDownload(item)}
                  className={styles.actionBtn}
                >
                  <FiDownload />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className={`${styles.actionBtn} ${styles.danger}`}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;

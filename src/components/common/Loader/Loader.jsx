import React from "react";
import { motion } from "framer-motion";
import styles from "./Loader.module.scss";

const Loader = ({ size = "md", fullScreen = false }) => {
  const loader = (
    <div className={`${styles.loader} ${styles[size]}`}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullScreen}>{loader}</div>;
  }

  return loader;
};

export default Loader;

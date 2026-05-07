import React from "react";
import { motion } from "framer-motion";
import styles from "./Card.module.scss";

const Card = ({
  children,
  className = "",
  hoverable = true,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      className={`${styles.card} ${hoverable ? styles.hoverable : ""} ${className}`}
      whileHover={hoverable ? { y: -5, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

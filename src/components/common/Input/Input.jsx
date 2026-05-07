import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

const Input = forwardRef(
  ({ label, error, icon: Icon, className = "", ...props }, ref) => {
    return (
      <div className={`${styles.inputGroup} ${className}`}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          {Icon && <Icon className={styles.icon} />}
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.error : ""} ${Icon ? styles.withIcon : ""}`}
            {...props}
          />
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

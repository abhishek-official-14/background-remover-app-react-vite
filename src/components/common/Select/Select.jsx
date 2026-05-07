import React, { forwardRef } from "react";
import styles from "./Select.module.scss";

const Select = forwardRef(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className={`${styles.selectGroup} ${className}`}>
        {label && <label className={styles.label}>{label}</label>}
        <select
          ref={ref}
          className={`${styles.select} ${error ? styles.error : ""}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;

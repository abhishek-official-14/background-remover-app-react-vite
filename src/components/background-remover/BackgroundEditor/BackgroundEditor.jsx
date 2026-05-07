import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Button from "@components/common/Button";
import Select from "@components/common/Select";
import styles from "./BackgroundEditor.module.scss";

const BackgroundEditor = ({ onChange, currentBackground }) => {
  const [backgroundType, setBackgroundType] = useState("transparent");
  const [color, setColor] = useState("#667eea");
  const [gradientStart, setGradientStart] = useState("#667eea");
  const [gradientEnd, setGradientEnd] = useState("#764ba2");
  const [blurAmount, setBlurAmount] = useState(20);

  const backgroundOptions = [
    { value: "transparent", label: "Transparent" },
    { value: "color", label: "Solid Color" },
    { value: "gradient", label: "Gradient" },
    { value: "blur", label: "Blur Background" },
  ];

  const handleApply = () => {
    onChange({
      type: backgroundType,
      color,
      gradientStart,
      gradientEnd,
      blurAmount,
    });
  };

  return (
    <div className={styles.editor}>
      <h3 className={styles.title}>Background Editor</h3>

      <div className={styles.field}>
        <label className={styles.label}>Background Type</label>
        <Select
          options={backgroundOptions}
          value={backgroundType}
          onChange={(e) => setBackgroundType(e.target.value)}
        />
      </div>

      {backgroundType === "color" && (
        <div className={styles.field}>
          <label className={styles.label}>Pick Color</label>
          <HexColorPicker color={color} onChange={setColor} />
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: color }}
          />
        </div>
      )}

      {backgroundType === "gradient" && (
        <>
          <div className={styles.field}>
            <label className={styles.label}>Gradient Start</label>
            <HexColorPicker color={gradientStart} onChange={setGradientStart} />
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: gradientStart }}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Gradient End</label>
            <HexColorPicker color={gradientEnd} onChange={setGradientEnd} />
            <div
              className={styles.colorPreview}
              style={{ backgroundColor: gradientEnd }}
            />
          </div>
        </>
      )}

      {backgroundType === "blur" && (
        <div className={styles.field}>
          <label className={styles.label}>Blur Amount: {blurAmount}px</label>
          <input
            type="range"
            min="0"
            max="50"
            value={blurAmount}
            onChange={(e) => setBlurAmount(parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>
      )}

      <Button onClick={handleApply} variant="primary" fullWidth>
        Apply Background
      </Button>
    </div>
  );
};

export default BackgroundEditor;

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUpload, FiImage } from "react-icons/fi";
import { useClipboard } from "@hooks/useClipboard";
import { useToast } from "@contexts/ToastContext";
import styles from "./ImageUploader.module.scss";

const ImageUploader = ({
  onImageUpload,
  multiple = false,
  accept = "image/*",
}) => {
  const { readImageFromClipboard } = useClipboard();
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        toast.error(
          "Invalid file type. Please upload JPG, PNG, or WEBP images.",
        );
        return;
      }

      onImageUpload(multiple ? acceptedFiles : acceptedFiles[0]);
    },
    [onImageUpload, multiple, toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple,
    maxSize: 10485760, // 10MB
  });

  const handlePaste = async () => {
    const file = await readImageFromClipboard();
    if (file) {
      onImageUpload(multiple ? [file] : file);
      toast.success("Image pasted from clipboard");
    } else {
      toast.error("No image found in clipboard");
    }
  };

  return (
    <div className={styles.uploader}>
      <motion.div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ""}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <FiUpload className={styles.icon} />
        <h3 className={styles.title}>
          {isDragActive ? "Drop your images here" : "Drag & drop images here"}
        </h3>
        <p className={styles.subtitle}>or click to browse</p>
        <div className={styles.formats}>
          Supports: JPG, PNG, WEBP (Max 10MB)
        </div>
      </motion.div>

      <button onClick={handlePaste} className={styles.pasteBtn}>
        <FiImage /> Paste from Clipboard
      </button>
    </div>
  );
};

export default ImageUploader;

import React from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiShield,
  FiGlobe,
  FiCpu,
  FiLock,
  FiCloud,
} from "react-icons/fi";
import Card from "@components/common/Card";
import styles from "./Features.module.scss";

const features = [
  {
    icon: FiZap,
    title: "Lightning Fast",
    description: "Process images in seconds with our advanced AI technology",
  },
  {
    icon: FiCpu,
    title: "AI-Powered",
    description:
      "State-of-the-art AI for precise edge detection and hair segmentation",
  },
  {
    icon: FiShield,
    title: "Privacy First",
    description: "Your images are automatically deleted after processing",
  },
  {
    icon: FiGlobe,
    title: "Batch Processing",
    description: "Process multiple images simultaneously",
  },
  {
    icon: FiLock,
    title: "Secure",
    description: "Enterprise-grade security for all your images",
  },
  {
    icon: FiCloud,
    title: "Cloud Sync",
    description: "Access your processed images from anywhere",
  },
];

const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="section-title">Powerful Features</h2>
        <p className="section-subtitle">
          Everything you need for professional background removal
        </p>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={styles.featureCard}>
                <feature.icon className={styles.icon} />
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiImage,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import Card from "@components/common/Card";
import styles from "./AnalyticsDashboard.module.scss";

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalCreditsUsed: 0,
    averageProcessingTime: 0,
    totalUsers: 0,
    revenue: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    // Fetch analytics data
    const fetchStats = async () => {
      // Simulated data - replace with API call
      setStats({
        totalImages: 15420,
        totalCreditsUsed: 28450,
        averageProcessingTime: 2.3,
        totalUsers: 3840,
        revenue: 28940,
        satisfaction: 98.5,
      });
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      icon: FiImage,
      label: "Images Processed",
      value: stats.totalImages.toLocaleString(),
      color: "#667eea",
    },
    {
      icon: FiTrendingUp,
      label: "Credits Used",
      value: stats.totalCreditsUsed.toLocaleString(),
      color: "#10b981",
    },
    {
      icon: FiClock,
      label: "Avg. Processing",
      value: `${stats.averageProcessingTime}s`,
      color: "#f59e0b",
    },
    {
      icon: FiUsers,
      label: "Active Users",
      value: stats.totalUsers.toLocaleString(),
      color: "#3b82f6",
    },
    {
      icon: FiDollarSign,
      label: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      color: "#8b5cf6",
    },
    {
      icon: FiBarChart2,
      label: "Satisfaction",
      value: `${stats.satisfaction}%`,
      color: "#ec489a",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Analytics Dashboard</h2>
        <p className={styles.subtitle}>
          Your processing statistics at a glance
        </p>
      </div>

      <div className={styles.grid}>
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{ background: `${stat.color}20`, color: stat.color }}
              >
                <stat.icon />
              </div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

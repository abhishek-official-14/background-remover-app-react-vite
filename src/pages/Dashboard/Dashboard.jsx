import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import AnalyticsDashboard from "@components/analytics/AnalyticsDashboard";
import HistoryPanel from "@components/analytics/HistoryPanel";
import BatchProcessor from "@components/background-remover/BatchProcessor";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const tabs = [
    { id: "analytics", label: "Analytics" },
    { id: "history", label: "History" },
    { id: "batch", label: "Batch Processing" },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Background Remover</title>
      </Helmet>

      <div className={styles.dashboard}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>
              Manage your images and track your usage
            </p>
          </div>

          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.content}>
            {activeTab === "analytics" && <AnalyticsDashboard />}
            {activeTab === "history" && <HistoryPanel />}
            {activeTab === "batch" && (
              <BatchProcessor
                files={[]}
                onProcess={() => {}}
                onRemove={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

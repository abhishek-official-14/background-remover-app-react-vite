import React, { createContext, useContext, useState, useCallback } from "react";

const ProcessingContext = createContext();

export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (!context) {
    throw new Error("useProcessing must be used within ProcessingProvider");
  }
  return context;
};

export const ProcessingProvider = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(null);
  const [queue, setQueue] = useState([]);

  const startProcessing = useCallback((taskId, totalItems = 1) => {
    setIsProcessing(true);
    setProgress(0);
    setCurrentTask({ id: taskId, total: totalItems, completed: 0 });
  }, []);

  const updateProgress = useCallback((completed, total) => {
    const percentage = (completed / total) * 100;
    setProgress(percentage);
    setCurrentTask((prev) => ({ ...prev, completed }));
  }, []);

  const finishProcessing = useCallback(() => {
    setIsProcessing(false);
    setProgress(0);
    setCurrentTask(null);
  }, []);

  const addToQueue = useCallback((item) => {
    setQueue((prev) => [...prev, item]);
  }, []);

  const removeFromQueue = useCallback((itemId) => {
    setQueue((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const value = {
    isProcessing,
    progress,
    currentTask,
    queue,
    startProcessing,
    updateProgress,
    finishProcessing,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };

  return (
    <ProcessingContext.Provider value={value}>
      {children}
    </ProcessingContext.Provider>
  );
};
Hooks;

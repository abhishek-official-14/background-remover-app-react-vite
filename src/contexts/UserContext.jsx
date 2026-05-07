import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@services/api";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchUser();
      fetchCredits();
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("/user/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCredits = async () => {
    try {
      const response = await api.get("/user/credits");
      setCredits(response.data.credits);
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get("/user/history");
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("auth_token", token);
      setUser(user);
      await fetchCredits();
      await fetchHistory();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setCredits(0);
    setHistory([]);
  };

  const useCredits = async (amount = 1) => {
    if (credits >= amount) {
      setCredits((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const value = {
    user,
    credits,
    history,
    loading,
    login,
    logout,
    useCredits,
    refreshHistory: fetchHistory,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

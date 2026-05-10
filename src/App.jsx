import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@components/layout/Layout";
import { useKeyboardShortcuts } from "@hooks/useKeyboardShortcuts";
import { useAnalytics } from "@services/analytics";
import LoadingSpinner from "@components/common/Loader";

const Home = lazy(() => import("@pages/Home"));
const Dashboard = lazy(() => import("@pages/Dashboard"));
const Pricing = lazy(() => import("@pages/Pricing"));
const Blog = lazy(() => import("@pages/Blog"));
const Privacy = lazy(() => import("@pages/Privacy"));
const Comparison = lazy(() => import("@pages/Comparison"));

function App() {
  useKeyboardShortcuts();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, [trackPageView]);

  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/comparison" element={<Comparison />} />
          </Routes>
        </Suspense>
      </Layout>
    </AnimatePresence>
  );
}

export default App;

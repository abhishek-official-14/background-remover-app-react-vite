import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { appRoutes } from "@/config/navigation";
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
            {appRoutes.map((route) => {
              const pageMap = {
                home: <Home />,
                dashboard: <Dashboard />,
                pricing: <Pricing />,
                blog: <Blog />,
                privacy: <Privacy />,
              };

              return <Route key={route.path} path={route.path} element={pageMap[route.elementKey]} />;
            })}
          </Routes>
        </Suspense>
      </Layout>
    </AnimatePresence>
  );
}

export default App;

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import { BackgroundEffects } from "./effects/BackgroundEffects";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export function ClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("base");
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    setMounted(true);
    setCurrentBreakpoint(getBreakpoint());
    const calculateHeaderHeight = () => {
      const width = window.innerWidth;
      if (width < 640) return 56; // For mobile
      if (width < 1024) return 64; // For tablet
      return 72; // For desktop
    };

    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint());
      setHeaderHeight(calculateHeaderHeight()); // Set height based on window size
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial height
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth =
    {
      base: "100%",
      sm: "360px",
      md: "384px",
      lg: "448px",
      xl: "512px",
    }[currentBreakpoint] || "100%";

  const layout = (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className="flex-grow flex relative sm:overflow-x-auto"
        style={{ marginTop: `${headerHeight}px` }}
      >
        <motion.div
          className="flex-grow relative"
          animate={{
            marginRight: isSidebarOpen
              ? currentBreakpoint === "base"
                ? "0"
                : sidebarWidth
              : "0px",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              right: isSidebarOpen ? `-${sidebarWidth}` : "0px",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {/* <ContentEffects /> */}
          </motion.div>
          <div className="absolute inset-0 z-0">
            <BackgroundEffects />
          </div>
          <main className="relative z-10 flex items-center justify-center w-full min-h-[calc(100vh-8rem)] p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">{children}</div>
          </main>
        </motion.div>

        <motion.div
          className="fixed top-0 right-0 bottom-0 z-[1000]"
          initial={{ x: "100%" }}
          animate={{
            x: isSidebarOpen ? 0 : "100%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            className={`w-[100%] h-full overflow-y-auto`}
          />
        </motion.div>
      </div>
      {/* <Footer /> */}
    </div>
  );

  if (!mounted) {
    return layout;
  }

  return layout;
}

function getBreakpoint() {
  if (typeof window === "undefined") return "base";

  const width = window.innerWidth;
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "base";
}

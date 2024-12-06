"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import AddFundsButton from "./wallet/AddFundsButton";
import History from "./wallet/History";
import Overview from "./wallet/Overview";
import WalletHeader from "./wallet/WalletHeader";

export default function Sidebar({ isOpen, onClose }) {
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState("overview");
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const width = window.innerWidth;
      if (width < 640) return 56;
      if (width < 1024) return 64;
      return 72;
    };

    const handleResize = () => {
      setHeaderHeight(calculateHeaderHeight());
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-[90%] sm:w-[360px] md:w-[384px] lg:w-[448px] xl:w-[512px] bg-gradient-to-br from-[#1a2c38] to-[#0d1b24] overflow-hidden z-[1000] shadow-2xl"
        >
          <div className="h-full flex flex-col overflow-y-auto">
            <WalletHeader
              publicKey={publicKey}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onClose={onClose}
              headerHeight={headerHeight}
            />

            <div className="h-full flex flex-col bg-[#0d1b24] shadow-lg">
              <div className="flex-grow">
                <div className="p-4 sm:p-6 space-y-6">
                  {activeTab === "overview" ? <Overview /> : <History />}
                </div>
              </div>

              <AddFundsButton />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

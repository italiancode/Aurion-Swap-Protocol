"use client";

import { motion } from "framer-motion";
import {
  X,
  Wallet,
  History,
  ChevronRight,
  Plus,
  Send,
  ReceiptIcon as Receive,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar({ isOpen, onClose }) {
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
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-[100%] sm:w-[320px] md:w-[384px] lg:w-[448px] xl:w-[512px] bg-[#1a2c38] border-l border-[#4fc3f7]/20 overflow-hidden z-[1000]"
      style={{
        background:
          "linear-gradient(to right, rgba(26, 44, 56, 0.8), rgba(26, 44, 56, 0.5))",
        backdropFilter: "blur(15px)",
      }}
    >
      <div className="h-full flex flex-col">
        <header className="shrink-0" style={{ height: `${headerHeight}px` }}>
          <div className="h-full px-4 sm:px-6 flex items-center justify-between">
            {activeTab === "history" ? (
              <motion.button
                className="flex items-center gap-2 text-[#4fc3f7]"
                onClick={() => setActiveTab("overview")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
                <span className="text-lg font-medium">Back to Wallet</span>
              </motion.button>
            ) : (
              <div className="flex items-center gap-2 text-[#4fc3f7]">
                <Wallet className="h-5 w-5" />
                <h2 className="text-lg font-medium">Wallet</h2>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("history")}
                className={`p-2 text-[#4fc3f7] hover:bg-[#1e88e5]/20 rounded-lg transition-colors ${
                  activeTab === "history" ? "bg-[#1e88e5]/20" : ""
                }`}
                aria-label="View History"
              >
                <History className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-[#4fc3f7] hover:bg-[#1e88e5]/20 rounded-lg transition-colors"
                aria-label="Close Sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="h-full flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <div className="p-4 sm:p-6 space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="bg-[#1e88e5]/30 rounded-lg p-4">
                    <div className="text-sm text-[#4fc3f7]/70 mb-1">
                      Balance
                    </div>
                    <div className="text-2xl font-medium text-[#4fc3f7]">
                      0.00 SOL
                    </div>
                    <div className="text-[#4fc3f7]/50 mt-2">≈ $0.00 USD</div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <ActionButton
                      icon={<Send className="h-4 w-4" />}
                      label="Send"
                    />
                    <ActionButton
                      icon={<Receive className="h-4 w-4" />}
                      label="Receive"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {activeTab === "overview" && <TokensContent />}
                {activeTab === "history" && <HistoryContent />}
              </div>
            </div>
          </div>

          <div className="shrink-0 p-4 sm:p-6">
            <button className="w-full bg-[#4fc3f7] text-[#1a2c38] py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#4fc3f7]/90 transition-colors">
              <Plus className="h-5 w-5" />
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button
      className="p-2 bg-[#4fc3f7]/20 rounded-full text-[#4fc3f7] hover:bg-[#4fc3f7]/30 transition-colors"
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

function HistoryContent() {
  const transactions = [
    { type: "Received", amount: "100 SOL", date: "2023-06-15" },
    { type: "Sent", amount: "50 SOL", date: "2023-06-14" },
    { type: "Swapped", amount: "200 SOL to 4000 USDC", date: "2023-06-13" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[#4fc3f7] font-bold text-lg">Transaction History</h3>
      {transactions.map((tx, index) => (
        <div
          key={index}
          className="bg-[#1e88e5]/10 rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <div className="text-[#4fc3f7] font-medium">{tx.type}</div>
            <div className="text-[#4fc3f7]/50 text-sm">{tx.date}</div>
          </div>
          <div className="text-[#4fc3f7]">{tx.amount}</div>
        </div>
      ))}
    </div>
  );
}

function TokensContent() {
  const tokens = [
    { symbol: "SOL", balance: "100", usdValue: "$2,345" },
    { symbol: "USDC", balance: "4000", usdValue: "$4,000" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[#4fc3f7] font-bold text-lg">Holdings</h3>
      {tokens.map((token, index) => (
        <div
          key={index}
          className="bg-[#1e88e5]/10 rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <div className="text-[#4fc3f7] font-medium">{token.symbol}</div>
            <div className="text-[#4fc3f7]/50 text-sm">{token.usdValue}</div>
          </div>
          <div className="text-[#4fc3f7]">{token.balance}</div>
        </div>
      ))}
    </div>
  );
}

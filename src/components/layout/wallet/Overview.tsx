"use client";

import { motion } from "framer-motion";
import { Send, ReceiptIcon as Receive, TrendingUp } from "lucide-react";
import ActionButton from "./ActionButton";
import TokensContent from "./TokensContent";
// import { useTokenContext } from "@/context/TokenContext";

export default function Overview() {
  // const { tokenData, refreshTokenData } = useTokenContext();

  return (
    <div className="space-y-4">
      <motion.div
        className="bg-gradient-to-r from-[#1e88e5]/30 to-[#4fc3f7]/30 rounded-2xl p-6 sm:p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-row items-end justify-between">
          <div>
            <div className="text-sm text-[#4fc3f7]/70 mb-1">Total Balance</div>
            <div className="text-3xl font-bold text-[#4fc3f7]">0.00 SOL</div>
            <div className="text-[#4fc3f7]/50 mt-2 flex items-center">
              ≈ $0.00 USD
              <span className="ml-2 text-green-400 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                0.00%
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 sm:flex-nowrap">
              <ActionButton icon={<Send className="h-5 w-5" />} label="Send" />
              <ActionButton
                icon={<Receive className="h-5 w-5" />}
                label="Receive"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <TokensContent />
    </div>
  );
}

'use client'

import { motion } from "framer-motion"

export default function History() {
  const transactions = [
    { type: "Received", amount: "100 SOL", date: "2023-06-15" },
    { type: "Sent", amount: "50 SOL", date: "2023-06-14" },
    { type: "Swapped", amount: "200 SOL to 4000 USDC", date: "2023-06-13" },
  ]

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-[#4fc3f7] font-bold text-xl mb-4">
        Transaction History
      </h3>
      {transactions.map((tx, index) => (
        <motion.div
          key={index}
          className="bg-[#1e88e5]/10 rounded-lg p-4 flex justify-between items-center hover:bg-[#1e88e5]/20 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div>
            <div className="text-[#4fc3f7] font-medium">{tx.type}</div>
            <div className="text-[#4fc3f7]/50 text-sm">{tx.date}</div>
          </div>
          <div className="text-[#4fc3f7] font-semibold">{tx.amount}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}


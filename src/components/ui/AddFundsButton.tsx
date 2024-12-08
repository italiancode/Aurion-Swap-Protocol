'use client'

import { motion } from "framer-motion"
import { Plus } from 'lucide-react'

export default function AddFundsButton() {
  return (
    <div className="shrink-0 p-4 sm:p-6">
      <motion.button
        className="w-full bg-gradient-to-r from-[#4fc3f7] to-[#1e88e5] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:from-[#7fdbff] hover:to-[#4fc3f7] transition-all shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="h-5 w-5" />
        Add Funds
      </motion.button>
    </div>
  )
}


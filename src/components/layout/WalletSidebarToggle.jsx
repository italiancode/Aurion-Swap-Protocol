import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

function WalletSidebarToggle({ isOpen, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed top-16 mt-2 sm:mt-6 right-4 z-[10] bg-[#1a2c38] border border-[#2a4858] rounded-xl p-2 shadow-lg hover:bg-[#1e88e5]/20 transition-colors ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Wallet className="h-5 w-5 sm:h-6 sm:w-6 text-[#4fc3f7]" />
    </motion.button>
  );
}

export default WalletSidebarToggle;


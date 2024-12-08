import { motion } from "framer-motion";

type ActionButtonProps = {
  icon: React.ReactNode;
  label: string;
};

export default function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <motion.button
      className="flex items-center justify-center px-4 py-2 bg-[#1e88e5] text-white rounded-lg shadow-md hover:bg-[#1976d2] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4fc3f7] focus:ring-opacity-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="ml-2 text-sm font-medium">{label}</span>
    </motion.button>
  );
}

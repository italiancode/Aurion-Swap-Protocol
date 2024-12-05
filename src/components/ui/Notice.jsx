"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';

export function Notice({ message, isVisible: initialIsVisible, onClose }) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setIsVisible(initialIsVisible);

    if (initialIsVisible) {
      const newTimer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);
      setTimer(newTimer);

      return () => clearTimeout(newTimer);
    }
  }, [initialIsVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    clearTimeout(timer);
  };

  const handleMouseEnter = () => {
    clearTimeout(timer); // Clear the timer when hovering
  };

  const handleMouseLeave = () => {
    if (isVisible) {
      const newTimer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5000);
      setTimer(newTimer);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-16 mt-5 left-4 right-4 z-[100] flex justify-start pointer-events-none"
          onMouseEnter={handleMouseEnter} // Add mouse enter event
          onMouseLeave={handleMouseLeave} // Add mouse leave event
        >
          <div className="max-w-fit w-auto pointer-events-auto">
            <div className="bg-[#1a2c38] bg-gradient-to-r from-[#40E0D0]/20 to-[#4169E1]/20 backdrop-blur-md border border-[#40E0D0]/30 rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <div className="w-2 h-2 rounded-full bg-[#40E0D0] shrink-0" />
                <span className="text-[#4fc3f7] text-sm font-medium flex-grow pr-2">
                  {message}
                </span>
                <button
                  onClick={handleClose}
                  className="text-[#4fc3f7] hover:text-[#81d4fa] transition-colors"
                  aria-label="Close notification"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


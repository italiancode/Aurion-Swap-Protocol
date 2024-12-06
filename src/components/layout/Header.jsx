"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletState } from "@/hooks/useWalletState";
import {
  Bell,
  Copy,
  ExternalLink,
  LogOut,
  Menu,
  Wallet,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Notice } from "../ui/Notice";
import { motion, AnimatePresence } from "framer-motion";

require("@solana/wallet-adapter-react-ui/styles.css");

// Dynamically import the WalletMultiButton with no SSR
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Header({ isSidebarOpen, toggleSidebar }) {
  const { publicKey, disconnect } = useWallet();
  const setGlobalPublicKey = useWalletState((state) => state.setPublicKey);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64); // Default height

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setGlobalPublicKey(publicKey);
  }, [publicKey, setGlobalPublicKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const width = window.innerWidth;
      if (width < 640) return 56; // For mobile
      if (width < 1024) return 64; // For tablet
      return 72; // For desktop
    };

    const handleResize = () => {
      setHeaderHeight(calculateHeaderHeight()); // Set height based on window size
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial height
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Notice
        message="Address copied to clipboard!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-0 w-full"
        style={{ height: `${headerHeight}px` }}
      >
        <header className="bg-gradient-to-r from-[#40E0D0]/10 to-[#4169E1]/10 backdrop-blur-sm shadow-md h-full">
          <div className="mx-auto max-w-9xl px-2 sm:px-4 md:px-6 lg:px-8 h-full">
            <div className="flex h-full items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-1 hover:bg-[#1e88e5]/20 text-[#4fc3f7] transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {showMobileMenu ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
                <Link href="/" className="flex items-center gap-2">
                  <Image
                    src="/aura-logo.png"
                    alt="Aura Logo"
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                  />
                  <span className="text-base sm:text-lg lg:text-xl bg-gradient-to-r from-[#40E0D0] to-[#4169E1] bg-clip-text text-transparent whitespace-nowrap">
                    Aurion Swap
                  </span>
                </Link>
              </div>

              <nav className="hidden md:flex items-center space-x-2">
                <NavLink className="" href="#" active>
                  Spot
                </NavLink>
                {/* <NavLink href="#">Perps</NavLink> */}
              </nav>

              <div className="relative" ref={dropdownRef}>
                {publicKey ? (
                  <motion.button
                    onClick={toggleSidebar}
                    className="flex items-center gap-2 rounded-lg border border-[#2a4858] bg-gradient-to-r from-[#1e88e5]/20 to-[#4fc3f7]/20 text-sm font-medium text-[#4fc3f7] hover:from-[#1e88e5]/30 hover:to-[#4fc3f7]/30 transition-all duration-300 px-3 py-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Wallet className="h-5 w-5 text-[#4fc3f7]" />
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="hidden sm:inline truncate max-w-[100px]">
                      {`${publicKey.toString().slice(0, 4)}...${publicKey
                        .toString()
                        .slice(-4)}`}
                    </span>
                    <ChevronDown className="h-4 w-4 text-[#4fc3f7]" />
                  </motion.button>
                ) : (
                  mounted && (
                    <WalletMultiButtonDynamic className="!bg-gradient-to-r from-[#1e88e5]/20 to-[#4fc3f7]/20 hover:!from-[#1e88e5]/30 hover:!to-[#4fc3f7]/30 !text-[#4fc3f7] !rounded-lg !border !border-[#2a4858] transition-all !text-sm !py-2 !px-3" />
                  )
                )}
              </div>
            </div>
          </div>
        </header>
        <AnimatePresence>{showMobileMenu && <MobileMenu />}</AnimatePresence>
      </div>
    </>
  );
}

function NavLink({ href, children, active = false, className = "" }) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm whitespace-nowrap xl:text-base ${
        active ? "text-[#4fc3f7]" : "text-[#4fc3f7]/60"
      } hover:bg-[#1e88e5]/20 transition-colors duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}

function MobileMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="md:hidden bg-[#1a2c38]/95 backdrop-blur-sm shadow-lg"
    >
      <nav className="px-4 py-3">
        <ul className="flex flex-col space-y-1">
          <li className="w-full">
            <NavLink href="#" active className="block w-full">
              Spot
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink href="#" className="block w-full">
              Perps
            </NavLink>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
}

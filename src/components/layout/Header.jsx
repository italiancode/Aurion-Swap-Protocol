"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletState } from "@/hooks/useWalletState";
import {
  Bell,
  ChevronDown,
  Copy,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Notice } from "../ui/Notice";

require("@solana/wallet-adapter-react-ui/styles.css");

// Dynamically import the WalletMultiButton with no SSR
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Header() {
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

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 100; // Adjust this value to control how quickly the header shrinks
      const baseHeight = calculateHeaderHeight();
      const minHeight = baseHeight - 16; // Minimum height is 16px less than the calculated height
      const scrollPercentage = Math.min(scrollPosition / maxScroll, 1);
      const newHeight = baseHeight - scrollPercentage * 16; // Shrink by up to 16px
      setHeaderHeight(Math.max(minHeight, newHeight));
    };

    const handleResize = () => {
      handleScroll(); // This will now set the correct initial height and adjust for scroll
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize(); // Set initial height
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setShowToast(true);
      setShowDropdown(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const viewOnExplorer = () => {
    if (publicKey) {
      window.open(
        `https://explorer.solana.com/address/${publicKey.toString()}`,
        "_blank"
      );
      setShowDropdown(false);
    }
  };

  return (
    <>
      <Notice
        message="Address copied to clipboard!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div
        className="z-[100] transition-all duration-300 px-0"
        style={{ height: `${headerHeight}px` }}
      >
        <header className="bg-gradient-to-r from-[#40E0D0]/10 to-[#4169E1]/10 backdrop-blur-sm border-b border-[#40E0D0]/30 h-full">
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
                  <div className="flex items-center">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center gap-1 sm:gap-2 rounded-lg border border-[#2a4858] bg-[#1e88e5]/20 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-[#4fc3f7] hover:bg-[#1e88e5]/30 transition-colors duration-200"
                    >
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400" />
                      <span className="hidden sm:inline truncate max-w-[80px] sm:max-w-[100px]">
                        {`${publicKey.toString().slice(0, 4)}...${publicKey
                          .toString()
                          .slice(-4)}`}
                      </span>
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#4fc3f7]/60" />
                    </button>
                    {showDropdown && (
                      <WalletDropdown
                        copyAddress={copyAddress}
                        viewOnExplorer={viewOnExplorer}
                        disconnect={disconnect}
                      />
                    )}
                  </div>
                ) : (
                  mounted && (
                    <WalletMultiButtonDynamic className="!bg-[#1e88e5]/20 hover:!bg-[#1e88e5]/30 !text-[#4fc3f7] !rounded-lg !border !border-[#2a4858] transition-colors !text-sm !py-2 !px-3" />
                  )
                )}
              </div>
            </div>
          </div>
        </header>
        {showMobileMenu && <MobileMenu />}
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

function WalletDropdown({ copyAddress, viewOnExplorer, disconnect }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#2a4858] bg-[#1a2c38] shadow-lg z-[100]">
      <div className="p-1">
        <DropdownButton
          onClick={copyAddress}
          icon={<Copy className="h-4 w-4" />}
        >
          Copy Address
        </DropdownButton>
        <DropdownButton
          onClick={viewOnExplorer}
          icon={<ExternalLink className="h-4 w-4" />}
        >
          View on Explorer
        </DropdownButton>
        <DropdownButton
          onClick={disconnect}
          icon={<LogOut className="h-4 w-4" />}
          className="text-red-400"
        >
          Disconnect
        </DropdownButton>
      </div>
    </div>
  );
}

function DropdownButton({ onClick, icon, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
        className || "text-[#4fc3f7]"
      } hover:bg-[#1e88e5]/20 transition-colors duration-200`}
    >
      {icon}
      {children}
    </button>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden border-t border-[#2a4858] bg-[#1a2c38]/95 backdrop-blur-sm">
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
    </div>
  );
}

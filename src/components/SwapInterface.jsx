"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// Dynamically import the WalletMultiButton with no SSR
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const SwapInterface = () => {
  const { publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const [fromToken, setFromToken] = useState("USDT");
  const [toToken, setToToken] = useState("SOL");

  useEffect(() => {
    const init = async () => {
      if (!mounted) {
        setMounted(true);
        // getTokenMetadata("864YJRb3JAVARC4FNuDtPKFxdEsYRbB39Nwxkzudxy46");
      }
    };
    init();
  }, [mounted, publicKey]);

  const handleSwap = () => {
    setIsRotating(true);

    // Switch both amounts and tokens
    const tempAmount = fromAmount;
    const tempToken = fromToken;

    setFromAmount(toAmount);
    setToAmount(tempAmount);

    setFromToken(toToken);
    setToToken(tempToken);

    // Reset rotation after animation
    setTimeout(() => {
      setIsRotating(false);
    }, 200);
  };

  const handleSwapSubmit = () => {
    if (!publicKey) return;
    // Add your swap logic here
    console.log("Swapping tokens...");
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-md sm:max-w-lg md:max-w-xl sm:px-0 px-0">
      {/* Sell Token Section */}
      <div className="min-h-[124px] bg-[#1c3242]/50 p-4 sm:p-6 rounded-xl mb-2 border border-[#2a4858]">
        <div className="flex justify-between mb-2">
          <span className="text-[#4fc3f7] text-base">You Pay</span>
          <span className="text-sm text-[#4fc3f7]/70">Balance: 0.0</span>
        </div>
        <div className="flex items-center gap-2 w-full">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            onWheel={(e) => e.target.blur()} // Disable scroll-to-change
            className="flex-1 bg-transparent text-xl outline-none text-[#81d4fa] placeholder-[#4fc3f7]/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.0"
          />

          <button className="shrink-0 bg-[#1e88e5]/20 text-[#4fc3f7] px-4 py-2 rounded-lg text-base border border-[#2a4858] hover:bg-[#1e88e5]/30 transition-all">
            {fromToken}
          </button>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-3 relative z-10">
        <button
          onClick={handleSwap}
          className={`bg-[#1e88e5]/20 hover:bg-[#1e88e5]/30 p-2 sm:p-3 rounded-full transform transition-all duration-200 hover:scale-110 border border-[#2a4858] ${
            isRotating ? "rotate-180" : ""
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#4fc3f7]"
          >
            <path
              d="M20 7C20 7 16.5 3.5 12 3.5C7.5 3.5 4 7 4 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 17C4 17 7.5 20.5 12 20.5C16.5 20.5 20 17 20 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Buy Token Section */}
      <div className="min-h-[124px] bg-[#1c3242]/50 p-4 sm:p-6 rounded-xl mt-2 border border-[#2a4858]">
        <div className="flex justify-between mb-2">
          <span className="text-[#4fc3f7] text-base">You Receive</span>
          <span className="text-sm text-[#4fc3f7]/70">Balance: 0.0</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            onWheel={(e) => e.target.blur()} // Disable scroll-to-change
            className="flex-1 bg-transparent text-xl outline-none text-[#81d4fa] placeholder-[#4fc3f7]/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.0"
          />

          <button className="shrink-0 bg-[#1e88e5]/20 text-[#4fc3f7] px-4 py-2 rounded-lg text-base border border-[#2a4858] hover:bg-[#1e88e5]/30 transition-all">
            {toToken}
          </button>
        </div>
      </div>

      {/* Connect Wallet or Swap Button */}
      <div className="mt-6 h-[52px]">
        {mounted ? (
          publicKey ? (
            <button
              onClick={handleSwapSubmit}
              className="w-full !h-[52px] bg-gradient-to-r from-[#40E0D0] to-[#4169E1] text-white font-medium rounded-lg hover:opacity-90 transition-opacity py-5 text-lg font-medium leading-none"
            >
              Swap
            </button>
          ) : (
            <WalletMultiButtonDynamic className="w-full !h-[52px] !bg-[#1e88e5]/20 hover:!bg-[#1e88e5]/30 !text-[#4fc3f7] !rounded-lg !border !border-[#2a4858] transition-colors" />
          )
        ) : null}
      </div>
    </div>
  );
};

export default SwapInterface;

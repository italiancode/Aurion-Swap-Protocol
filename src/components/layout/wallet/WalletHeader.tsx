import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  ChevronRight,
  Copy,
  ExternalLink,
  LogOut,
  X,
  ChevronLeft,
  History,
  View,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNotification } from "@/context/NotificationContext";
import { WalletMultiButtonDynamic } from "@/utils/connection/walletConnection";

type HeaderProps = {
  publicKey: string | null;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  headerHeight: number;
  handleViewOnExplorer: () => void;
  handleCopyAddress: () => void;
  walletDisconnect: () => void;
};

export default function WalletHeader({
  publicKey,
  activeTab,
  setActiveTab,
  onClose,
  headerHeight,
  walletDisconnect,
}: HeaderProps) {
  const { disconnect: disconnectWallet, connect } = useWallet();
  const [displayAddress, setDisplayAddress] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { showNotification } = useNotification();

  const toggleAddressExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      if (publicKey && containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width >= 768) {
          setDisplayAddress(
            `${publicKey.toString().slice(0, 6)}...${publicKey
              .toString()
              .slice(-6)}`
          );
        } else if (width >= 640) {
          setDisplayAddress(
            `${publicKey.toString().slice(0, 4)}...${publicKey
              .toString()
              .slice(-4)}`
          );
        } else {
          setDisplayAddress(
            `${publicKey.toString().slice(0, 4)}...${publicKey
              .toString()
              .slice(-2)}`
          );
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [publicKey]);

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      console.log("Copying address and showing notification");
      showNotification("Address copied to clipboard!");
    }
  };

  const handleViewOnExplorer = () => {
    if (publicKey) {
      window.open(
        `https://explorer.solana.com/address/${publicKey.toString()}`,
        "_blank"
      );
    }
  };

  return (
    <div className="" ref={containerRef}>
      <motion.div
        className="shadow-md fixed top-0 right-0 w-[100%] sm:w-[360px] md:w-[384px] lg:w-[448px] xl:w-[512px] bg-gradient-to-br from-[#1a2c38] to-[#0d1b24] shadow-md"
        style={{ height: `${headerHeight}px` }}
      >
        <div className="flex w-full h-full items-center">
          <div className="flex flex-row w-full items-center justify-between gap-4 px-4 h-full">
            <div className="flex items-center gap-4 w-auto">
              {publicKey ? (
                <div className="flex items-center bg-gray-800 shadow-md border border-[#2a4858] text-[#4fc3f7] rounded-md p-2 gap-2 flex-grow-0">
                  <Wallet className="h-5 w-5" />
                  <div className="flex items-center ">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-2" />
                    <motion.button
                      onClick={handleViewOnExplorer}
                      className="flex items-center text-sm text-[#4fc3f7] cursor-pointer transition-colors hover:text-[#1e88e5] shadow-md hover:shadow-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Toggle Address Expansion"
                    >
                      <span className="font-mono text-xs sm:text-sm truncate underline max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] xl:max-w-full">
                        {isExpanded ? publicKey.toString() : displayAddress}
                      </span>
                      <ExternalLink
                        className="h-5 w-5 ml-2 transition-colors hover:text-[#1e88e5] flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewOnExplorer();
                        }}
                      />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div>
                  <WalletMultiButtonDynamic />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {publicKey && (
                <div className="flex items-center border border-[#2a4858] bg-gray-800 rounded-md overflow-hidden">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyAddress}
                          className="text-[#81d4fa] hover:text-white hover:bg-[#2a4858]"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy address</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={disconnectWallet}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Disconnect wallet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-gray-400 bg-gray-800 hover:text-red-400 hover:bg-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Close</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </motion.div>

      <nav className="px-4 py-2" style={{ marginTop: `${headerHeight}px` }}>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="w-auto">
            {activeTab === "history" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("overview")}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 w-auto justify-start"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>History</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-[#4fc3f7] p-2">
                <View className="h-5 w-5" />
                <span>Wallet</span>
              </div>
            )}
          </div>
          <ul className="flex justify-center sm:justify-end space-x-4 w-auto">
            <li>
              <Button
                variant={activeTab === "history" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("history")}
                className={`flex items-center space-x-2 ${
                  activeTab === "history"
                    ? "bg-[#1e88e5]/20 text-white"
                    : "text-[#4fc3f7] hover:bg-[#1e88e5]/20"
                }`}
              >
                <History className="h-4 w-4" />
                {/* <span className="hidden sm:inline">History</span> */}
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

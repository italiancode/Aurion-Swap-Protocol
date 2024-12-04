"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { devLog } from "@/utils/logging";
import { useWalletState } from "@/hooks/useWalletState";
import { Notice } from "@/components/ui/Notice";

const WalletStateSync = () => {
  const { publicKey, connecting, connected } = useWallet();
  const setPublicKey = useWalletState((state) => state.setPublicKey);
  const prevPublicKey = useRef(null);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

  useEffect(() => {
    if (connecting && !connected) {
      devLog("Wallet Connecting...");
    }

    if (connected && publicKey) {
      if (prevPublicKey.current !== publicKey.toString()) {
        setPublicKey(publicKey);
        setNoticeMessage("Wallet Connected!");
        setIsNoticeVisible(true);
        devLog("Wallet Connected:", {
          currentPubKey: publicKey.toString(),
          connected,
          timestamp: new Date().toISOString(),
        });
      }
    }

    if (!connected && prevPublicKey.current) {
      setPublicKey(null);
      setNoticeMessage("Wallet Disconnected!");
      setIsNoticeVisible(true);
      devLog("Wallet Disconnected:", {
        currentPubKey: prevPublicKey.current || "none",
        connected,
        timestamp: new Date().toISOString(),
      });
    }

    prevPublicKey.current = publicKey ? publicKey.toString() : null;
  }, [publicKey, connected, connecting, setPublicKey]);

  const handleCloseNotice = () => {
    setIsNoticeVisible(false);
  };

  return (
    <>
      {isNoticeVisible && (
        <Notice message={noticeMessage} isVisible={isNoticeVisible} onClose={handleCloseNotice} />
      )}
    </>
  );
};

export default WalletStateSync;

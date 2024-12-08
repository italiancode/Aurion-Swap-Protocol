import { useWalletState } from "../../hooks/useWalletState";
import dynamic from "next/dynamic";

require("@solana/wallet-adapter-react-ui/styles.css");

export const waitForWalletConnection = async (
  maxAttempts = 10,
  delayMs = 1000
): Promise<string | null> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const walletAddress = useWalletState.getState().getConnectedPublicKey();
    if (walletAddress) return walletAddress;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return null;
};

// Dynamically import the WalletMultiButton with no SSR
export const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

import { useWalletState } from "../../hooks/useWalletState";

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

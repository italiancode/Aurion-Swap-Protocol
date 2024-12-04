import { create } from "zustand";
import { PublicKey } from "@solana/web3.js";
import { devLog } from "../utils/logging";

interface WalletState {
  publicKey: PublicKey | null;
  isConnected: boolean;
  setPublicKey: (key: PublicKey | null) => void;
  getConnectedPublicKey: () => string | null;
}

export const useWalletState = create<WalletState>((set, get) => ({
  publicKey: null,
  isConnected: false,
  setPublicKey: (key) => {
    const isConnected = key !== null;
    set({
      publicKey: key,
      isConnected,
    });

    // if (isConnected) {
    // } else {
    //   devLog("Wallet disconnected");
    // }
  },
  getConnectedPublicKey: () => {
    const state = get();
    if (!state.isConnected || !state.publicKey) {
      return null;
    }
    return state.publicKey.toString();
  },
}));


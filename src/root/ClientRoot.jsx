"use client";

import { ClientWalletProvider } from "../wallet/ClientWalletProvider";
import { ClientLayout } from "../components/ClientLayout";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TokenProvider } from "@/context/TokenContext";

export function ClientRoot({ children }) {
  return (
    <ClientWalletProvider>
      <TokenProvider>
        <ClientLayout>{children}</ClientLayout>
      </TokenProvider>
    </ClientWalletProvider>
  );
}

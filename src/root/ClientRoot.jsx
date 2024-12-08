"use client";

import { ClientWalletProvider } from "../components/wallet/ClientWalletProvider";
import { ClientLayout } from "../components/ClientLayout";
import "@solana/wallet-adapter-react-ui/styles.css";
import { TokenProvider } from "@/context/TokenContext";
import { NotificationProvider } from "@/context/NotificationContext";

export function ClientRoot({ children }) {
  return (
    <NotificationProvider>
      <ClientWalletProvider>
        <TokenProvider>
          <ClientLayout>{children}</ClientLayout>
        </TokenProvider>
      </ClientWalletProvider>
    </NotificationProvider>
  );
}

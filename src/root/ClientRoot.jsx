'use client';

import { ClientWalletProvider } from "../Wallet/ClientWalletProvider";
import { ClientLayout } from "../components/layout/ClientLayout";
import '@solana/wallet-adapter-react-ui/styles.css';

export function ClientRoot({ children }) {
  return (
    <ClientWalletProvider>
      <ClientLayout>{children}</ClientLayout>
    </ClientWalletProvider>
  );
} 
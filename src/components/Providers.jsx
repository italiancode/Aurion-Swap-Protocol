"use client";

import dynamic from 'next/dynamic';

const ClientWalletProvider = dynamic(
  () => import('../Wallet/ClientWalletProvider'),
  { ssr: false }
);

export function Providers({ children }) {
  return <ClientWalletProvider>{children}</ClientWalletProvider>;
} 
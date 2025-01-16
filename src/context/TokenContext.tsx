import { getTokenAccounts } from "@/utils/token/getTokenAccounts";
import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenContextType {
  tokenData: any[];
  refreshTokenData: () => Promise<void>;
  totalAccounts: number;
  activeTokens: any[];
  inactiveTokens: any[];
  isLoading: boolean;
  error: Error | null;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokenData, setTokenData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTokenData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTokenAccounts();
      setTokenData(data || []); // Ensure we always set an array
    } catch (error) {
      console.error("Error fetching token addresses:", error);
      setError(error instanceof Error ? error : new Error('Failed to fetch token data'));
      setTokenData([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTokenData = async () => {
    await fetchTokenData();
  };

  useEffect(() => {
    fetchTokenData();
  }, []);

  // Calculate derived values
  const totalAccounts = tokenData.length;
  const activeTokens = tokenData.filter(
    (token) => token?.tokenAmount > 0 || token?.tokenUiAmount > 0
  );
  const inactiveTokens = tokenData.filter(
    (token) => token?.tokenAmount === "0" && token?.tokenUiAmount === 0
  );

  return (
    <TokenContext.Provider
      value={{
        tokenData,
        refreshTokenData,
        totalAccounts,
        activeTokens,
        inactiveTokens,
        isLoading,
        error
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};

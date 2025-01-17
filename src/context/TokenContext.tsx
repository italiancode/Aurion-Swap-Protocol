import { getTokenAccounts } from "@/utils/token/getTokenAccounts";
import { TokenData } from "@/types/token";
import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenContextType {
  tokenData: TokenData[];
  refreshTokenData: () => Promise<void>;
  totalAccounts: number;
  activeTokens: TokenData[];
  inactiveTokens: TokenData[];
  isLoading: boolean;
  error: Error | null;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTokenData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTokenAccounts();
      setTokenData(data || []);
    } catch (error) {
      console.error("Error fetching token addresses:", error);
      setError(error instanceof Error ? error : new Error('Failed to fetch token data'));
      setTokenData([]);
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

  const totalAccounts = tokenData.length;
  const activeTokens = tokenData.filter(
    (token) => token.account.data.tokenAmount.uiAmount > 0
  );
  const inactiveTokens = tokenData.filter(
    (token) => token.account.data.tokenAmount.uiAmount === 0
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

import { getTokenAccounts } from "@/utils/token/getTokenAccounts";
import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenContextType {
  tokenData: any[]; // Adjust the type as necessary
  refreshTokenData: () => Promise<void>;
  totalAccounts: number; // Add totalTokens to the context type
  activeTokens: any[];
  inactiveTokens: any[];
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tokenData, setTokenData] = useState<any[]>([]); // Adjust the type as necessary

  const fetchTokenData = async () => {
    try {
      const data = await getTokenAccounts();
      setTokenData(data);
    } catch (error) {
      console.error("Error fetching token addresses:", error);
    }
  };

  const refreshTokenData = async () => {
    await fetchTokenData();
  };

  useEffect(() => {
    fetchTokenData(); // Fetch token data on initial load
  }, []);

  // Calculate total tokens
  const totalAccounts = tokenData.length; // Assuming each entry in tokenData represents a token

  // Filter active and inactive accounts
  const activeTokens = tokenData.filter(
    (token) => token.tokenAmount > 0 || token.tokenUiAmount > 0
  );
  const inactiveTokens = tokenData.filter(
    (token) => token.tokenAmount === "0" && token.tokenUiAmount === 0
  );

  return (
    <TokenContext.Provider
      value={{
        tokenData,
        refreshTokenData,
        totalAccounts,
        activeTokens,
        inactiveTokens,
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

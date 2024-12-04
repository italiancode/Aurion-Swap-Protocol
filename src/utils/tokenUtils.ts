import { Connection, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { devLog } from "./logging";
import { withRetry } from "./retry";
import { useWalletState } from "../hooks/useWalletState";
// import {  } from "./retry/withRetry";

const connection = new Connection(
  `${process.env.NEXT_PUBLIC_NODE_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_NODE_API_KEY}`,
  "confirmed"
);

interface TokenMetadata {
  account: string;
  mint: string;
  owner: string;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number | null;
    uiAmountString: string | null;
  };
  decimals: number;
  supply: string;
}

const waitForWalletConnection = async (
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

const getTokenSupply = async (address: string) => {
  const supply = await withRetry(() =>
    connection.getTokenSupply(new PublicKey(address))
  );
  return {
    decimals: supply.value.decimals,
    supply: supply.value.amount,
  };
};

const getTokenAccount = async (walletAddress: string, tokenMint: string) => {
  const tokenAccounts = await withRetry(() =>
    connection.getParsedTokenAccountsByOwner(new PublicKey(walletAddress), {
      mint: new PublicKey(tokenMint),
    })
  );
  return tokenAccounts.value[0] || null;
};

export const fetchTokenMetadata = async (
  address: string
): Promise<TokenMetadata | null> => {
  try {
    const walletAddress = await waitForWalletConnection();
    const { decimals, supply } = await getTokenSupply(address);

    if (!walletAddress) {
      return {
        account: "null",
        mint: address,
        owner: "No wallet connected",
        tokenAmount: {
          amount: "0",
          decimals,
          uiAmount: 0,
          uiAmountString: "0",
        },
        decimals,
        supply,
      };
    }

    const tokenAccount = await getTokenAccount(walletAddress, address);
    if (!tokenAccount) {
      return {
        account: "null",
        mint: address,
        owner: "No wallet token account",
        tokenAmount: {
          amount: "0",
          decimals,
          uiAmount: 0,
          uiAmountString: "0",
        },
        decimals,
        supply,
      };
    }

    return {
      account: tokenAccount.pubkey.toString(),
      mint: tokenAccount.account.data.parsed.info.mint,
      owner: walletAddress,
      tokenAmount: tokenAccount.account.data.parsed.info.tokenAmount,
      decimals,
      supply,
    };
  } catch (error) {
    devLog("Error fetching token metadata:", error);
    throw error;
  }
};

let isFetchInProgress = false;

export const getTokenMetadata = async (tokenAddress: string) => {
  if (isFetchInProgress) {
    devLog("Token metadata fetch already in progress, skipping...");
    return;
  }

  isFetchInProgress = true;
  try {
    devLog("Fetching token metadata...");
    const metadata = await fetchTokenMetadata(tokenAddress);
    devLog("Token metadata fetched successfully:", metadata);
    return metadata;
  } catch (error) {
    devLog(
      "Error in getTokenMetadata:",
      error instanceof Error ? error.message : String(error)
    );
  } finally {
    isFetchInProgress = false;
  }
};

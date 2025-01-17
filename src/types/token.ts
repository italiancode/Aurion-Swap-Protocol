import { PublicKey } from "@solana/web3.js";

export interface TokenAmount {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
}

export interface TokenAccountInfo {
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: TokenAmount;
}

export interface TokenData {
  account: {
    data: TokenAccountInfo;
    executable: boolean;
    lamports: number;
    owner: PublicKey;
    rentEpoch: number;
  };
  pubkey: PublicKey;
} 
import { Connection } from "@solana/web3.js"; // Ensure you import Connection

export const connection = new Connection(
  `${process.env.NEXT_PUBLIC_NODE_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_NODE_API_KEY}`,
  "confirmed"
); 
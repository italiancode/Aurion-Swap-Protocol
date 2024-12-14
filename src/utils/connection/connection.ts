import { Connection } from "@solana/web3.js";
import { withRetry } from "../retry";
import { devLog } from "../logging";

// Get node URLs from environment variables
const primaryNode = process.env.NEXT_PUBLIC_NODE_RPC_URL || "";
const secondaryNode = process.env.NEXT_PUBLIC_SECONDARY_NODE_RPC_URL || "";

if (!primaryNode || !secondaryNode) {
  throw new Error("Node URLs must be defined in the environment variables.");
}

const rpcUrls = [primaryNode, secondaryNode];
let currentRpcIndex = 0;
let currentConnection: Connection | null = null;

function getRpcUrl() {
  return rpcUrls[currentRpcIndex];
}

async function switchRpcUrl() {
  currentRpcIndex = (currentRpcIndex + 1) % rpcUrls.length;
  currentConnection = null; // Reset the connection when switching RPC URLs
  console.info("Switched to new RPC URL:", getRpcUrl());
}

async function createConnection() {
  if (!currentConnection) {
    currentConnection = new Connection(getRpcUrl(), "confirmed");
    devLog("New connection created", currentConnection);
  }
  return currentConnection;
}

export async function getConnection<T>(
  requestFn: (connection: Connection) => Promise<T>,
  retries = 5,
  delay = 500
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    const rpcConnection = await withRetry(async () => {
      return await createConnection();
    });
    try {
      return await requestFn(rpcConnection);
    } catch (error: any) {
      devLog("Error", error);
      if (error?.message?.includes("403")) {
        console.warn("403 Forbidden detected. Switching RPC URL...");
        await switchRpcUrl();
      } else {
        console.warn(`Request failed. Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }
  throw new Error("Request failed after multiple retries.");
}

import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"; // Ensure this is imported
import { waitForWalletConnection } from "../connection/walletConnection"; // Adjust the import path as necessary
import { getConnection } from "../connection/connection"; // Import getConnection
import { devLog } from "../logging";


export const getTokenAccounts = async (): Promise<any[]> => {
  const publicKey = await waitForWalletConnection();

  if (!publicKey) {
    throw new Error("No wallet connected");
  }

  const walletPublicKey = new PublicKey(publicKey);

  // const connection = await getConnection();

  try {
    // Fetch SOL balance
    const solBalance = await getConnection((connection) =>
      connection.getBalance(walletPublicKey)
    );

    const tokenAccounts = await getConnection((connection) =>
      connection.getParsedTokenAccountsByOwner(walletPublicKey, {
        programId: TOKEN_PROGRAM_ID,
      })
    );

    // Check if the user has SOL balance
    // if (solBalance === 0) {
    //   devLog("User has no SOL balance.");
    // } else {
    //   devLog("User has SOL balance.");
    // }

    // Format token accounts data
    const formattedTokenAccounts = tokenAccounts.value.map((account) => {
      const { mint, owner, tokenAmount } = account.account.data.parsed.info;
      return {
        mint,
        owner,
        tokenAmount: tokenAmount.amount,
        tokenDecimals: tokenAmount.decimals,
        tokenUiAmount: tokenAmount.uiAmount,
        tokenUiAmountString: tokenAmount.uiAmountString,
      };
    });

    // Add SOL data to the token accounts array
    formattedTokenAccounts.push({
      mint: "So11111111111111111111111111111111111111112", // SOL mint address
      owner: walletPublicKey.toString(),
      tokenAmount: solBalance.toString(),
      tokenDecimals: 9, // SOL has 9 decimals
      tokenUiAmount: solBalance / Math.pow(10, 9), // Convert to UI amount
      tokenUiAmountString: (solBalance / Math.pow(10, 9)).toString(), // UI amount as string
    });

    devLog("Formatted Token Accounts with SOL:", formattedTokenAccounts);

    return formattedTokenAccounts;
  } catch (error) {
    console.error("Error fetching token accounts:", error);
    throw error;
  }
};

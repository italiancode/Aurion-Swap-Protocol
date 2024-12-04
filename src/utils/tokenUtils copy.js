import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Initialize connection using environment variable
const connection = new Connection(
  `${process.env.NEXT_PUBLIC_NODE_RPC_URL}/apikey/${process.env.NEXT_PUBLIC_NODE_API_KEY}`,
  'confirmed'
);

/**
 * Fetches token metadata for a given token address
 * @param {string} tokenAddress - The token's address
 * @returns {Promise<Object>} Token metadata
 */
export const fetchTokenMetadata = async (tokenAddress) => {
  try {
    // Validate token address
    const tokenPublicKey = new PublicKey(tokenAddress);
    
    // Fetch token account info
    const tokenInfo = await connection.getParsedAccountInfo(tokenPublicKey);
    
    if (!tokenInfo?.value) {
      throw new Error('Token not found');
    }

    // Get mint info
    const mintInfo = await connection.getParsedAccountInfo(
      new PublicKey(tokenInfo.value.data.parsed.info.mint)
    );

    if (!mintInfo?.value) {
      throw new Error('Mint not found');
    }

    // Extract relevant metadata
    const metadata = {
      address: tokenAddress,
      mint: tokenInfo.value.data.parsed.info.mint,
      owner: tokenInfo.value.data.parsed.info.owner,
      tokenAmount: tokenInfo.value.data.parsed.info.tokenAmount,
      decimals: mintInfo.value.data.parsed.info.decimals,
      supply: mintInfo.value.data.parsed.info.supply,
    };

    return metadata;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    throw error;
  }
};

/**
 * Get token balance for a given wallet address
 * @param {string} walletAddress - The wallet's address
 * @param {string} tokenMint - The token's mint address
 * @returns {Promise<number>} Token balance
 */


export const getTokenBalance = async (walletAddress, tokenMint) => {
  try {
    const walletPublicKey = new PublicKey(walletAddress);
    const mintPublicKey = new PublicKey(tokenMint);

    const tokenAccounts = await connection.getTokenAccountsByOwner(
      walletPublicKey,
      { mint: mintPublicKey }
    );

    if (tokenAccounts.value.length === 0) {
      return 0;
    }

    const balance = await connection.getTokenAccountBalance(
      tokenAccounts.value[0].pubkey
    );

    return balance.value.uiAmount;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
};

/**
 * Validate if an address is a valid token address
 * @param {string} address - The address to validate
 * @returns {Promise<boolean>} Whether the address is valid
 */
export const isValidTokenAddress = async (address) => {
  try {
    const publicKey = new PublicKey(address);
    const accountInfo = await connection.getAccountInfo(publicKey);
    return accountInfo?.owner.equals(TOKEN_PROGRAM_ID) ?? false;
  } catch {
    return false;
  }
}; 
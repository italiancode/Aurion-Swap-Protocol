import { useTokenContext } from "@/context/TokenContext";
import { motion } from "framer-motion";

export default function TokensContent() {
  const tokens = [
    { name: "Solana", symbol: "SOL", balance: "0.00", value: "$0.00" },
    { name: "USD Coin", symbol: "USDC", balance: "0.00", value: "$0.00" },
    { name: "Serum", symbol: "SRM", balance: "0.00", value: "$0.00" },
  ];

  const { tokenData, totalAccounts, activeTokens, inactiveTokens } =
    useTokenContext();

  console.log("tokenData", tokenData);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 shadow-md space-y-6">
      {/* Account Summary */}
      {/* <div className="flex flex-col gap-2 justify-start items-end">
        <h2 className="text-lg text-[#4fc3f7] font-semibold mb-3">
          Account Summary
        </h2>

        <div className="flex flex-row gap-2 justify-between items-end w-full">
          <h2 className="text-xl font-semibold text-[#4fc3f7] mb-4 w-full">
            Holdings
            <span className="rounded-full border border-[#2a4858] bg-[#1a2c38] text-[#4fc3f7] px-2 py-0.5 text-sm whitespace-nowrap">
              {activeTokens.length} tokens
            </span>
          </h2>
          <div className="flex justify-start items-center bg-gray-700/30 rounded-lg p-2 relative w-fit ">
            {[
              { label: "Total", value: totalAccounts },
              { label: "Active", value: activeTokens.length },
              { label: "Inactive", value: inactiveTokens.length },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-3 relative"
              >
                <span className="text-xl text-[#4fc3f7] font-base font-mono truncate">
                  {item.value}
                </span>
                <span className="text-xs text-[#4fc3f7]/70">{item.label}</span>
                {index < 2 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Token Holdings Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#4fc3f7] mb-4">
          Holdings{" "}
          <span className="rounded-full border border-[#2a4858] bg-[#1a2c38] text-[#4fc3f7] px-2 py-0.5 text-sm">
            {activeTokens.length} tokens
          </span>
        </h2>
        <div className="space-y-4">
          {tokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1e88e5] to-[#4fc3f7] flex items-center justify-center text-white font-bold text-lg">
                  {token.symbol.slice(0, 1)}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-[#4fc3f7]">
                    {token.name}
                  </div>
                  <div className="text-xs text-[#4fc3f7]/70">
                    {token.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[#4fc3f7]">
                  {token.balance} {token.symbol}
                </div>
                <div className="text-xs text-[#4fc3f7]/70">{token.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

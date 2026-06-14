#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const CHAIN_RPC: Record<string, string | undefined> = {
  ethereum: process.env.ALCHEMY_ETH_URL ?? process.env.ETHEREUM_RPC_URL,
  polygon: process.env.ALCHEMY_POLYGON_URL ?? process.env.POLYGON_RPC_URL,
  arbitrum: process.env.ALCHEMY_ARB_URL ?? process.env.ARBITRUM_RPC_URL,
  base: process.env.ALCHEMY_BASE_URL ?? process.env.BASE_RPC_URL,
  optimism: process.env.ALCHEMY_OPT_URL ?? process.env.OPTIMISM_RPC_URL,
  avalanche: process.env.AVALANCHE_RPC_URL,
  bnb: process.env.BNB_RPC_URL,
  solana: process.env.SOLANA_RPC_URL,
};

async function rpcCall(chain: string, method: string, params: unknown[] = []): Promise<unknown> {
  const url = CHAIN_RPC[chain.toLowerCase()];
  if (!url) {
    throw new Error(`No RPC URL configured for chain: ${chain}. Set env var or use public fallback.`);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });

  const data = (await response.json()) as { result?: unknown; error?: { message: string } };
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

const server = new McpServer({
  name: "blockchain-rpc-server",
  version: "1.0.0",
});

server.tool(
  "get_balance",
  "Get native token balance for an address on a supported chain",
  {
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base", "optimism", "avalanche", "bnb"]),
    address: z.string().describe("Wallet address (0x...)"),
    block: z.string().optional().default("latest").describe("Block tag: latest, pending, or hex"),
  },
  async ({ chain, address, block }) => {
    const balance = await rpcCall(chain, "eth_getBalance", [address, block]);
    return { content: [{ type: "text", text: JSON.stringify({ chain, address, balanceWei: balance }, null, 2) }] };
  }
);

server.tool(
  "eth_call",
  "Execute a read-only contract call (simulation)",
  {
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base", "optimism", "avalanche", "bnb"]),
    to: z.string().describe("Contract address"),
    data: z.string().describe("Encoded calldata (0x...)"),
    from: z.string().optional().describe("Optional sender address for simulation"),
  },
  async ({ chain, to, data, from }) => {
    const callObj: Record<string, string> = { to, data };
    if (from) callObj.from = from;
    const result = await rpcCall(chain, "eth_call", [callObj, "latest"]);
    return { content: [{ type: "text", text: JSON.stringify({ chain, result }, null, 2) }] };
  }
);

server.tool(
  "get_transaction_receipt",
  "Get transaction receipt by hash",
  {
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base", "optimism", "avalanche", "bnb"]),
    txHash: z.string(),
  },
  async ({ chain, txHash }) => {
    const receipt = await rpcCall(chain, "eth_getTransactionReceipt", [txHash]);
    return { content: [{ type: "text", text: JSON.stringify(receipt, null, 2) }] };
  }
);

server.tool(
  "estimate_gas",
  "Estimate gas for a transaction",
  {
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base", "optimism", "avalanche", "bnb"]),
    to: z.string(),
    data: z.string(),
    from: z.string().optional(),
    value: z.string().optional().default("0x0"),
  },
  async ({ chain, to, data, from, value }) => {
    const tx: Record<string, string> = { to, data, value };
    if (from) tx.from = from;
    const gas = await rpcCall(chain, "eth_estimateGas", [tx]);
    return { content: [{ type: "text", text: JSON.stringify({ chain, gasEstimate: gas }, null, 2) }] };
  }
);

server.tool(
  "get_fee_data",
  "Get current EIP-1559 fee data (base fee, priority fee suggestion)",
  {
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base", "optimism", "avalanche", "bnb"]),
  },
  async ({ chain }) => {
    const block = (await rpcCall(chain, "eth_getBlockByNumber", ["latest", false])) as {
      baseFeePerGas?: string;
    };
    const gasPrice = await rpcCall(chain, "eth_gasPrice", []);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { chain, baseFeePerGas: block?.baseFeePerGas, gasPrice, timestamp: new Date().toISOString() },
            null,
            2
          ),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);

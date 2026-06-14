#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const CHAINLINK_FEEDS: Record<string, Record<string, string>> = {
  ethereum: {
    "ETH/USD": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    "BTC/USD": "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
    "USDC/USD": "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
  },
};

const server = new McpServer({ name: "price-feed-server", version: "1.0.0" });

server.tool(
  "get_coingecko_price",
  "Get token price from CoinGecko by coin ID",
  {
    coinId: z.string().describe("CoinGecko ID e.g. ethereum, bitcoin, usd-coin"),
    vsCurrency: z.string().default("usd"),
  },
  async ({ coinId, vsCurrency }) => {
    const apiKey = process.env.COINGECKO_API_KEY;
    const base = apiKey ? "https://pro-api.coingecko.com/api/v3" : "https://api.coingecko.com/api/v3";
    const headers: Record<string, string> = apiKey ? { "x-cg-pro-api-key": apiKey } : {};
    const res = await fetch(`${base}/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`, { headers });
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify({ coinId, price: data, timestamp: new Date().toISOString() }, null, 2) }] };
  }
);

server.tool(
  "get_chainlink_price",
  "Get latest Chainlink price feed data",
  {
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base"]).default("ethereum"),
    pair: z.string().describe("Price pair e.g. ETH/USD, BTC/USD"),
    rpcUrl: z.string().optional(),
  },
  async ({ chain, pair, rpcUrl }) => {
    const aggregator = CHAINLINK_FEEDS[chain]?.[pair];
    if (!aggregator) {
      return { content: [{ type: "text", text: `Feed not indexed for ${chain} ${pair}. See Chainlink docs.` }] };
    }

    const rpc = rpcUrl ?? process.env.ETHEREUM_RPC_URL;
    if (!rpc) {
      return { content: [{ type: "text", text: JSON.stringify({ aggregator, pair, note: "Set ETHEREUM_RPC_URL to fetch on-chain price" }, null, 2) }] };
    }

    const data = "0xfeaf968c";
    const res = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [{ to: aggregator, data }, "latest"],
      }),
    });
    const result = await res.json();
    return { content: [{ type: "text", text: JSON.stringify({ chain, pair, aggregator, rawResult: result }, null, 2) }] };
  }
);

server.tool(
  "get_token_price_by_contract",
  "Get token price by contract address via CoinGecko",
  {
    platform: z.enum(["ethereum", "polygon-pos", "arbitrum-one", "base"]).default("ethereum"),
    contractAddress: z.string(),
  },
  async ({ platform, contractAddress }) => {
    const apiKey = process.env.COINGECKO_API_KEY;
    const base = apiKey ? "https://pro-api.coingecko.com/api/v3" : "https://api.coingecko.com/api/v3";
    const headers: Record<string, string> = apiKey ? { "x-cg-pro-api-key": apiKey } : {};
    const res = await fetch(
      `${base}/simple/token_price/${platform}?contract_addresses=${contractAddress}&vs_currencies=usd`,
      { headers }
    );
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

async function main() {
  await server.connect(new StdioServerTransport());
}
main().catch(console.error);

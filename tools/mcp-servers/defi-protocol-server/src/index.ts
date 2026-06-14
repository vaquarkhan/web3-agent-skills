#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SUBGRAPH_URLS: Record<string, string> = {
  "uniswap-v3-ethereum": "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  "aave-v3-ethereum": "https://api.thegraph.com/subgraphs/name/aave/protocol-v3",
  "lido-ethereum": "https://api.thegraph.com/subgraphs/name/lido/lido",
};

const PROTOCOL_ADDRESSES: Record<string, Record<string, string>> = {
  uniswap: {
    "ethereum-router-v3": "0xE592427A0AEce92De3Edee1F18E0157C05861564",
    "ethereum-factory-v3": "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  aave: {
    "ethereum-pool-v3": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  },
};

async function querySubgraph(url: string, query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  return data;
}

const server = new McpServer({ name: "defi-protocol-server", version: "1.0.0" });

server.tool(
  "get_protocol_address",
  "Get known contract address for a DeFi protocol on a chain",
  {
    protocol: z.enum(["uniswap", "aave", "compound", "makerdao", "lido", "eigenlayer"]),
    contract: z.string().describe("Contract name e.g. ethereum-router-v3, ethereum-pool-v3"),
  },
  async ({ protocol, contract }) => {
    const address = PROTOCOL_ADDRESSES[protocol]?.[contract];
    if (!address) {
      return { content: [{ type: "text", text: `Address not found. Check knowledge-base/protocols/${protocol}/` }] };
    }
    return { content: [{ type: "text", text: JSON.stringify({ protocol, contract, address }, null, 2) }] };
  }
);

server.tool(
  "query_subgraph",
  "Query a DeFi subgraph (Uniswap, Aave, Lido)",
  {
    subgraph: z.enum(["uniswap-v3-ethereum", "aave-v3-ethereum", "lido-ethereum"]),
    query: z.string().describe("GraphQL query string"),
    variables: z.record(z.unknown()).optional(),
  },
  async ({ subgraph, query, variables }) => {
    const url = SUBGRAPH_URLS[subgraph];
    const result = await querySubgraph(url, query, variables ?? {});
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "get_pool_info",
  "Get Uniswap V3 pool info by token pair",
  {
    token0: z.string(),
    token1: z.string(),
    fee: z.number().optional().default(3000),
  },
  async ({ token0, token1, fee }) => {
    const query = `
      query Pool($token0: String!, $token1: String!, $fee: Int!) {
        pools(where: { token0: $token0, token1: $token1, feeTier: $fee }, first: 1) {
          id liquidity sqrtPrice tick token0Price token1Price volumeUSD totalValueLockedUSD
        }
      }`;
    const result = await querySubgraph(SUBGRAPH_URLS["uniswap-v3-ethereum"], query, {
      token0: token0.toLowerCase(),
      token1: token1.toLowerCase(),
      fee,
    });
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  await server.connect(new StdioServerTransport());
}
main().catch(console.error);

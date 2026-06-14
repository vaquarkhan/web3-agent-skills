#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const IPFS_GATEWAYS = [
  "https://ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
  "https://gateway.pinata.cloud/ipfs/",
];

async function resolveIpfsUri(uri: string): Promise<unknown> {
  let cid = uri;
  if (uri.startsWith("ipfs://")) cid = uri.replace("ipfs://", "");
  if (uri.includes("/ipfs/")) cid = uri.split("/ipfs/")[1];

  for (const gateway of IPFS_GATEWAYS) {
    try {
      const res = await fetch(gateway + cid, { signal: AbortSignal.timeout(10000) });
      if (res.ok) return res.json();
    } catch {
      continue;
    }
  }
  throw new Error(`Failed to resolve IPFS URI: ${uri}`);
}

const server = new McpServer({ name: "nft-metadata-server", version: "1.0.0" });

server.tool(
  "resolve_metadata",
  "Resolve NFT metadata from tokenURI (IPFS, HTTP, or Arweave)",
  { tokenUri: z.string().describe("tokenURI from contract") },
  async ({ tokenUri }) => {
    let metadata: unknown;
    if (tokenUri.startsWith("ipfs://") || tokenUri.includes("ipfs")) {
      metadata = await resolveIpfsUri(tokenUri);
    } else if (tokenUri.startsWith("ar://")) {
      const res = await fetch(`https://arweave.net/${tokenUri.replace("ar://", "")}`);
      metadata = await res.json();
    } else {
      const res = await fetch(tokenUri);
      metadata = await res.json();
    }
    return { content: [{ type: "text", text: JSON.stringify(metadata, null, 2) }] };
  }
);

server.tool(
  "get_collection_metadata",
  "Fetch NFT collection metadata via Reservoir API",
  {
    contract: z.string(),
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base", "optimism"]).default("ethereum"),
  },
  async ({ contract, chain }) => {
    const apiKey = process.env.RESERVOIR_API_KEY ?? "";
    const res = await fetch(
      `https://api-${chain === "ethereum" ? "eth" : chain}.reservoir.tools/collections/v7?id=${contract}`,
      { headers: apiKey ? { "x-api-key": apiKey } : {} }
    );
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "get_floor_price",
  "Get collection floor price from Reservoir",
  {
    contract: z.string(),
    chain: z.enum(["ethereum", "polygon", "arbitrum", "base"]).default("ethereum"),
  },
  async ({ contract, chain }) => {
    const apiKey = process.env.RESERVOIR_API_KEY ?? "";
    const res = await fetch(
      `https://api-${chain === "ethereum" ? "eth" : chain}.reservoir.tools/collections/v7?id=${contract}`,
      { headers: apiKey ? { "x-api-key": apiKey } : {} }
    );
    const data = (await res.json()) as { collections?: Array<{ floorAsk?: { price?: { amount?: { decimal?: number } } } }> };
    const floor = data.collections?.[0]?.floorAsk?.price?.amount?.decimal;
    return { content: [{ type: "text", text: JSON.stringify({ contract, chain, floorPrice: floor }, null, 2) }] };
  }
);

async function main() {
  await server.connect(new StdioServerTransport());
}
main().catch(console.error);

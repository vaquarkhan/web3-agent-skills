#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "ipfs-storage-server", version: "1.0.0" });

server.tool(
  "pin_json",
  "Pin JSON metadata to IPFS via Pinata",
  {
    content: z.record(z.unknown()).describe("JSON object to pin"),
    name: z.string().optional().describe("Optional pin name"),
  },
  async ({ content, name }) => {
    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "PINATA_JWT not configured",
              hint: "Set PINATA_JWT env var or use web3_storage_upload",
            }),
          },
        ],
        isError: true,
      };
    }

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinataContent: content,
        pinataMetadata: name ? { name } : undefined,
      }),
    });

    const data = await res.json();
    const cid = (data as { IpfsHash?: string }).IpfsHash;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { cid, uri: cid ? `ipfs://${cid}` : undefined, gateway: cid ? `https://ipfs.io/ipfs/${cid}` : undefined, raw: data },
            null,
            2
          ),
        },
      ],
    };
  }
);

server.tool(
  "resolve_cid",
  "Resolve and fetch content from an IPFS CID",
  {
    cid: z.string(),
  },
  async ({ cid }) => {
    const gateways = ["https://ipfs.io/ipfs/", "https://cloudflare-ipfs.com/ipfs/"];
    for (const gw of gateways) {
      try {
        const res = await fetch(gw + cid.replace("ipfs://", ""), { signal: AbortSignal.timeout(15000) });
        if (res.ok) {
          const contentType = res.headers.get("content-type") ?? "";
          const body = contentType.includes("json") ? await res.json() : await res.text();
          return { content: [{ type: "text", text: JSON.stringify({ cid, gateway: gw, content: body }, null, 2) }] };
        }
      } catch {
        continue;
      }
    }
    return { content: [{ type: "text", text: `Failed to resolve CID: ${cid}` }], isError: true };
  }
);

server.tool(
  "validate_cid",
  "Validate IPFS CID format (v0 or v1)",
  {
    cid: z.string(),
  },
  async ({ cid }) => {
    const cleaned = cid.replace("ipfs://", "");
    const isV0 = cleaned.startsWith("Qm") && cleaned.length === 46;
    const isV1 = cleaned.startsWith("bafy") || cleaned.startsWith("bafk");
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ cid: cleaned, valid: isV0 || isV1, version: isV0 ? "v0" : isV1 ? "v1" : "unknown" }, null, 2),
        },
      ],
    };
  }
);

async function main() {
  await server.connect(new StdioServerTransport());
}
main().catch(console.error);

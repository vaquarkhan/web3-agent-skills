#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/** Known OFAC-sanctioned addresses (sample — production uses live API feeds) */
const SANCTIONS_DENYLIST = new Set([
  "0x8589427373D6D54E9A5775D365387E1eE1111111".toLowerCase(),
  "0x098B716B8Aaf21512996dC57EB3045e6f7100000".toLowerCase(),
]);

interface ScreeningResult {
  address: string;
  status: "CLEAR" | "FLAGGED" | "BLOCKED";
  riskScore: number;
  categories: string[];
  screenedAt: string;
  provider: string;
}

async function screenViaChainalysis(address: string): Promise<ScreeningResult | null> {
  const apiKey = process.env.CHAINALYSIS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(`https://api.chainalysis.com/api/risk/v2/entities/${address}`, {
      headers: { Token: apiKey, Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { riskScore?: number; categories?: string[] };
    const score = data.riskScore ?? 0;
    return {
      address,
      status: score >= 80 ? "BLOCKED" : score >= 50 ? "FLAGGED" : "CLEAR",
      riskScore: score,
      categories: data.categories ?? [],
      screenedAt: new Date().toISOString(),
      provider: "chainalysis",
    };
  } catch {
    return null;
  }
}

function localScreen(address: string): ScreeningResult {
  const normalized = address.toLowerCase();
  const isBlocked = SANCTIONS_DENYLIST.has(normalized);
  return {
    address,
    status: isBlocked ? "BLOCKED" : "CLEAR",
    riskScore: isBlocked ? 100 : 0,
    categories: isBlocked ? ["sanctions"] : [],
    screenedAt: new Date().toISOString(),
    provider: "local-denylist",
  };
}

const server = new McpServer({ name: "compliance-screening-server", version: "1.0.0" });

server.tool(
  "screen_address",
  "Screen a wallet address against sanctions lists and risk databases. REQUIRED before all outbound transfers.",
  {
    address: z.string().describe("Wallet address to screen"),
    chain: z.string().optional().describe("Chain context for screening"),
  },
  async ({ address, chain }) => {
    const external = await screenViaChainalysis(address);
    const result = external ?? localScreen(address);

    if (chain) {
      (result as ScreeningResult & { chain: string }).chain = chain;
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
      isError: result.status === "BLOCKED",
    };
  }
);

server.tool(
  "batch_screen_addresses",
  "Screen multiple addresses in one call",
  {
    addresses: z.array(z.string()).max(50),
  },
  async ({ addresses }) => {
    const results = await Promise.all(
      addresses.map(async (addr) => (await screenViaChainalysis(addr)) ?? localScreen(addr))
    );
    const blocked = results.filter((r) => r.status === "BLOCKED");
    return {
      content: [{ type: "text", text: JSON.stringify({ results, blockedCount: blocked.length }, null, 2) }],
      isError: blocked.length > 0,
    };
  }
);

server.tool(
  "check_travel_rule",
  "Check if a transfer amount triggers Travel Rule requirements",
  {
    amountUsd: z.number(),
    jurisdiction: z.enum(["US", "EU", "UK", "SG", "JP", "UAE", "GLOBAL"]).default("GLOBAL"),
    isVaspToVasp: z.boolean().default(false),
  },
  async ({ amountUsd, jurisdiction, isVaspToVasp }) => {
    const thresholds: Record<string, number> = {
      US: 3000,
      EU: 0,
      UK: 1000,
      SG: 1500,
      JP: 3000,
      UAE: 3500,
      GLOBAL: 3000,
    };
    const threshold = thresholds[jurisdiction] ?? 3000;
    const required = isVaspToVasp && amountUsd >= threshold;
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              travelRuleRequired: required,
              jurisdiction,
              thresholdUsd: threshold,
              amountUsd,
              action: required ? "Collect and transmit originator/beneficiary info via TRP" : "No Travel Rule action",
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

async function main() {
  await server.connect(new StdioServerTransport());
}
main().catch(console.error);

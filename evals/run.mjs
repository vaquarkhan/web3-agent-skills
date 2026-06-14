#!/usr/bin/env node
/**
 * Skill routing eval — verifies AGENTS.md routes common intents to expected skills.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const AGENTS = fs.readFileSync(path.join(ROOT, "AGENTS.md"), "utf8");

const ROUTING_CASES = [
  { intent: "wallet or signing", skill: "skill-01-wallet-management" },
  { intent: "swap, lend, stake", skill: "skill-03-defi-operations" },
  { intent: "bridge or cross-chain", skill: "skill-06-cross-chain-bridge" },
  { intent: "sanctions, MiCA", skill: "skill-09-compliance-aml" },
  { intent: "Flashbots, TWAP", skill: "skill-15-mev-protection" },
  { intent: "unknown contract or audit", skill: "skill-08-security-audit" },
  { intent: "NFT mint/trade", skill: "skill-04-nft-management" },
  { intent: "DAO proposal/vote", skill: "skill-05-dao-governance" },
  { intent: "Chainlink/Pyth/VRF", skill: "skill-11-oracle-data-feeds" },
  { intent: "RWA, ERC-3643", skill: "skill-13-rwa-tokenization" },
];

let passed = 0;
let failed = 0;

console.log("=== Web3 Agent Skills Routing Eval ===\n");

for (const { intent, skill } of ROUTING_CASES) {
  const line = AGENTS.split("\n").find((l) => l.includes(intent) && l.includes(skill));
  if (line) {
    console.log(`PASS: "${intent}" → ${skill}`);
    passed++;
  } else {
    console.error(`FAIL: "${intent}" should route to ${skill}`);
    failed++;
  }
}

const pct = Math.round((passed / ROUTING_CASES.length) * 100);
console.log(`\nResult: ${passed}/${ROUTING_CASES.length} (${pct}%)`);

if (failed > 0) process.exit(1);
console.log("Routing eval passed.");

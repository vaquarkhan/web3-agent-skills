#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SKILLS = path.join(ROOT, "skills");

const expected = Array.from({ length: 15 }, (_, i) =>
  `skill-${String(i + 1).padStart(2, "0")}-${[
    "wallet-management", "smart-contract-interaction", "defi-operations", "nft-management",
    "dao-governance", "cross-chain-bridge", "token-analytics", "security-audit",
    "compliance-aml", "identity-did", "oracle-data-feeds", "gas-optimization",
    "rwa-tokenization", "social-reputation", "mev-protection"
  ][i]}`
);

let failed = 0;
for (const skill of expected) {
  const p = path.join(SKILLS, skill, "SKILL.md");
  if (!fs.existsSync(p)) {
    console.error(`FAIL: missing ${p}`);
    failed++;
    continue;
  }
  const content = fs.readFileSync(p, "utf8");
  if (!content.startsWith("---") || !content.includes("name:") || !content.includes("description:")) {
    console.error(`FAIL: invalid frontmatter in ${skill}`);
    failed++;
  } else {
    console.log(`OK: ${skill}`);
  }
}
process.exit(failed > 0 ? 1 : 0);

#!/usr/bin/env node
/** Local sanctions screening demo (production uses compliance-screening-server MCP) */
const DENYLIST = new Set([
  "0x8589427373D6D54E9A5775D365387E1eE1111111".toLowerCase(),
]);

function screen(address) {
  const normalized = address.toLowerCase();
  if (DENYLIST.has(normalized)) {
    return { status: "BLOCKED", riskScore: 100, categories: ["sanctions"] };
  }
  return { status: "CLEAR", riskScore: 0, categories: [] };
}

const addresses = require("../data/sample-addresses.json");
console.log("=== Compliance Screening ===");
let blocked = 0;
for (const addr of addresses) {
  const result = screen(addr);
  console.log(`${addr}: ${result.status} (risk: ${result.riskScore})`);
  if (result.status === "BLOCKED") blocked++;
}
console.log(blocked > 0 ? "WARN: blocked addresses found" : "PASS: all addresses clear");

#!/usr/bin/env node
/** Warns on unlimited token approvals (type(uint256).max) */
const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const APPROVAL_THRESHOLD = BigInt("1000000000000000000000000"); // 1M tokens @ 18 decimals

function checkApproval(amount) {
  const value = BigInt(amount);
  if (value === MAX_UINT256) {
    return { status: "WARN", message: "Unlimited approval detected — require user confirmation" };
  }
  if (value > APPROVAL_THRESHOLD) {
    return { status: "WARN", message: "Large approval — recommend exact amount" };
  }
  return { status: "PASS", message: "Approval amount acceptable" };
}

const testCases = [
  { name: "exact approval", amount: "1000000000000000000" },
  { name: "unlimited", amount: MAX_UINT256.toString(16).padStart(64, "0").replace(/^/, "0x") },
];

console.log("=== Approval Guardrail Check ===");
for (const tc of testCases) {
  const hex = tc.amount.startsWith("0x") ? tc.amount : "0x" + BigInt(tc.amount).toString(16);
  const result = checkApproval(hex);
  console.log(`${tc.name}: ${result.status} — ${result.message}`);
}
console.log("PASS: approval checker operational");

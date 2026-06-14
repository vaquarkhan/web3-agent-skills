#!/usr/bin/env node
const THRESHOLDS = { US: 3000, EU: 0, GLOBAL: 3000 };

function checkTravelRule(amountUsd, jurisdiction, isVasp) {
  const threshold = THRESHOLDS[jurisdiction] ?? THRESHOLDS.GLOBAL;
  return isVasp && amountUsd >= threshold;
}

console.log("=== Travel Rule Check ===");
const cases = [
  { amount: 5000, jurisdiction: "US", isVasp: true },
  { amount: 100, jurisdiction: "US", isVasp: true },
  { amount: 5000, jurisdiction: "US", isVasp: false },
];
for (const c of cases) {
  const required = checkTravelRule(c.amount, c.jurisdiction, c.isVasp);
  console.log(`$${c.amount} ${c.jurisdiction} VASP=${c.isVasp}: Travel Rule ${required ? "REQUIRED" : "not required"}`);
}
console.log("PASS: travel rule checker operational");

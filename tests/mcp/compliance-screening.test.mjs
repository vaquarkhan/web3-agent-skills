import { describe, it } from "node:test";
import assert from "node:assert";

/** Mirrors compliance-screening-server local denylist logic */
const DENYLIST = new Set([
  "0x8589427373D6D54E9A5775D365387E1eE1111111".toLowerCase(),
]);

function screen(address) {
  const normalized = address.toLowerCase();
  if (DENYLIST.has(normalized)) {
    return { status: "BLOCKED", riskScore: 100 };
  }
  return { status: "CLEAR", riskScore: 0 };
}

describe("Compliance screening logic", () => {
  it("clears benign address", () => {
    const r = screen("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
    assert.strictEqual(r.status, "CLEAR");
    assert.strictEqual(r.riskScore, 0);
  });

  it("blocks denylisted address", () => {
    const r = screen("0x8589427373D6D54E9A5775D365387E1eE1111111");
    assert.strictEqual(r.status, "BLOCKED");
    assert.strictEqual(r.riskScore, 100);
  });

  it("is case-insensitive", () => {
    const r = screen("0x8589427373d6d54e9a5775d365387e1ee1111111");
    assert.strictEqual(r.status, "BLOCKED");
  });
});

describe("Travel Rule thresholds", () => {
  const THRESHOLDS = { US: 3000, EU: 0, GLOBAL: 3000 };

  function required(amountUsd, jurisdiction, isVasp) {
    const t = THRESHOLDS[jurisdiction] ?? THRESHOLDS.GLOBAL;
    return isVasp && amountUsd >= t;
  }

  it("requires Travel Rule for US VASP transfer >= $3000", () => {
    assert.strictEqual(required(5000, "US", true), true);
  });

  it("skips Travel Rule for non-VASP", () => {
    assert.strictEqual(required(5000, "US", false), false);
  });

  it("requires Travel Rule for all EU VASP transfers", () => {
    assert.strictEqual(required(1, "EU", true), true);
  });
});

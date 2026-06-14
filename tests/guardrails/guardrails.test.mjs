import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const GUARDRAILS = path.join(ROOT, "guardrails", "web3-guardrails.yaml");

describe("Web3 guardrails", () => {
  const content = fs.readFileSync(GUARDRAILS, "utf8");

  it("blocks private key exposure", () => {
    assert.ok(content.includes("never_expose_secrets"));
    assert.ok(content.includes("BLOCK"));
  });

  it("requires simulation before execute", () => {
    assert.ok(content.includes("simulate_before_execute"));
  });

  it("enforces $10,000 confirmation threshold", () => {
    assert.ok(content.includes("threshold_usd: 10000"));
  });

  it("requires sanctions screening", () => {
    assert.ok(content.includes("sanctions_screen"));
    assert.ok(content.includes("compliance-screening-server"));
  });

  it("warns on unlimited approvals", () => {
    assert.ok(content.includes("unlimited_approval_warning"));
  });
});

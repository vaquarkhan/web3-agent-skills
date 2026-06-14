import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");

describe("Knowledge base seed data", () => {
  const seedFiles = [
    "knowledge-base/chains/ethereum/chain.yaml",
    "knowledge-base/chains/polygon/chain.yaml",
    "knowledge-base/chains/base/chain.yaml",
    "knowledge-base/chains/solana/chain.yaml",
    "knowledge-base/chains/optimism/chain.yaml",
    "knowledge-base/protocols/uniswap/contracts.yaml",
    "knowledge-base/protocols/aave/contracts.yaml",
    "knowledge-base/regulations/mica/overview.yaml",
    "knowledge-base/standards/erc20/abi.json",
  ];

  for (const rel of seedFiles) {
    it(`should have seed file ${rel}`, () => {
      const p = path.join(ROOT, rel);
      assert.ok(fs.existsSync(p), `missing ${rel}`);
      const content = fs.readFileSync(p, "utf8");
      assert.ok(content.length > 50, `${rel} appears empty`);
    });
  }

  it("ethereum chain.yaml has chain_id 1", () => {
    const content = fs.readFileSync(path.join(ROOT, "knowledge-base/chains/ethereum/chain.yaml"), "utf8");
    assert.ok(content.includes("chain_id: 1"));
    assert.ok(content.includes("provenance:"));
  });

  it("erc20 abi.json is valid JSON array", () => {
    const abi = JSON.parse(fs.readFileSync(path.join(ROOT, "knowledge-base/standards/erc20/abi.json"), "utf8"));
    assert.ok(Array.isArray(abi));
    assert.ok(abi.some((item) => item.name === "transfer"));
  });
});

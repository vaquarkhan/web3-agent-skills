import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const SKILLS_DIR = path.join(ROOT, "skills");

describe("Web3 Agent Skills", () => {
  const expectedSkills = [
    "skill-01-wallet-management",
    "skill-02-smart-contract-interaction",
    "skill-03-defi-operations",
    "skill-04-nft-management",
    "skill-05-dao-governance",
    "skill-06-cross-chain-bridge",
    "skill-07-token-analytics",
    "skill-08-security-audit",
    "skill-09-compliance-aml",
    "skill-10-identity-did",
    "skill-11-oracle-data-feeds",
    "skill-12-gas-optimization",
    "skill-13-rwa-tokenization",
    "skill-14-social-reputation",
    "skill-15-mev-protection",
  ];

  for (const skill of expectedSkills) {
    it(`should have SKILL.md for ${skill}`, () => {
      const skillPath = path.join(SKILLS_DIR, skill, "SKILL.md");
      assert.ok(fs.existsSync(skillPath), `Missing ${skillPath}`);

      const content = fs.readFileSync(skillPath, "utf-8");
      assert.ok(content.startsWith("---"), `${skill} missing YAML frontmatter`);
      assert.ok(content.includes("name:"), `${skill} missing name in frontmatter`);
      assert.ok(content.includes("description:"), `${skill} missing description`);
    });
  }

  it("should have guardrails config", () => {
    const guardrails = path.join(ROOT, "guardrails", "web3-guardrails.yaml");
    assert.ok(fs.existsSync(guardrails));
    const content = fs.readFileSync(guardrails, "utf-8");
    assert.ok(content.includes("never_expose_secrets"));
    assert.ok(content.includes("threshold_usd: 10000"));
  });

  it("should have 6 MCP servers", () => {
    const mcpDir = path.join(ROOT, "tools", "mcp-servers");
    const servers = fs.readdirSync(mcpDir).filter((d) =>
      fs.existsSync(path.join(mcpDir, d, "package.json"))
    );
    assert.strictEqual(servers.length, 6);
  });
});

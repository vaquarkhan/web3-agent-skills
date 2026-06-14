import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");

describe("Asset registry validation", () => {
  it("validate-assets.mjs exits 0", () => {
    execSync("node scripts/validate-assets.mjs", { cwd: ROOT, stdio: "pipe" });
  });

  it("all starter packs referenced in registry exist", () => {
    const registry = JSON.parse(fs.readFileSync(path.join(ROOT, "registry", "assets.json"), "utf8"));
    for (const sp of registry.starter_packs) {
      assert.ok(fs.existsSync(path.join(ROOT, sp.path)), `missing ${sp.path}`);
    }
  });

  it("all presets in skills-index exist", () => {
    const index = fs.readFileSync(path.join(ROOT, "skills-index.md"), "utf8");
    const presets = index.match(/presets\/[\w-]+\.yaml/g) ?? [];
    for (const p of presets) {
      assert.ok(fs.existsSync(path.join(ROOT, p)), `missing ${p}`);
    }
  });

  it("version matches between package.json and assets.json", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const assets = JSON.parse(fs.readFileSync(path.join(ROOT, "registry", "assets.json"), "utf8"));
    assert.strictEqual(pkg.version, assets.version);
  });
});

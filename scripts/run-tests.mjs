#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TESTS_DIR = path.join(ROOT, "tests");

function findTests(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findTests(full));
    else if (entry.name.endsWith(".test.mjs")) files.push(full);
  }
  return files;
}

const tests = findTests(TESTS_DIR);
if (tests.length === 0) {
  console.error("No test files found");
  process.exit(1);
}

execSync(`node --test ${tests.map((t) => `"${t}"`).join(" ")}`, {
  cwd: ROOT,
  stdio: "inherit",
});

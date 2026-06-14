#!/usr/bin/env node
/**
 * Validates registry/assets.json paths exist on disk and version matches package.json.
 * Prevents shipping broken references (starter packs, presets, templates, MCP).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REGISTRY_PATH = path.join(ROOT, "registry", "assets.json");
const PACKAGE_PATH = path.join(ROOT, "package.json");
const SKILLS_INDEX = path.join(ROOT, "skills-index.md");
const EXTENSION_JS = path.join(ROOT, "vscode-extension", "extension.js");

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function collectPaths(obj, errors, seen = new Set()) {
  if (typeof obj === "string" && (obj.includes("/") || obj.includes("\\"))) {
    const normalized = obj.replace(/\\/g, "/");
    if (normalized.match(/\.(yaml|yml|json|md|mdc|sh|js|mjs|ts|py)$/i) || normalized.includes("/")) {
      if (!seen.has(normalized)) {
        seen.add(normalized);
        if (!exists(normalized)) errors.push(`missing path: ${normalized}`);
      }
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => collectPaths(item, errors, seen));
  } else if (obj && typeof obj === "object") {
    Object.values(obj).forEach((v) => collectPaths(v, errors, seen));
  }
}

function extractPresetPathsFromSkillsIndex() {
  const content = fs.readFileSync(SKILLS_INDEX, "utf8");
  const matches = content.match(/presets\/[\w-]+\.yaml/g) ?? [];
  return [...new Set(matches)];
}

function extractStarterPackPathsFromExtension() {
  if (!exists("vscode-extension/extension.js")) return [];
  const content = fs.readFileSync(EXTENSION_JS, "utf8");
  const matches = content.match(/starter-packs\/[\w-]+\.yaml/g) ?? [];
  return [...new Set(matches)];
}

function validateRegistry(data) {
  const errors = [];

  if (data.version) {
    const pkg = loadJson(PACKAGE_PATH);
    if (data.version !== pkg.version) {
      errors.push(`version mismatch: assets.json=${data.version} package.json=${pkg.version}`);
    }
  } else {
    errors.push("assets.json missing top-level version field");
  }

  for (const t of data.templates ?? []) {
    if (!exists(t.path)) errors.push(`missing template: ${t.path}`);
  }

  const starterIds = new Set();
  for (const s of data.starter_packs ?? []) {
    if (starterIds.has(s.id)) errors.push(`duplicate starter pack id: ${s.id}`);
    starterIds.add(s.id);
    if (!exists(s.path)) errors.push(`missing starter pack: ${s.path}`);
    for (const f of s.install_files ?? []) {
      if (!exists(f)) errors.push(`missing starter install file: ${f}`);
    }
  }

  const exampleIds = new Set();
  for (const e of data.examples ?? []) {
    if (exampleIds.has(e.id)) errors.push(`duplicate example id: ${e.id}`);
    exampleIds.add(e.id);
    if (!exists(e.readme)) errors.push(`missing example readme: ${e.readme}`);
  }

  for (const m of data.mcp_templates ?? []) {
    if (!exists(m.path)) errors.push(`missing MCP template: ${m.path}`);
  }

  for (const preset of extractPresetPathsFromSkillsIndex()) {
    if (!exists(preset)) errors.push(`skills-index references missing preset: ${preset}`);
  }

  for (const sp of extractStarterPackPathsFromExtension()) {
    if (!exists(sp)) errors.push(`vscode extension references missing starter pack: ${sp}`);
  }

  // Knowledge base seed files referenced by presets
  const presetFiles = fs.readdirSync(path.join(ROOT, "presets")).filter((f) => f.endsWith(".yaml"));
  for (const pf of presetFiles) {
    const content = fs.readFileSync(path.join(ROOT, "presets", pf), "utf8");
    const kbMatch = content.match(/knowledge_base:\s*(\S+)/);
    if (kbMatch && !exists(kbMatch[1])) {
      errors.push(`preset ${pf} references missing knowledge_base: ${kbMatch[1]}`);
    }
  }

  return errors;
}

function main() {
  if (!exists("registry/assets.json")) {
    console.error("Missing registry/assets.json");
    process.exit(1);
  }

  const data = loadJson(REGISTRY_PATH);
  const errors = validateRegistry(data);

  if (errors.length) {
    console.error("Asset validation failed:");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(
    `Validated v${data.version}: ${data.templates?.length ?? 0} templates, ` +
      `${data.starter_packs?.length ?? 0} starter packs, ` +
      `${data.examples?.length ?? 0} examples, ` +
      `${data.mcp_templates?.length ?? 0} MCP templates.`
  );
  console.log("All registry paths exist on disk.");
}

main();

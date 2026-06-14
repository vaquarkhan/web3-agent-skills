#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, "../metadata/collection.json"), "utf8"));
console.log("=== Metadata Pin (dry-run) ===");
console.log("Name:", metadata.name);
console.log("Attributes:", metadata.attributes.length);
if (process.env.PINATA_JWT) {
  console.log("PINATA_JWT set — use ipfs-storage-server MCP pin_json for live pin");
} else {
  console.log("SKIP live pin: set PINATA_JWT to pin via Pinata");
}
console.log("PASS: metadata ready for pinning");

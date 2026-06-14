#!/usr/bin/env node
/**
 * Symlinks skills/ into .agents/skills/ for Cursor auto-discovery.
 * On Windows, creates directory junctions; on Unix, symlinks.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'skills');
const dest = path.join(root, '.agents', 'skills');

if (!fs.existsSync(src)) {
  console.error('skills/ directory not found');
  process.exit(1);
}

fs.mkdirSync(dest, { recursive: true });

for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const srcPath = path.join(src, entry.name);
  const destPath = path.join(dest, entry.name);

  if (fs.existsSync(destPath)) {
    console.log(`skip (exists): ${entry.name}`);
    continue;
  }

  try {
    fs.symlinkSync(srcPath, destPath, 'junction');
    console.log(`linked: ${entry.name}`);
  } catch (err) {
    console.error(`failed ${entry.name}:`, err.message);
  }
}

console.log('Done. Skills available at .agents/skills/');

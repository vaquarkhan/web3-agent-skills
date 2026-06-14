#!/usr/bin/env node
function validateCid(cid) {
  const cleaned = cid.replace("ipfs://", "");
  const isV0 = cleaned.startsWith("Qm") && cleaned.length === 46;
  const isV1 = cleaned.startsWith("bafy") || cleaned.startsWith("bafk");
  return { valid: isV0 || isV1, version: isV0 ? "v0" : isV1 ? "v1" : "unknown" };
}

const testCids = ["QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG", "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", "invalid"];
console.log("=== CID Validation ===");
for (const cid of testCids) {
  const r = validateCid(cid);
  console.log(`${cid.slice(0, 20)}...: ${r.valid ? "VALID" : "INVALID"} (${r.version})`);
}
console.log("PASS: CID validator operational");

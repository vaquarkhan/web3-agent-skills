# Multicall Patterns

## Multicall3 (Universal — all EVM chains)

Address: `0xcA11bde05977b3631167028862bE2a173976CA11`

```solidity
// aggregate3 — allows per-call failure
function aggregate3(Call3[] calldata calls) external payable returns (Result[] memory);
```

## Usage

Batch up to 50 read calls in a single RPC request:

1. Build array of `{ target, allowFailure, callData }`
2. Call `aggregate3` via `eth_call`
3. Decode each result independently

Reduces RPC rate limits and latency for portfolio queries, pool state reads, and governance data.

---
name: skill-12-gas-optimization
description: Optimizes transaction gas via EIP-1559 fee prediction, nonce management, private transaction submission, and EIP-4844 blob fee handling. Use when estimating fees, fixing stuck transactions, or submitting MEV-sensitive txs.
metadata:
  phase: 1
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb
---

# Gas Optimization

## When to Use

- Estimating transaction costs before execution
- Managing nonces for sequential or parallel txs
- Submitting private transactions (Flashbots, MEV-Share)
- Handling EIP-4844 blob transactions (L2 data availability)
- Recovering stuck transactions (speed up / cancel)

## Prerequisites

- MCP: `blockchain-rpc-server`
- Skill-15 for private tx routing on mainnet swaps

## EIP-1559 Fee Strategy

```
maxPriorityFeePerGas = baseFee * 0.1 (min 1 gwei on Ethereum)
maxFeePerGas = baseFee * 2 + maxPriorityFeePerGas
```

1. Fetch `eth_feeHistory` for last 10 blocks
2. Use 75th percentile of priority fees
3. On L2s (Arbitrum, Base, Optimism): use L1 data fee + L2 execution fee

## Nonce Management

- Query `eth_getTransactionCount` with `pending` tag
- Use nonce manager for parallel txs (increment locally, track pending)
- Cancel: send 0 ETH self-transfer with same nonce, +20% gas
- Speed up: resubmit with same nonce, +15% maxFeePerGas

## Private Transactions

| Network | Method |
|---------|--------|
| Ethereum | Flashbots Protect RPC, MEV-Share |
| Polygon | Fastlane private RPC |
| Base/Arbitrum | Sequencer private orderflow (limited) |

Use private submission for swaps, liquidations, and any MEV-exposed operation.

## Blob Fees (EIP-4844)

For rollup batch submissions or blob-carrying txs:

```
blobGasPrice = getBlobBaseFee()
totalBlobCost = blobGasUsed * blobGasPrice
```

Monitor `excessBlobGas` in block header for fee spikes.

## L2 Gas Notes

| Chain | Gas Token | Notes |
|-------|-----------|-------|
| Arbitrum | ETH | L1 calldata cost dominates |
| Optimism | ETH | L1 fee + L2 fee split |
| Base | ETH | OP Stack, similar to Optimism |
| Polygon | POL | Low base fees, occasional spikes |

## References

- `references/fee-oracles.md` — RPC methods and fallback APIs

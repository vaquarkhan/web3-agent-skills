---
name: skill-15-mev-protection
description: Protects transactions from MEV via Flashbots, intent-based trading, sandwich attack mitigation, and TWAP orders. Use for high-value swaps, liquidations, or any MEV-exposed on-chain activity.
metadata:
  phase: 2
  chains: ethereum,polygon,arbitrum,base
---

# MEV Protection

## When to Use

- Executing swaps > $1,000 on public mempools
- Protecting against sandwich attacks
- Submitting liquidation transactions
- Implementing TWAP/VWAP execution strategies
- Using intent-based protocols (CoW Swap, UniswapX)

## Prerequisites

- MCP: `blockchain-rpc-server`, `price-feed-server`
- Skill-12 for private tx submission

## MEV Attack Vectors

| Attack | Mechanism | Mitigation |
|--------|-----------|------------|
| Sandwich | Front-run buy + back-run sell | Private mempool, slippage limits |
| Frontrunning | Copy profitable tx with higher gas | Flashbots bundle, commit-reveal |
| Backrunning | Arbitrage after your tx | Accept (usually harmless) |
| JIT Liquidity | Temporary LP around your swap | TWAP, smaller chunks |

## Workflow

### 1. Private Transaction Submission

**Ethereum (Flashbots Protect):**
```
RPC: https://rpc.flashbots.net
```
- No revert protection by default — add `X-Flashbots-Signature` for bundles
- Transactions not visible in public mempool

**MEV-Share:** Share MEV refund with searchers while maintaining privacy.

### 2. Intent-Based Trading

| Protocol | Chain | Mechanism |
|----------|-------|-----------|
| CoW Swap | Ethereum | Batch auctions, MEV redistribution |
| UniswapX | Multi | Dutch auctions, filler network |
| 1inch Fusion | Multi | Resolver competition |

Prefer intent-based routing for trades > $10,000.

### 3. TWAP Execution

For large orders splitting across time:

```
chunkSize = totalAmount / numChunks
interval = totalDuration / numChunks
```

1. Split order into N equal chunks
2. Execute each via private RPC with randomized timing (±10%)
3. Monitor cumulative slippage vs benchmark price
4. Pause if cumulative slippage exceeds threshold

### 4. Slippage Configuration

| Trade Size | Recommended Slippage | Method |
|------------|---------------------|--------|
| < $1K | 0.5% | Public or private |
| $1K–$10K | 0.5–1% | Private mempool |
| $10K–$100K | TWAP 5–10 chunks | Intent or Flashbots |
| > $100K | TWAP + intent protocol | CoW/UniswapX |

## Pre-Execution

- [ ] Private RPC configured for target chain
- [ ] Slippage and deadline set on swap params
- [ ] Simulation confirms no revert
- [ ] User confirmed if trade > $10,000

## References

- `references/flashbots-setup.md`
- `references/intent-protocols.md`

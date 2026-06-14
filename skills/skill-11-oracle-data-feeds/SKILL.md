---
name: skill-11-oracle-data-feeds
description: Integrates oracle and data feed services including Chainlink and Pyth price feeds, VRF randomness, and Chainlink Automation keepers. Use when consuming on-chain price data, random numbers, or conditional automation.
metadata:
  phase: 4
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb
---

# Oracle & Data Feeds

## When to Use

- Reading price feeds for DeFi calculations
- Requesting verifiable random numbers (VRF)
- Setting up Chainlink Automation (keepers)
- Validating oracle freshness and deviation thresholds
- Comparing multi-oracle prices for manipulation detection

## Prerequisites

- MCP: `price-feed-server`, `blockchain-rpc-server`
- Skill-08 for oracle manipulation risk assessment

## Workflow

### 1. Chainlink Price Feeds

```solidity
AggregatorV3Interface feed = AggregatorV3Interface(aggregatorAddress);
(, int256 price, , uint256 updatedAt, ) = feed.latestRoundData();
```

**Validation checks:**
- `updatedAt` within heartbeat (varies: 1h ETH/USD, 24h long-tail)
- `price > 0`
- Compare with Pyth/CoinGecko — flag if deviation > 2%

Feed addresses: see `knowledge-base/protocols/` and Chainlink docs per chain.

### 2. Pyth Network

- Pull model: update price feeds in same tx via `getUpdateData()`
- Hermes API for off-chain price reads
- Lower latency than push oracles for L2s

### 3. Chainlink VRF v2.5

1. Subscribe or direct funding
2. Request randomness: `requestRandomWords(keyHash, subId, minConfirmations, callbackGasLimit, numWords)`
3. Fulfill in callback: `fulfillRandomWords(requestId, randomWords)`
4. Never use block variables (`blockhash`, `timestamp`) for randomness

### 4. Chainlink Automation

| Type | Use Case |
|------|----------|
| Time-based | Periodic harvest, rebalance |
| Custom logic | `checkUpkeep()` returns upkeepNeeded |
| Log trigger | React to specific events |

Register upkeep with LINK funding; monitor balance.

### 5. Oracle Security

- Use multiple sources for critical decisions (liquidations, minting)
- Implement staleness checks and circuit breakers
- TWAP for AMM-derived prices (minimum 30-minute window)
- Never use spot DEX price as sole oracle for high-value ops

## References

- `references/chainlink-feeds.md`
- `references/pyth-integration.md`
- `price-feed-server` MCP tools

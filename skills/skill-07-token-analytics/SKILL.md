---
name: skill-07-token-analytics
description: Analyzes on-chain token data including whale tracking, DEX volume, wallet PnL, and token unlock schedules. Use when researching token metrics, portfolio performance, or market activity.
metadata:
  phase: 2
  chains: ethereum,solana,polygon,arbitrum,base
---

# Token Analytics

## When to Use

- Tracking whale wallet movements
- Analyzing DEX trading volume and liquidity
- Calculating wallet profit/loss (PnL)
- Monitoring token unlock/vesting schedules
- Identifying smart money flows

## Prerequisites

- MCP: `blockchain-rpc-server`, `defi-protocol-server`, `price-feed-server`
- Optional: Dune Analytics, Nansen, Arkham APIs

## Workflow

### 1. Whale Tracking

1. Define whale threshold (e.g., > 0.1% of supply or > $1M holdings)
2. Query top holders via explorer API or `eth_call` on token contract
3. Monitor large transfers via event logs (`Transfer` topic)
4. Alert on exchange inflows (potential sell pressure)

### 2. DEX Volume

- Pull 24h volume from subgraph (Uniswap, Curve) via `defi-protocol-server`
- Compare CEX vs DEX volume for price discovery quality
- Track unique traders and buy/sell ratio

### 3. Wallet PnL

```
Realized PnL = Σ(sell proceeds) - Σ(buy cost basis for sold tokens)
Unrealized PnL = current value - remaining cost basis
```

1. Index wallet `Transfer` events for target token
2. Apply FIFO or specific-lot cost basis method
3. Fetch historical prices from `price-feed-server`
4. Account for gas costs and bridge fees

### 4. Unlock Schedules

- Parse vesting contracts (linear, cliff, milestone)
- Cross-reference with token allocations (team, investors, community)
- Flag upcoming unlocks > 1% of circulating supply

## Data Sources

| Source | Data |
|--------|------|
| The Graph | DEX trades, LP events, lending |
| CoinGecko | Market cap, price history |
| Etherscan | Holder distribution, contract events |
| Token unlocks APIs | Vesting calendars |

## Output Format

Present analytics with:
- Time range and data freshness timestamp
- Methodology (cost basis method, price source)
- Confidence level for incomplete data

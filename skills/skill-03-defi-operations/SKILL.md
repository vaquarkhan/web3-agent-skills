---
name: skill-03-defi-operations
description: Executes DeFi operations including token swaps, lending/borrowing, staking, liquidity provision, flash loans, perpetuals, and vault strategies. Use when interacting with Uniswap, Aave, Compound, Lido, or other DeFi protocols.
metadata:
  phase: 1
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb
---

# DeFi Operations

## When to Use

- Swapping tokens on DEXs (Uniswap, Curve, 1inch)
- Lending/borrowing (Aave, Compound, Morpho)
- Staking (Lido stETH, EigenLayer restaking)
- Providing/removing liquidity (Uniswap V3, Curve)
- Flash loans (Aave, Balancer, dYdX)
- Perpetual trading (GMX, dYdX v4)
- Yield vaults (Yearn, ERC-4626 vaults)

## Prerequisites

- MCP: `blockchain-rpc-server`, `defi-protocol-server`, `price-feed-server`
- Skills: skill-02 (contract calls), skill-12 (gas), skill-15 (MEV for swaps)
- Guardrails: simulate all txs; screen counterparties

## Workflow

### 1. Swap

1. Get quote from `defi-protocol-server` or 1inch API
2. Check price impact (< 1% for large trades; use TWAP if higher — skill-15)
3. Verify router address against known-good list
4. Set slippage tolerance (default 0.5%, max 3% without confirmation)
5. Approve exact amount (never unlimited without explicit user consent)
6. Execute swap; verify received amount ≥ minOut

### 2. Lend / Borrow

| Protocol | Supply | Borrow | Liquidation Threshold |
|----------|--------|--------|----------------------|
| Aave V3 | `supply()` | `borrow()` | Health factor > 1.5 recommended |
| Compound V3 | `supply()` | N/A (Comet) | Collateral factor varies |
| Morpho | Optimizer bundles | Peer-matched rates | Check LLTV |

Always maintain health factor buffer. Monitor oracle price feeds (skill-11).

### 3. Stake / Restake

- **Lido:** `submit()` ETH → stETH; check rebasing vs wstETH for integrations
- **EigenLayer:** deposit into strategy contracts; track withdrawal queues
- **Liquid staking:** verify validator set and slashing risk

### 4. Liquidity Provision

- Uniswap V3: select tick range; narrow ranges = higher IL risk
- Calculate impermanent loss before deposit
- Use `defi-protocol-server` for current pool APR/TVL

### 5. Flash Loans

1. Identify provider (Aave: 0.09% fee, Balancer: 0% on some pools)
2. Build callback contract with atomic repay logic
3. Simulate full transaction — revert if unprofitable
4. Never use flash loans for unbounded external calls

## Protocol References

See `knowledge-base/protocols/` for addresses, ABIs, and subgraph endpoints per chain.

## Risk Checklist

- [ ] Contract verified and on protocol allowlist
- [ ] Slippage and deadline set
- [ ] Health factor / collateral ratio safe
- [ ] Token approvals scoped to exact amount
- [ ] MEV protection enabled for swaps > $1,000 (skill-15)

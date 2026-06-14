# Uniswap Swap — Specification

## Goal

Execute a Uniswap V3 token swap with full guardrail compliance: verification, simulation, scoped approvals, and MEV awareness.

## Acceptance Criteria

- [ ] Router address matches known-good list for target chain
- [ ] Token approval is exact amount (not unlimited) unless user confirms
- [ ] Swap simulated successfully via `eth_call`
- [ ] Slippage tolerance ≤ 3% (or user confirmed higher)
- [ ] Price impact < 1% for trades > $1,000 (or TWAP recommended)
- [ ] Recipient address screened via compliance MCP

## Constraints

- No private keys in logs or output
- Max value without confirmation: $10,000 USD
- Mainnet writes require explicit user approval

## References

- skill-03-defi-operations
- skill-08-security-audit
- skill-15-mev-protection
- guardrails/web3-guardrails.yaml

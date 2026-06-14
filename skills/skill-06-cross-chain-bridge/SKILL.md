---
name: skill-06-cross-chain-bridge
description: Handles cross-chain operations including token bridging, cross-chain messaging, and intent-based routing. Use when moving assets or data between blockchains.
metadata:
  phase: 3
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb,cosmos,solana
---

# Cross-Chain Bridge

## When to Use

- Bridging tokens between L1 and L2 or across L2s
- Sending cross-chain messages (LayerZero, Wormhole, CCIP)
- Intent-based cross-chain swaps (Across, Stargate)
- Validating bridge security before large transfers

## Prerequisites

- MCP: `blockchain-rpc-server`, `price-feed-server`, `compliance-screening-server`
- Skills: skill-08 (bridge contract verification), skill-09 (screen recipient)

## Workflow

### 1. Bridge Selection

| Bridge | Type | Security Model |
|--------|------|----------------|
| Native (Arbitrum, Optimism) | Canonical | L1 contract + fraud/validity proof |
| Stargate (LayerZero) | Liquidity | Oracle + relayer (configurable) |
| Across | Intent | Optimistic with bonded relayers |
| Wormhole | Messaging | Guardian multisig |
| CCIP (Chainlink) | Messaging | DON + Risk Management Network |

For transfers > $10,000: prefer canonical bridges or CCIP over pure liquidity bridges.

### 2. Bridge Security Checklist

- [ ] Bridge TVL and audit history reviewed
- [ ] Contract verified on both source and destination chains
- [ ] No active exploit warnings (check Rekt, bridge status pages)
- [ ] Estimated time and fees acceptable
- [ ] Destination address correct for target chain format

### 3. Execution

1. Approve token on source chain (exact amount)
2. Call bridge deposit/send function
3. Monitor source tx confirmation
4. Track message delivery (LayerZero scan, Wormhole explorer)
5. Claim on destination if manual claim required
6. Verify received amount matches expected (minus fees)

### 4. Cross-Chain Messaging

For dApp cross-chain calls:
1. Encode payload with target function selector
2. Set gas limit on destination via quote
3. Pay messaging fee in native token or LINK
4. Handle `lzReceive` / `ccipReceive` on destination

### 5. Intent-Based Routing

Across and similar protocols:
- User expresses intent (source token → destination token)
- Relayers compete to fill at best rate
- Refund on source if not filled within deadline

## Risk Warnings

- Bridge hacks historically largest DeFi losses — verify before large transfers
- Always test with small amount first on new routes
- Never bridge to unverified recipient contracts

## References

- `knowledge-base/chains/` — per-chain bridge addresses
- `references/bridge-security-matrix.md`

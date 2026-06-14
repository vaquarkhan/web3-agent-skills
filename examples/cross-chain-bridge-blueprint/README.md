# Cross-Chain Bridge — Architecture Blueprint

**Type:** Blueprint  
**Skills:** skill-06-cross-chain-bridge, skill-09-compliance-aml

## Overview

Plan an Ethereum → Arbitrum USDC bridge integration with canonical bridge preference and compliance screening on both sides.

## Key Decisions

- Bridge: Arbitrum canonical bridge (not liquidity bridge for > $10K)
- Screening: compliance MCP on source and destination addresses
- Test: small amount first, then production threshold

See `spec.md`, `plan.md`, `tasks.md`.

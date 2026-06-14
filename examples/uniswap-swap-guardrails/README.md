# Uniswap Swap with Guardrails

**Type:** Runnable scaffold  
**Skills:** skill-03-defi-operations, skill-08-security-audit, skill-15-mev-protection

Demonstrates a safe Uniswap V3 swap workflow: contract verification, approval scoping, simulation, and slippage checks.

## Prerequisites

- Node.js 20+
- RPC URL in `.env` (see repo root `.env.example`)

## Smoke Test

```bash
make smoke-test
```

Or manually:

```bash
node scripts/simulate-swap.js
node scripts/check-approval.js
```

## Workflow

1. Verify router contract against known-good address
2. Check token approval (warn if unlimited)
3. Simulate swap via `eth_call`
4. Validate slippage ≤ 3%
5. Recommend private mempool for trades > $1,000

## Files

- `spec.md` — requirements and acceptance criteria
- `plan.md` — implementation plan
- `tasks.md` — atomic task breakdown
- `config/chains.json` — chain IDs and router addresses
- `scripts/simulate-swap.js` — read-only swap simulation
- `scripts/check-approval.js` — approval amount validator

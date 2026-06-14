# DeFi Yield Vault — Architecture Blueprint

**Type:** Blueprint (no executable code)  
**Skills:** skill-03-defi-operations, skill-13-rwa-tokenization

## Overview

Design an ERC-4626 yield vault wrapping Aave V3 supply positions with compliance gates for institutional depositors.

## Deliverables

- `spec.md` — vault requirements, share accounting, withdrawal queues
- `plan.md` — phased rollout (testnet → audit → mainnet)
- `tasks.md` — atomic implementation tasks

## Architecture

```
Depositor → ERC-4626 Vault → Aave V3 Pool → aToken
                ↓
         Compliance Module (allowlist)
```

## Starting Skills

skill-03-defi-operations, skill-08-security-audit, skill-09-compliance-aml

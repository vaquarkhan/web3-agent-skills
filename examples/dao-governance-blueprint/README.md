# DAO Governance — Architecture Blueprint

**Type:** Blueprint  
**Skills:** skill-05-dao-governance

## Overview

Deploy OpenZeppelin Governor + TimelockController for a token-governed DAO with 2-day timelock and 4% quorum.

## Components

- ERC20Votes governance token
- Governor Bravo compatible contract
- TimelockController (48h delay)
- Gnosis Safe treasury (3-of-5)

See `spec.md`, `plan.md`, `tasks.md`.

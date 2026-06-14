# Web3 Agent Entry Point

Generic entry point for agents that support `AGENTS.md`-style repository instructions.

## Start Here

1. Load `skills/skill-01-wallet-management/SKILL.md` for wallet context, or the skill matching your task (see `skills-index.md`)
2. Load the chain preset from `presets/` that matches the target network
3. Load only the workflow skills needed for the current task
4. Pull in `knowledge-base/`, `references/`, and `examples/` only when they improve decisions or proof

## Lifecycle Commands

- `/simulate` → simulate transaction before execution (required)
- `/audit` → security audit and rug-pull checks on contracts
- `/screen` → sanctions screening and Travel Rule checks
- `/swap` → DeFi swap with MEV protection and slippage guards
- `/bridge` → cross-chain transfer with security review
- `/review` → review gas, compliance, security, and operability

## Default Routing

- wallet or signing → `skill-01-wallet-management`
- contract read/write/deploy → `skill-02-smart-contract-interaction`
- swap, lend, stake, LP → `skill-03-defi-operations`
- NFT mint/trade → `skill-04-nft-management`
- DAO proposal/vote → `skill-05-dao-governance`
- bridge or cross-chain message → `skill-06-cross-chain-bridge`
- whale tracking, PnL, analytics → `skill-07-token-analytics`
- unknown contract or audit → `skill-08-security-audit`
- sanctions, MiCA, Howey, tax → `skill-09-compliance-aml`
- ENS, DID, attestations → `skill-10-identity-did`
- Chainlink/Pyth/VRF → `skill-11-oracle-data-feeds`
- gas, nonce, private tx → `skill-12-gas-optimization`
- RWA, ERC-3643 → `skill-13-rwa-tokenization`
- Lens, Farcaster, reputation → `skill-14-social-reputation`
- Flashbots, TWAP, sandwich protection → `skill-15-mev-protection`

## Guardrails

- **Never** expose private keys or seed phrases
- **Always** simulate before state-changing transactions
- **Always** screen addresses via compliance MCP before outbound transfers
- Block unverified contracts unless user explicitly overrides
- Warn on unlimited token approvals
- Require confirmation for transactions > **$10,000 USD**
- Run hooks from `hooks/` before risky operations when possible

## High-Value References

- `skills-index.md`
- `registry/assets.json`
- `guardrails/web3-guardrails.yaml`
- `knowledge-base/README.md`
- `templates/transaction-plan.yaml`
- `templates/compliance-checklist.yaml`
- `templates/security-audit-report.yaml`
- `examples/README.md`
- `references/web3-security-checklist.md`
- `references/mev-protection-patterns.md`
- `mcp/README.md`

# Web3 Agent Skills — Copilot Instructions

Load `AGENTS.md` and `skills-index.md` for routing.

## Rules

- Never expose private keys or seed phrases
- Always simulate transactions before execution
- Screen addresses against sanctions lists before transfers
- Use chain presets from `presets/` for RPC and contract addresses
- Prefer exact token approvals over unlimited
- Use MEV protection (private mempool) for swaps > $1,000

## Lifecycle

`/simulate` → `/audit` → `/screen` → execute → `/review`

## MCP

Build MCP servers: `npm install && npm run build`. Configure from `mcp/`.

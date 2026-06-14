# Kiro Setup — Web3 Agent Skills

## Install

```bash
scripts/install.sh --tool kiro --target /path/to/project
```

Or via VS Code extension → **Install Agent Adapters** → Kiro.

## Steering Files

Installed to `.kiro/steering/`:

| File | Purpose |
|------|---------|
| `product.md` | Mission, users, core flows |
| `tech.md` | Stack, build commands, MCP env |
| `structure.md` | Repository layout |

## Usage

Kiro loads steering files automatically. Combine with:

- `AGENTS.md` for skill routing
- `guardrails/web3-guardrails.yaml` for safety policy
- Chain preset from `presets/`

## Start Skill

`skills/skill-01-wallet-management/SKILL.md` or route via intent in `AGENTS.md`.

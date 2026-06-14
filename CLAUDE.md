# Claude Entry Point — Web3 Agent Skills

Use `AGENTS.md` as the canonical routing guide. This file adds Claude-specific notes.

## Claude Plugin / Commands

Slash commands in `.claude/commands/` map to lifecycle workflows:

| Command | Skill(s) |
|---------|----------|
| `/simulate` | skill-02, skill-12 |
| `/audit` | skill-08 |
| `/screen` | skill-09 |
| `/swap` | skill-03, skill-15, skill-12 |
| `/bridge` | skill-06, skill-09, skill-08 |
| `/review` | skill-08, skill-09, skill-12 |

## MCP Servers

Configure the 6 MCP servers from `mcp/` or root `mcp-config.json`. Build servers first:

```bash
npm install && npm run build
```

## Start Skill

Load `skills/skill-01-wallet-management/SKILL.md` for general Web3 context, then route via `AGENTS.md`.

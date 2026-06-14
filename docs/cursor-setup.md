# Cursor Setup — Web3 Agent Skills

## Option 1: VS Code Extension (Recommended)

Works in Cursor since it shares the VS Code extension host.

1. Install **Web3 Agent Skills** extension (Marketplace or `.vsix` from Releases)
2. Open your project workspace
3. Command Palette → **Web3 Agent Skills: Install Full Toolkit**
4. Reload Cursor

## Option 2: Script Install

```bash
git clone https://github.com/vaquarkhan/web3-agent-skills.git
scripts/install.sh --tool cursor --target /path/to/your/project
```

Windows:

```powershell
pwsh scripts/install.ps1 --tool cursor --target C:\path\to\your\project
```

## Option 3: Manual

Copy into your project:

- `.cursor/rules/` — guardrail and routing rules
- `skills/` or symlink via `npm run link-skills`
- `AGENTS.md`, `skills-index.md`, `guardrails/`
- `mcp/` MCP config templates

## Cursor Rules

Installed rules in `.cursor/rules/`:

| Rule | Purpose |
|------|---------|
| `00-web3-agent-core.mdc` | Core Web3 agent behavior |
| `10-guardrails-first.mdc` | Enforce guardrails on all txs |
| `20-chain-preset-selector.mdc` | Route to correct chain preset |
| `30-simulate-before-send.mdc` | Require simulation before writes |

## MCP Configuration

Add servers from `mcp/*.mcp.json` to **Cursor Settings → MCP**.

Build servers first:

```bash
npm install && npm run build
```

## Using Skills

Skills auto-discover from `.agents/skills/` when linked:

```bash
node scripts/link-skills.js
```

Or invoke explicitly: `/skill-03-defi-operations`

## Start Skill

Load `skills/skill-01-wallet-management/SKILL.md`, then route via `AGENTS.md`.

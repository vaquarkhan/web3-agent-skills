# Web3 Agent Skills — VS Code Extension

Install Web3 agent skills, chain presets, MCP server configs, guardrails, and runnable examples into your workspace.

Works in **VS Code**, **Cursor**, **Windsurf**, and **VSCodium**.

## Commands

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for **Web3 Agent Skills**:

| Command | Description |
|---------|-------------|
| Install Full Toolkit | Skills, adapters, starter packs, MCP templates |
| Install Core Pack | AGENTS.md, guardrails, templates, docs, hooks |
| Install Agent Adapters | Cursor, Claude, Copilot, Gemini, Kiro, Codex, OpenCode, Windsurf |
| Install Starter Pack | DeFi Trader, Compliance Officer, NFT Curator, etc. |
| Install MCP Templates | blockchain-rpc, defi-protocol, compliance-screening, etc. |
| Scaffold Runnable Example | Uniswap swap, compliance transfer, NFT mint workflows |

## Development

```bash
cd vscode-extension
# Open folder in VS Code, press F5 to launch Extension Development Host
npx @vscode/vsce package   # produces web3-agent-skills-1.0.0.vsix
```

## Manual Install (.vsix)

1. Download `.vsix` from [GitHub Releases](https://github.com/vaquarkhan/web3-agent-skills/releases)
2. Command Palette → **Extensions: Install from VSIX...**
3. Reload when prompted

See [tutorials/installing-vscode-and-jetbrains-plugins.md](../tutorials/installing-vscode-and-jetbrains-plugins.md).

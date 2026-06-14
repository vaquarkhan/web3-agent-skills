# JetBrains Setup — Web3 Agent Skills

## Install Plugin

### From Marketplace

1. Open IntelliJ / PyCharm / WebStorm / GoLand
2. **Settings → Plugins → Marketplace**
3. Search **Web3 Agent Skills**
4. Install and restart

### From GitHub Release (.zip)

1. Download `.zip` from [Releases](https://github.com/vaquarkhan/web3-agent-skills/releases)
2. **Settings → Plugins → ⚙️ → Install Plugin from Disk...**
3. Select the `.zip` file
4. Restart IDE

## Using the Plugin

After install, open a project and use **Tools → Web3 Agent Skills**:

| Action | Description |
|--------|-------------|
| Install Full Toolkit | Skills, adapters, starter packs, MCP |
| Install Core Pack | AGENTS.md, guardrails, templates, hooks |
| Install Agent Adapters | Cursor, Claude, Copilot, etc. |
| Install Starter Pack | DeFi, Compliance, NFT, Bridge, MEV, RWA |
| Install MCP Templates | 6 Web3 MCP server configs |
| Scaffold Runnable Example | Swap, compliance, NFT mint examples |

Files install into the **current project root**, not IDE-global.

## Script Alternative

```bash
scripts/install.sh --tool all --target /path/to/project
```

## Development

```bash
cd jetbrains-plugin
./gradlew runIde      # launch sandbox IDE
./gradlew buildPlugin # produce .zip distribution
```

See [plugin-publishing.md](plugin-publishing.md) for marketplace workflow.

## Supported IDEs

IntelliJ IDEA, PyCharm, WebStorm, GoLand, DataGrip, PhpStorm (IntelliJ platform 2024.1+)

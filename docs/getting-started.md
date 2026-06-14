# Getting Started — Web3 Agent Skills

Production-grade Agent Skills for Web3 AI agents: wallets, DeFi, NFTs, compliance, MEV protection, and MCP tool servers.

## 5-Minute Quick Start

1. Clone the repository or install via VS Code / JetBrains plugin
2. Load `skills/skill-01-wallet-management/SKILL.md` (or route via `AGENTS.md`)
3. Pick a chain preset from `presets/`
4. Configure MCP servers from `mcp/` (build with `npm install && npm run build`)
5. Run an example: `cd examples/uniswap-swap-guardrails && make smoke-test`

## Install Options

### Script install

```bash
git clone https://github.com/vaquarkhan/web3-agent-skills.git
scripts/install.sh --tool all --target /path/to/project
```

Windows:

```powershell
pwsh scripts/install.ps1 --tool all --target C:\path\to\project
```

Bootstrap shortcut:

```bash
./bootstrap.sh /path/to/project
pwsh .\bootstrap.ps1 C:\path\to\project
```

### VS Code / Cursor / Windsurf

- Install extension from Marketplace or `.vsix` from Releases
- Command Palette → **Web3 Agent Skills: Install Full Toolkit**
- See [cursor-setup.md](cursor-setup.md) and [jetbrains-setup.md](jetbrains-setup.md)

## Lifecycle Commands

| Command | Purpose |
|---------|---------|
| `/simulate` | Simulate transaction before send (required) |
| `/audit` | Security audit and rug-pull checks |
| `/screen` | Sanctions screening and Travel Rule |
| `/swap` | DeFi swap with MEV + slippage guards |
| `/bridge` | Cross-chain transfer with security review |
| `/review` | Gas, compliance, security review |

## Scenario Routing

| Goal | Start here |
|------|------------|
| Swap on Uniswap | `skill-03-defi-operations` + `starter-packs/defi-trader-starter.yaml` |
| Screen wallet | `skill-09-compliance-aml` + compliance MCP |
| Bridge to L2 | `skill-06-cross-chain-bridge` + `examples/cross-chain-bridge-blueprint/` |
| Mint NFT | `skill-04-nft-management` + `examples/nft-mint-ipfs/` |
| Audit contract | `skill-08-security-audit` |
| Optimize gas | `skill-12-gas-optimization` |

## Setup Guides

- [cursor-setup.md](cursor-setup.md)
- [jetbrains-setup.md](jetbrains-setup.md)
- [claude-setup.md](claude-setup.md)
- [copilot-setup.md](copilot-setup.md)
- [codex-setup.md](codex-setup.md)
- [windsurf-setup.md](windsurf-setup.md)
- [plugin-publishing.md](plugin-publishing.md)

## MCP Servers

Build and configure 6 MCP servers:

```bash
npm install && npm run build
```

Copy templates from `mcp/` into your Cursor MCP settings. See [mcp/README.md](../mcp/README.md).

## Guardrails

All skills enforce [guardrails/web3-guardrails.yaml](../guardrails/web3-guardrails.yaml):

- Never expose private keys
- Simulate before execute
- Screen all outbound addresses
- $10,000 confirmation threshold

# Web3 Agent Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-15-1a1a2e)](skills-index.md)
[![MCP Servers](https://img.shields.io/badge/MCP%20Servers-6-1a1a2e)](mcp/README.md)
[![Examples](https://img.shields.io/badge/Examples-3%20runnable%20%2B%203%20blueprint-1a1a2e)](examples/README.md)
[![Validate](https://img.shields.io/badge/CI-validate%20%26%20package-1a1a2e)](.github/workflows/validate-and-package.yml)

> **GitHub Releases** · **VS Code Extension** · **JetBrains Plugin**

Production-grade Agent Skills for Web3 AI agents: 15 domain workflows, 6 MCP servers, chain presets, compliance guardrails, MEV protection, and **VS Code / JetBrains installers**.

The open skill registry and execution toolkit for Web3 agents — wallets, DeFi, NFTs, DAOs, cross-chain, compliance, and institutional RWA workflows with the same discipline used by production Web3 teams.

## Agent Skills Registry Compatibility

- Every capability lives in a directory containing a `SKILL.md`
- Every `SKILL.md` starts with YAML frontmatter: `name` and `description`
- Supporting materials in `references/`, `knowledge-base/`, `examples/`, `hooks/`, and `scripts/`
- Progressive disclosure: agents load skills on demand

## Quick Start

```bash
git clone https://github.com/vaquarkhan/web3-agent-skills.git
cd web3-agent-skills
npm install && npm run build
node scripts/link-skills.js
npm test
```

Install into your project:

```bash
scripts/install.sh --tool all --target /path/to/project
# Windows:
pwsh scripts/install.ps1 --tool all --target C:\path\to\project
```

Bootstrap shortcut:

```bash
./bootstrap.sh /path/to/project
pwsh .\bootstrap.ps1 C:\path\to\project
```

## Install Surfaces

### VS Code / Cursor / Windsurf / VSCodium

1. Download `.vsix` from [GitHub Releases](https://github.com/vaquarkhan/web3-agent-skills/releases)
2. Command Palette → **Extensions: Install from VSIX...**
3. Command Palette → **Web3 Agent Skills: Install Full Toolkit**

See [vscode-extension/README.md](vscode-extension/README.md) and [tutorials/installing-vscode-and-jetbrains-plugins.md](tutorials/installing-vscode-and-jetbrains-plugins.md).

### JetBrains (IntelliJ, PyCharm, WebStorm, GoLand)

1. Download `.zip` from Releases or install from JetBrains Marketplace
2. **Settings → Plugins → Install from Disk...**
3. **Tools → Web3 Agent Skills → Install Full Toolkit**

See [jetbrains-plugin/README.md](jetbrains-plugin/README.md) and [docs/jetbrains-setup.md](docs/jetbrains-setup.md).

### Install By Tool

| Tool | Setup guide | Install path |
|------|---------------|--------------|
| VS Code / Cursor | [docs/cursor-setup.md](docs/cursor-setup.md) | Extension or `scripts/install.sh --tool cursor` |
| JetBrains | [docs/jetbrains-setup.md](docs/jetbrains-setup.md) | Plugin or `scripts/install.sh --tool all` |
| Claude | [docs/claude-setup.md](docs/claude-setup.md) | `.claude/commands/` or install script |
| Copilot | [docs/copilot-setup.md](docs/copilot-setup.md) | `.github/copilot-instructions.md` |
| Codex / AGENTS.md | [docs/getting-started.md](docs/getting-started.md) | `AGENTS.md` + `skills-index.md` |

## Core Principles

- Simulate before every state-changing transaction
- Screen all addresses against sanctions lists
- Never expose private keys or seed phrases
- Contract verification before interaction
- Exact token approvals over unlimited
- MEV protection for high-value swaps
- $10,000 confirmation threshold

## Lifecycle Commands

| Command | Purpose |
|---------|---------|
| `/simulate` | Simulate transaction (required before send) |
| `/audit` | Security audit and rug-pull checks |
| `/screen` | Sanctions screening and Travel Rule |
| `/swap` | DeFi swap with MEV + slippage guards |
| `/bridge` | Cross-chain transfer with security review |
| `/review` | Gas, compliance, and security review |

## 15 Skills

| # | Skill | Phase | Capabilities |
|---|-------|-------|--------------|
| 1 | [Wallet Management](skills/skill-01-wallet-management/) | 1 | HD wallets, ERC-4337, multi-sig, social recovery |
| 2 | [Smart Contract Interaction](skills/skill-02-smart-contract-interaction/) | 1 | ABI, deploy, proxies, multicall |
| 3 | [DeFi Operations](skills/skill-03-defi-operations/) | 1 | Swap, lend/borrow, stake, LP, flash loans |
| 4 | [NFT Management](skills/skill-04-nft-management/) | 2 | Mint/trade, ERC-721/1155, TBA |
| 5 | [DAO Governance](skills/skill-05-dao-governance/) | 4 | Proposals, voting, treasury, timelocks |
| 6 | [Cross-Chain Bridge](skills/skill-06-cross-chain-bridge/) | 3 | Bridging, messaging, intent routing |
| 7 | [Token Analytics](skills/skill-07-token-analytics/) | 2 | Whale tracking, DEX volume, PnL |
| 8 | [Security Audit](skills/skill-08-security-audit/) | 2 | Vulnerability detection, rug pulls |
| 9 | [Compliance & AML](skills/skill-09-compliance-aml/) | 3 | Sanctions, Travel Rule, MiCA, Howey |
| 10 | [Identity (DID)](skills/skill-10-identity-did/) | 3 | DIDs, ENS, ZK-KYC, attestations |
| 11 | [Oracle & Data Feeds](skills/skill-11-oracle-data-feeds/) | 4 | Chainlink, Pyth, VRF, keepers |
| 12 | [Gas Optimization](skills/skill-12-gas-optimization/) | 1 | EIP-1559, nonce, private txs, blobs |
| 13 | [RWA Tokenization](skills/skill-13-rwa-tokenization/) | 4 | Treasuries, ERC-3643, yield |
| 14 | [Social & Reputation](skills/skill-14-social-reputation/) | 5 | Lens, Farcaster, reputation |
| 15 | [MEV Protection](skills/skill-15-mev-protection/) | 2 | Flashbots, TWAP, sandwich protection |

Full catalog: [skills-index.md](skills-index.md)

## 6 MCP Servers

| Server | Purpose |
|--------|---------|
| [blockchain-rpc-server](tools/mcp-servers/blockchain-rpc-server/) | Chain RPC (Alchemy, Infura, QuickNode) |
| [defi-protocol-server](tools/mcp-servers/defi-protocol-server/) | Protocol ABIs, subgraphs, pools |
| [nft-metadata-server](tools/mcp-servers/nft-metadata-server/) | IPFS, Arweave, NFT APIs |
| [price-feed-server](tools/mcp-servers/price-feed-server/) | Chainlink, Pyth, CoinGecko |
| [compliance-screening-server](tools/mcp-servers/compliance-screening-server/) | Chainalysis, sanctions, Travel Rule |
| [ipfs-storage-server](tools/mcp-servers/ipfs-storage-server/) | Pinata, web3.storage |

Templates: [mcp/](mcp/README.md) · Build: `npm run build`

## Examples

| Example | Type | Best for |
|---------|------|----------|
| [uniswap-swap-guardrails](examples/uniswap-swap-guardrails/) | Runnable | Safe DEX swap with simulation |
| [compliance-screening-transfer](examples/compliance-screening-transfer/) | Runnable | Sanctions + Travel Rule |
| [nft-mint-ipfs](examples/nft-mint-ipfs/) | Runnable | IPFS metadata + CID validation |
| [defi-yield-vault-blueprint](examples/defi-yield-vault-blueprint/) | Blueprint | ERC-4626 vault architecture |
| [cross-chain-bridge-blueprint](examples/cross-chain-bridge-blueprint/) | Blueprint | L1→L2 bridge plan |
| [dao-governance-blueprint](examples/dao-governance-blueprint/) | Blueprint | Governor + timelock |

See [examples/README.md](examples/README.md).

## Project Structure

```
web3-agent-skills/
├── skills/                 # 15 Agent Skills (SKILL.md per domain)
├── tools/mcp-servers/      # 6 MCP tool servers
├── knowledge-base/         # Chains, protocols, standards, regulations
├── guardrails/             # Web3 safety rules
├── agents/                 # Multi-skill orchestration
├── presets/                # Chain-specific operating profiles
├── starter-packs/          # Problem-area bundles
├── examples/               # Runnable scaffolds + blueprints
├── mcp/                    # MCP config templates
├── vscode-extension/       # VS Code / Cursor installer
├── jetbrains-plugin/       # JetBrains IDE installer
├── registry/               # Machine-readable asset index
├── docs/                   # Setup and onboarding guides
├── scripts/                # Install and validation scripts
└── tests/                  # Coverage tests
```

## Supported Chains

Ethereum, Solana, Polygon, Arbitrum, Base, Optimism, Avalanche, BNB, Cosmos, Bitcoin L2s, TON, Sui/Aptos

Per-chain details: [knowledge-base/chains/](knowledge-base/chains/)

## Guardrails

[guardrails/web3-guardrails.yaml](guardrails/web3-guardrails.yaml):

- Never expose private keys or seed phrases
- Block unverified/scam contracts
- Warn on unlimited token approvals
- Screen addresses against sanctions lists
- Require simulation before execution
- Max value without confirmation: **$10,000 USD**

## Multi-Agent Packaging

- `.cursor/rules/` — Cursor rules
- `.claude/commands/` — Claude slash commands
- `.github/copilot-instructions.md` — GitHub Copilot
- `AGENTS.md` — Generic agent entry point
- `CLAUDE.md` — Claude-specific notes

## Related Projects

- [data-engineering-agent-skills](https://github.com/vaquarkhan/data-engineering-agent-skills) — same installer pattern for data engineering
- [Agent Skills standard](https://agentskills.io)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) · [CHANGELOG.md](CHANGELOG.md) · [SECURITY.md](SECURITY.md)

## License

MIT — see [LICENSE](LICENSE)

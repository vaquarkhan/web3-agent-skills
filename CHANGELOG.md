# Changelog

## [1.1.0] - 2026-06-13

### Fixed

- Added 4 missing starter-packs referenced in registry (nft-curator, cross-chain, mev-protection, rwa-institutional)
- Added 4 missing presets (polygon-pos, base-mainnet, optimism-mainnet, solana-mainnet)
- Added missing templates referenced in assets.json

### Added

- `scripts/validate-assets.mjs` — registry path validation + version sync (wired into CI)
- Knowledge base seed data: chain.yaml, protocol contracts, MiCA overview, ERC-20 ABI
- Expanded test suite (assets, guardrails, MCP logic, knowledge-base seed data)
- `evals/run.mjs` — skill routing benchmark (10 cases)
- `.github/dependabot.yml`, `.pre-commit-config.yaml`
- Kiro steering adapter (`.kiro/steering/`, `docs/kiro-setup.md`)
- Provenance blocks on references and knowledge-base seed files

## [1.0.0] - 2026-06-13

### Added

- 15 Web3 agent skills (wallet, DeFi, NFT, compliance, MEV, etc.)
- 6 MCP servers (blockchain-rpc, defi-protocol, nft-metadata, price-feed, compliance-screening, ipfs-storage)
- VS Code extension with install commands
- JetBrains plugin scaffold
- 3 runnable examples + 3 architecture blueprints
- 6 starter packs and chain presets
- Guardrails, knowledge base, agent orchestrator
- Install scripts (`install.sh`, `install.ps1`, `bootstrap.sh`)
- CI workflow for validate, build, and VSIX packaging

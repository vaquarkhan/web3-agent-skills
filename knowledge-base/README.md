# Knowledge Base

Structured reference data for Web3 Agent Skills. Agents load these files on demand.

## Seed Data (verified)

Each major chain/protocol includes machine-readable seed files with `provenance` blocks (source URL, last verified date):

| Path | Contents |
|------|----------|
| [chains/ethereum/chain.yaml](chains/ethereum/chain.yaml) | Chain ID, RPC env vars, key contracts |
| [chains/polygon/chain.yaml](chains/polygon/chain.yaml) | Polygon PoS addresses |
| [chains/base/chain.yaml](chains/base/chain.yaml) | Base L2 contracts + bridge portal |
| [chains/solana/chain.yaml](chains/solana/chain.yaml) | Solana program IDs, derivation path |
| [protocols/uniswap/contracts.yaml](protocols/uniswap/contracts.yaml) | Router/factory per chain |
| [protocols/aave/contracts.yaml](protocols/aave/contracts.yaml) | Pool addresses, health factor defaults |
| [regulations/mica/overview.yaml](regulations/mica/overview.yaml) | EU 2023/1114 categories + effective dates |
| [standards/erc20/abi.json](standards/erc20/abi.json) | Minimal ERC-20 ABI |

README files in each directory provide human-readable summaries. Extend with your own org-specific addresses — keep `provenance` when adding entries.

## Directory Index

- **chains/** — per-chain RPC, explorers, native tokens, key contracts
- **protocols/** — DeFi protocol addresses and subgraphs
- **standards/** — ERC ABIs and interface notes
- **regulations/** — MiCA, Travel Rule, FATF, SEC Howey
- **security/** — vulnerability patterns, audit checklists, exploit references

## Validation

Run `npm run validate:assets` to confirm preset → knowledge_base paths resolve.

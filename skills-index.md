# Web3 Agent Skills Index

## Start Here

| Skill | When to use |
|-------|-------------|
| `skill-01-wallet-management` | Wallets, HD derivation, ERC-4337, multi-sig |
| `skill-08-security-audit` | Unknown contracts, rug pulls, pre-interaction audit |
| `skill-09-compliance-aml` | Sanctions, Travel Rule, MiCA, Howey |

## Command-First Lifecycle

| Command | Primary skill |
|---------|---------------|
| `/simulate` | skill-02, skill-12 |
| `/audit` | skill-08 |
| `/screen` | skill-09 |
| `/swap` | skill-03, skill-15 |
| `/bridge` | skill-06 |
| `/review` | skill-08, skill-09 |

## Phase 1 — Foundations

| Skill | Capabilities |
|-------|--------------|
| skill-01-wallet-management | HD wallets, ERC-4337, Safe multi-sig, social recovery |
| skill-02-smart-contract-interaction | ABI, deploy, proxies, multicall |
| skill-03-defi-operations | Swap, lend/borrow, stake, LP, flash loans |
| skill-12-gas-optimization | EIP-1559, nonce, private txs, blob fees |

## Phase 2 — Value-add

| Skill | Capabilities |
|-------|--------------|
| skill-04-nft-management | Mint/trade, ERC-721/1155, TBA |
| skill-07-token-analytics | Whale tracking, DEX volume, PnL |
| skill-08-security-audit | Vulnerability detection, rug pulls |
| skill-15-mev-protection | Flashbots, TWAP, sandwich protection |

## Phase 3 — Enterprise

| Skill | Capabilities |
|-------|--------------|
| skill-06-cross-chain-bridge | Bridging, messaging, intent routing |
| skill-09-compliance-aml | Sanctions, Travel Rule, MiCA, Howey |
| skill-10-identity-did | DIDs, ENS, ZK-KYC, attestations |

## Phase 4 — Institutional

| Skill | Capabilities |
|-------|--------------|
| skill-05-dao-governance | Proposals, voting, treasury, timelocks |
| skill-11-oracle-data-feeds | Chainlink, Pyth, VRF, keepers |
| skill-13-rwa-tokenization | Treasuries, ERC-3643, yield distribution |

## Phase 5 — Emerging

| Skill | Capabilities |
|-------|--------------|
| skill-14-social-reputation | Lens, Farcaster, Frames, prediction markets |

## Chain Presets

- `presets/ethereum-mainnet.yaml`
- `presets/polygon-pos.yaml`
- `presets/arbitrum-one.yaml`
- `presets/base-mainnet.yaml`
- `presets/optimism-mainnet.yaml`
- `presets/solana-mainnet.yaml`

## Starter Packs

| Pack | Skills | MCP |
|------|--------|-----|
| defi-trader | 01, 02, 03, 08, 12, 15 | rpc, defi, price-feed |
| compliance-officer | 08, 09, 13 | compliance-screening |
| nft-curator | 04, 02, 08, 10 | nft-metadata, ipfs |
| cross-chain | 06, 08, 09 | rpc, compliance |
| mev-protection | 03, 12, 15 | rpc, price-feed |
| rwa-institutional | 09, 13 | compliance-screening |

## Examples

| Example | Type |
|---------|------|
| uniswap-swap-guardrails | Runnable |
| compliance-screening-transfer | Runnable |
| nft-mint-ipfs | Runnable |
| defi-yield-vault-blueprint | Blueprint |
| cross-chain-bridge-blueprint | Blueprint |
| dao-governance-blueprint | Blueprint |

See `examples/README.md` for the full selector table.

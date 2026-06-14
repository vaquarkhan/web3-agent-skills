# Ethereum

| Property | Value |
|----------|-------|
| Chain ID | 1 |
| Native Token | ETH |
| Block Time | ~12s |
| Finality | ~15 min (safe), ~13 min (finalized) |
| Type | EVM L1 |

## RPC Endpoints

Set via environment variables:
- `ALCHEMY_ETH_URL` — Alchemy (recommended)
- `INFURA_ETH_URL` — Infura
- `ETHEREUM_RPC_URL` — Generic fallback

## Block Explorers

- Etherscan: https://etherscan.io
- Blockscout: https://eth.blockscout.com

## Key Contracts

| Contract | Address |
|----------|---------|
| Multicall3 | `0xcA11bde05977b3631167028862bE2a173976CA11` |
| WETH | `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` |
| EntryPoint v0.6 | `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789` |
| Safe Singleton | `0x41675C099F32341bf84BFc5380af534dD5e2863A` |

## Gas

EIP-1559 enabled. Typical base fee: 5–50 gwei. Use skill-12 for fee estimation.

## Bridges

- Native L2 bridges to Arbitrum, Optimism, Base
- Stargate, Across, Wormhole, CCIP for cross-chain

# HD Wallet Derivation Paths

| Chain | Coin Type | Path | Notes |
|-------|-----------|------|-------|
| Ethereum | 60 | `m/44'/60'/0'/0/n` | EVM default |
| Polygon | 60 | `m/44'/60'/0'/0/n` | Same as Ethereum |
| Arbitrum | 60 | `m/44'/60'/0'/0/n` | Same as Ethereum |
| Base | 60 | `m/44'/60'/0'/0/n` | Same as Ethereum |
| Optimism | 60 | `m/44'/60'/0'/0/n` | Same as Ethereum |
| Avalanche C-Chain | 60 | `m/44'/60'/0'/0/n` | EVM compatible |
| BNB Chain | 60 | `m/44'/60'/0'/0/n` | EVM compatible |
| Solana | 501 | `m/44'/501'/n'/0'` | Ed25519 |
| Cosmos | 118 | `m/44'/118'/0'/0/n` | Bech32 addresses |
| Bitcoin | 0 | `m/84'/0'/0'/0/n` | Native SegWit (BIP-84) |

Always derive addresses client-side. Never send mnemonics to RPC providers.

# Solana

| Property | Value |
|----------|-------|
| Chain ID | N/A (genesis hash) |
| Native Token | SOL |
| Block Time | ~400ms |
| Finality | ~13s (confirmed), ~32 slots (finalized) |
| Type | Non-EVM (SVM) |

## RPC Endpoints

- `SOLANA_RPC_URL` — QuickNode, Helius, or public mainnet-beta

## Block Explorers

- Solscan: https://solscan.io
- Solana FM: https://solana.fm

## Key Programs

| Program | Address |
|---------|---------|
| System Program | `11111111111111111111111111111111` |
| Token Program | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` |
| Associated Token | `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL` |

## Notes

- Uses ed25519 keys, not secp256k1
- BIP-44 path: `m/44'/501'/n'/0'`
- Priority fees via compute unit price

# MEV Protection Patterns

| Trade size | Method | Slippage |
|------------|--------|----------|
| < $1K | Public or private RPC | 0.5% |
| $1K–$10K | Flashbots Protect / private mempool | 0.5–1% |
| $10K–$100K | TWAP 5–10 chunks | per-chunk 0.5% |
| > $100K | Intent protocol (CoW Swap, UniswapX) | auction-based |

## Private RPC Endpoints

- Ethereum: `https://rpc.flashbots.net`
- Use skill-15-mev-protection for full workflow

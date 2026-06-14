# MEV Protection Patterns

> **Provenance:** Flashbots docs (protect RPC, bundle API), Ethereum.org MEV overview, Uniswap best practices for slippage. Last reviewed 2026-06-01.

| Trade size | Method | Slippage |
|------------|--------|----------|
| < $1K | Public or private RPC | 0.5% |
| $1K–$10K | Flashbots Protect / private mempool | 0.5–1% |
| $10K–$100K | TWAP 5–10 chunks | per-chunk 0.5% |
| > $100K | Intent protocol (CoW Swap, UniswapX) | auction-based |

## Private RPC Endpoints

- Ethereum: `https://rpc.flashbots.net` ([Flashbots Protect docs](https://docs.flashbots.net/flashbots-protect/overview))
- Use skill-15-mev-protection for full workflow

## References

- [Flashbots Docs](https://docs.flashbots.net/)
- [CoW Swap](https://docs.cow.fi/)
- skill-15-mev-protection

# Web3 Security Checklist

> **Provenance:** OWASP Smart Contract Top 10 (2025), Consensys smart contract best practices, Trail of Bits building secure contracts. Last reviewed 2026-06-01.

Pre-interaction checklist for agents:

- [ ] Contract verified on block explorer
- [ ] No honeypot (sell simulation succeeds)
- [ ] No unlimited mint by owner
- [ ] LP locked or canonical protocol
- [ ] No hidden transfer tax > 5%
- [ ] Proxy has timelock on upgrades
- [ ] Recipient screened against sanctions
- [ ] Transaction simulated via eth_call
- [ ] Slippage and deadline set on swaps
- [ ] Value ≤ $10,000 or user confirmed

See `knowledge-base/security/common-vulnerabilities/` for patterns.

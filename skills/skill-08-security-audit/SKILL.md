---
name: skill-08-security-audit
description: Performs Web3 security analysis including vulnerability detection, rug pull checks, and exploit monitoring. Use before interacting with unknown contracts or when auditing smart contract code.
metadata:
  phase: 2
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb,solana
---

# Security Audit

## When to Use

- Evaluating unknown smart contracts before interaction
- Detecting rug pull and honeypot patterns
- Monitoring for active exploits and protocol incidents
- Reviewing contract code for common vulnerabilities
- Pre-deployment security checklist

## Prerequisites

- MCP: `blockchain-rpc-server`, `defi-protocol-server`
- Knowledge base: `knowledge-base/security/`

## Workflow

### 1. Automated Rug Pull Checks

Run before any token swap or liquidity add:

| Check | Red Flag |
|-------|----------|
| Ownership | `owner()` can mint unlimited tokens |
| Liquidity | LP not locked or unlock imminent |
| Honeypot | Sell simulation reverts |
| Hidden fees | Transfer tax > 10% or modifiable |
| Proxy | Unverified implementation, no timelock |
| Blacklist | `isBlacklisted` or pause on transfers |

Use `eth_call` simulation: attempt buy → approve → sell in single trace.

### 2. Vulnerability Patterns

Scan for OWASP Smart Contract Top 10:

1. **Reentrancy** — external calls before state updates
2. **Access control** — missing `onlyOwner` on critical functions
3. **Oracle manipulation** — spot price without TWAP
4. **Flash loan attacks** — single-block price dependency
5. **Integer issues** — unchecked math (pre-0.8.0)
6. **Delegatecall** — untrusted implementation in proxy
7. **Front-running** — no slippage/deadline protection

See `knowledge-base/security/common-vulnerabilities/` for patterns.

### 3. Exploit Monitoring

- Monitor Rekt News, DeFiLlama hacks dashboard
- Check contract against known exploit DB
- Verify protocol TVL hasn't dropped > 20% in 24h

### 4. Code Review Checklist

- [ ] Uses Solidity ≥ 0.8.0 with overflow checks
- [ ] External calls use checks-effects-interactions
- [ ] No `selfdestruct` or `delegatecall` to user input
- [ ] Timelock on admin functions (> 24h for DeFi)
- [ ] Events emitted for state changes
- [ ] Formal verification or audit report available

## Verdict Format

```
RISK: LOW | MEDIUM | HIGH | CRITICAL
FINDINGS: [list with severity]
RECOMMENDATION: PROCEED | CAUTION | BLOCK
```

Block interaction when RISK = CRITICAL or honeypot detected.

## References

- `knowledge-base/security/audit-patterns/`
- `knowledge-base/security/exploit-db/`

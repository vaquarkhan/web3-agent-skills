# Common Smart Contract Vulnerabilities

## OWASP Smart Contract Top 10 (2025)

| # | Vulnerability | Detection |
|---|---------------|-----------|
| 1 | Access control failures | Missing modifiers on admin functions |
| 2 | Oracle manipulation | Spot price without TWAP |
| 3 | Reentrancy | External calls before state updates |
| 4 | Flash loan attacks | Single-block price dependency |
| 5 | Integer overflow/underflow | Pre-0.8.0 Solidity, unchecked blocks |
| 6 | Insecure randomness | blockhash, timestamp for randomness |
| 7 | DoS | Unbounded loops, push payment failures |
| 8 | Front-running | No slippage/deadline on swaps |
| 9 | Delegatecall to untrusted | Proxy with mutable implementation |
| 10 | Signature replay | Missing chainId/nonce in EIP-712 |

## Rug Pull Indicators

- Owner can mint unlimited supply
- Hidden transfer tax (> 5%, modifiable)
- Liquidity not locked or unlocks soon
- Honeypot (buy works, sell reverts)
- Unverified proxy with no timelock
- Renounced ownership but backdoor via proxy upgrade

## Tools

- Slither, Mythril, Echidna for static analysis
- Tenderly simulation for runtime checks
- skill-08-security-audit for agent workflow

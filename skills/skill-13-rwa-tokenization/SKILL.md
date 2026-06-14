---
name: skill-13-rwa-tokenization
description: Handles real-world asset tokenization including treasuries, real estate, bonds on-chain, ERC-3643 compliance tokens, and yield distribution. Use for institutional RWA workflows.
metadata:
  phase: 4
  chains: ethereum,polygon,base
---

# RWA Tokenization

## When to Use

- Tokenizing treasuries (T-bills, government bonds)
- Real estate fractional ownership
- Corporate bond issuance on-chain
- ERC-3643 (T-REX) compliant security tokens
- Yield distribution to token holders

## Prerequisites

- MCP: `compliance-screening-server`, `blockchain-rpc-server`, `price-feed-server`
- Skills: skill-09 (mandatory for all RWA), skill-08

## Workflow

### 1. Token Standard Selection

| Standard | Use Case | Compliance |
|----------|----------|------------|
| ERC-3643 (T-REX) | Regulated securities | Built-in identity/compliance |
| ERC-1400 | Security tokens (legacy) | Partition-based |
| ERC-4626 | Yield-bearing vaults | DeFi composability |
| ERC-20 + allowlist | Simple restricted tokens | Manual KYC gate |

Prefer ERC-3643 for regulated offerings in EU (MiCA) and US (Reg D/Reg S).

### 2. Issuance Workflow

1. Legal structuring (SPV, fund vehicle)
2. KYC/AML all investors via compliance MCP
3. Deploy identity registry + compliance module
4. Mint tokens to verified investor wallets only
5. Register with applicable regulators (SEC, FCA, etc.)

### 3. Asset Classes

**Tokenized Treasuries (e.g., Ondo OUSG, Franklin FOBXX):**
- 1:1 backing with short-term US Treasuries
- Daily/monthly redemption windows
- Accrued yield reflected in token price or rebasing

**Real Estate:**
- SPV holds property; tokens = beneficial interest
- Distribute rental income via `claim()` or automatic airdrop
- Secondary trading restricted to qualified investors

**Bonds:**
- Coupon payments via scheduled `distributeYield()` calls
- Maturity redemption at par

### 4. Yield Distribution

```solidity
function distributeYield(uint256 amount) external onlyManager {
  uint256 totalSupply = token.totalSupply();
  yieldPerToken += (amount * 1e18) / totalSupply;
}
```

Track tax reporting obligations per jurisdiction (1099-DA, withholding).

### 5. Compliance Controls

- Transfer restrictions: only between whitelisted addresses
- Force transfer for court orders (ERC-3643 agent role)
- Freeze tokens for sanctioned parties
- Cap table reporting and audit trail

## Hard Rules

- All investors must pass KYC/AML before mint
- No public trading without registration exemption
- Screen every transfer via compliance MCP
- Maintain off-chain legal docs linked via hash on-chain

## References

- `references/erc3643-overview.md`
- `knowledge-base/regulations/mica/`

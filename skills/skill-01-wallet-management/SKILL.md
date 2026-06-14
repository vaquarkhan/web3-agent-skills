---
name: skill-01-wallet-management
description: Manages Web3 wallets including HD derivation, ERC-4337 account abstraction, multi-sig (Safe), and social recovery. Use when creating wallets, signing transactions, managing keys, or configuring smart accounts.
metadata:
  phase: 1
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb
---

# Wallet Management

## When to Use

- Creating or importing HD wallets (BIP-39/BIP-44)
- Configuring ERC-4337 smart accounts (bundlers, paymasters)
- Setting up Gnosis Safe or multi-sig workflows
- Implementing social recovery or session keys
- Managing wallet connections (WalletConnect, EIP-6963)

## Prerequisites

- MCP: `blockchain-rpc-server` for chain reads
- MCP: `compliance-screening-server` before sending to external addresses
- Apply all rules in `guardrails/web3-guardrails.yaml`

## Workflow

### 1. Wallet Type Selection

| Use Case | Recommendation |
|----------|----------------|
| Single user EOA | HD wallet (MetaMask-compatible path `m/44'/60'/0'/0/n`) |
| Team treasury | Gnosis Safe multi-sig |
| Gasless UX | ERC-4337 smart account + paymaster |
| High-frequency trading | Session keys with spending limits |

### 2. HD Wallet Derivation

```
Ethereum path: m/44'/60'/0'/0/{index}
Solana path:   m/44'/501'/{index}'/0'
```

Use `references/hd-paths.md` for all supported chains. **Never log or persist mnemonic phrases.**

### 3. ERC-4337 Account Abstraction

1. Deploy or connect to existing smart account (SimpleAccount, Kernel, Safe4337)
2. Configure entry point: `0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789` (v0.6)
3. Select bundler URL (Pimlico, Alchemy, Stackup)
4. Optional: configure paymaster for sponsored gas

### 4. Multi-Sig (Safe)

1. Create Safe with threshold M-of-N
2. Add owners via `createProxyWithNonce`
3. Propose transactions via Safe Transaction Service API
4. Collect signatures off-chain, execute on-chain

### 5. Pre-Execution Checks

- [ ] Simulate transaction via `eth_call` or Tenderly
- [ ] Screen recipient via compliance MCP
- [ ] Verify chain ID matches intended network
- [ ] Confirm value ≤ $10,000 or obtain user confirmation

## Key Security Rules

- **NEVER** output, store, or transmit private keys or seed phrases
- Use hardware wallets or secure enclaves for mainnet signing
- Rotate session keys regularly; set expiry and spending caps
- Prefer read-only RPC for balance queries

## References

- `references/hd-paths.md` — BIP-44 paths per chain
- `references/erc4337-setup.md` — Smart account configuration
- `knowledge-base/chains/` — Per-chain RPC and explorer URLs

---
name: skill-02-smart-contract-interaction
description: Interacts with smart contracts via ABI encode/decode, read/write calls, deployment, proxy patterns, and multicall batching. Use when calling contract functions, deploying contracts, or working with upgradeable proxies.
metadata:
  phase: 1
  chains: ethereum,polygon,arbitrum,base,optimism,avalanche,bnb,solana
---

# Smart Contract Interaction

## When to Use

- Reading contract state (view/pure functions)
- Writing transactions (state-changing calls)
- Encoding/decoding ABI data
- Deploying contracts (direct or via factory)
- Working with proxy patterns (EIP-1967, UUPS, Transparent)
- Batching reads with Multicall3

## Prerequisites

- MCP: `blockchain-rpc-server`
- MCP: `defi-protocol-server` for known protocol ABIs
- MCP: `security-audit` screening for unknown contracts
- Guardrails: verify contract before interaction

## Workflow

### 1. Contract Verification

Before any write interaction:

1. Check contract is verified on block explorer (Etherscan API)
2. Compare bytecode hash if unverified — **block if mismatch with known good**
3. Run rug-pull pattern checks (see skill-08)
4. Confirm address is not on sanctions list

### 2. Read Calls

```typescript
// Prefer eth_call with explicit block tag
const result = await provider.call({
  to: contractAddress,
  data: iface.encodeFunctionData('balanceOf', [userAddress])
}, 'latest');
```

Use Multicall3 (`0xcA11bde05977b3631167028862bE2a173976CA11`) to batch reads.

### 3. Write Calls

1. Encode function call with ABI
2. Estimate gas: `eth_estimateGas` + 20% buffer
3. **Simulate** via `eth_call` with `from` set to signer
4. Check token approvals — warn if `type(uint256).max`
5. Submit transaction with appropriate gas params (see skill-12)

### 4. Deployment

| Pattern | When to Use |
|---------|-------------|
| Direct deploy | Simple, immutable contracts |
| CREATE2 | Deterministic addresses across chains |
| EIP-1967 Proxy | Upgradeable logic contracts |
| UUPS | Gas-efficient upgrades (logic owns upgrade) |
| Minimal Proxy (EIP-1167) | Clone factory patterns |

### 5. Proxy Interaction

- Read implementation: `storage` slot `0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc`
- Always interact with proxy address, not implementation
- Verify implementation is not self-destructable without timelock

## ABI Resources

- `knowledge-base/standards/` — ERC interface ABIs
- `defi-protocol-server` — Pre-indexed protocol ABIs
- Etherscan verified source for unknown contracts

## References

- `references/multicall-patterns.md`
- `references/proxy-patterns.md`

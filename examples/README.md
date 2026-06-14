# Web3 Examples

Runnable scaffolds and architecture blueprints for Web3 agent workflows.

## Selector Table

| Example | Type | Best for | Stack | Starting skills |
|---------|------|----------|-------|-----------------|
| [uniswap-swap-guardrails](uniswap-swap-guardrails/) | Runnable | Safe DEX swap with simulation + approval checks | Ethereum, Uniswap V3 | skill-03, skill-08, skill-15 |
| [compliance-screening-transfer](compliance-screening-transfer/) | Runnable | Sanctions screening before transfer | EVM + compliance MCP | skill-09, skill-01 |
| [nft-mint-ipfs](nft-mint-ipfs/) | Runnable | Pin metadata and validate CID before mint | IPFS, ERC-721 | skill-04, ipfs-storage MCP |
| [defi-yield-vault-blueprint](defi-yield-vault-blueprint/) | Blueprint | ERC-4626 vault architecture | Ethereum, Aave/Yearn | skill-03, skill-13 |
| [cross-chain-bridge-blueprint](cross-chain-bridge-blueprint/) | Blueprint | L1→L2 bridge integration plan | Ethereum, Arbitrum | skill-06, skill-09 |
| [dao-governance-blueprint](dao-governance-blueprint/) | Blueprint | Governor + timelock deployment | OpenZeppelin Governor | skill-05 |

## Runnable vs Blueprint

| Type | Count | What you get |
|------|-------|--------------|
| **Runnable scaffold** | 3 | Scripts, configs, smoke-test path (`make smoke-test`) |
| **Architecture blueprint** | 3 | README, spec.md, plan.md, tasks.md — no executable code |

## Quick Run

```bash
cd examples/uniswap-swap-guardrails
make smoke-test
```

Windows (PowerShell):

```powershell
cd examples/uniswap-swap-guardrails
node scripts/simulate-swap.js
node scripts/check-approval.js
```

Install via VS Code/JetBrains: **Scaffold Runnable Example** command.

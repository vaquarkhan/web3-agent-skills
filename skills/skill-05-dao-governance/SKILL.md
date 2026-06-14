---
name: skill-05-dao-governance
description: Manages DAO governance including proposals, voting, delegation, treasury management, and timelocks. Use when interacting with Governor contracts, Snapshot, or DAO treasuries.
metadata:
  phase: 4
  chains: ethereum,polygon,arbitrum,base,optimism
---

# DAO Governance

## When to Use

- Creating or voting on governance proposals
- Managing vote delegation
- Interacting with DAO treasuries (Gnosis Safe, timelocks)
- Analyzing proposal outcomes and quorum
- Configuring on-chain vs off-chain (Snapshot) governance

## Prerequisites

- MCP: `blockchain-rpc-server`, `defi-protocol-server`
- Skills: skill-02, skill-09 (treasury compliance)

## Workflow

### 1. Governance Frameworks

| Framework | Voting | Execution |
|-----------|--------|-----------|
| OpenZeppelin Governor | On-chain | TimelockController |
| Compound Governor Bravo | On-chain | Timelock |
| Snapshot | Off-chain (signed) | Multisig execution |
| Aragon OSx | On-chain | Plugin-based |

### 2. Proposal Lifecycle

1. **Draft** — encode calls array (targets, values, calldatas)
2. **Submit** — `propose(targets, values, calldatas, description)`
3. **Voting delay** — wait `votingDelay` blocks
4. **Voting period** — cast votes (for/against/abstain)
5. **Queue** — if quorum met and majority for
6. **Timelock delay** — wait `timelock.delay()`
7. **Execute** — `execute(targets, values, calldatas, descriptionHash)`

### 3. Voting

```solidity
governor.castVote(proposalId, support); // 0=against, 1=for, 2=abstain
governor.castVoteWithReason(proposalId, support, reason);
```

- Check voting power at `proposal.startBlock` snapshot
- Delegate before snapshot block to activate voting power
- Use `getVotes(account, blockNumber)` to verify power

### 4. Delegation

- Self-delegate to activate token voting power
- Delegate to trusted representative
- Monitor delegate voting history before delegating

### 5. Treasury Management

- Treasuries typically held in Gnosis Safe or TimelockController
- Large withdrawals require multi-sig + timelock
- Screen all outbound transfers via compliance MCP
- Diversify and report per DAO transparency standards

## Analysis

For each proposal, report:
- Quorum required vs current votes
- For/against split and notable voters
- Impact of executable calls (token transfers, parameter changes)
- Timelock ETA if passed

## References

- `references/governor-bravo.md`
- `references/snapshot-integration.md`

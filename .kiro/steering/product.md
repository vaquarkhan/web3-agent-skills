# Web3 Agent Skills — Product Steering

## Mission

Give Web3 AI agents production-grade operating procedures: simulate before send, screen before transfer, audit before interact.

## Users

- DeFi developers building agent-assisted trading workflows
- Compliance teams integrating sanctions screening into crypto ops
- NFT platforms automating mint/metadata pipelines
- Institutional teams exploring RWA tokenization with guardrails

## Non-Goals

- Storing or handling private keys
- Bypassing sanctions or compliance checks
- Executing mainnet transactions without user confirmation above thresholds

## Core Flows

1. **DeFi swap:** audit → simulate → screen → execute with MEV protection
2. **Bridge:** security review → test amount → screen both chains → monitor claim
3. **Compliance transfer:** screen → Travel Rule check → log → execute

Load `AGENTS.md` and `guardrails/web3-guardrails.yaml` at session start.

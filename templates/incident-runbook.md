# Web3 Incident Runbook

## Severity Levels

| Level | Example | Response |
|-------|---------|----------|
| P1 | Funds at risk, key compromise suspected | Stop all txs, rotate keys, notify users |
| P2 | Stuck transaction, failed bridge claim | Diagnose, speed up/cancel, manual claim |
| P3 | RPC outage, oracle stale | Failover RPC, pause dependent ops |

## Immediate Actions

1. Halt automated signing and agent write operations
2. Document transaction hashes and affected addresses
3. Run compliance re-screening on involved addresses
4. Preserve logs (screening results, simulation outputs)

## Recovery

- Stuck EVM tx: same-nonce cancel with +20% gas (skill-12)
- Bridge stuck: check message status on bridge explorer
- Rug pull suspected: block contract in guardrails denylist

## Post-Incident

- Update `guardrails/web3-guardrails.yaml` if new pattern found
- Add entry to `knowledge-base/security/exploit-db/`

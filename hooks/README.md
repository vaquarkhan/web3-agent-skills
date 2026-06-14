# Web3 Hooks

Pre-flight hooks for agent sessions. Reference from skills and guardrails.

| Hook | Purpose |
|------|---------|
| `session-start.sh` | Load AGENTS.md routing and guardrails |
| `transaction-guard.sh` | Block txs > $10K without confirmation flag |
| `compliance-pre.sh` | Require screening result file before transfer |
| `security-audit-pre.sh` | Require audit verdict before contract interaction |

Configure in your agent's hook system or run manually before risky operations.

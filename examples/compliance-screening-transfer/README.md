# Compliance Screening Transfer

**Type:** Runnable scaffold  
**Skills:** skill-09-compliance-aml, skill-01-wallet-management

Sanctions screening and Travel Rule threshold check before an outbound transfer.

## Smoke Test

```bash
make smoke-test
```

## Workflow

1. Screen recipient via compliance MCP (or local denylist fallback)
2. Check Travel Rule threshold for jurisdiction
3. Block if status = BLOCKED
4. Log screening result with timestamp

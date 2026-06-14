# FATF Travel Rule

**Standard:** FATF Recommendation 16  
**Scope:** VASP-to-VASP virtual asset transfers

## Requirements

Originator VASP must transmit:
- Name
- Account number (wallet address)
- Physical address or national ID or DOB+POB or LEI

Beneficiary VASP must verify beneficiary identity before crediting.

## Thresholds (varies by jurisdiction)

| Jurisdiction | Threshold |
|--------------|-----------|
| US (FinCEN) | $3,000 |
| EU (TFR) | €0 (all transfers) |
| UK | £1,000 |
| Singapore | S$1,500 |

## Implementation

- Use Travel Rule Protocol (TRP) or OpenVASP
- `compliance-screening-server.check_travel_rule` tool
- Retain records ≥ 5 years

## Agent Actions

- Always check if transfer is VASP-to-VASP
- Collect originator info before release
- Block if beneficiary VASP cannot be identified

---
name: skill-09-compliance-aml
description: Handles crypto compliance including sanctions screening, Travel Rule, MiCA requirements, tax reporting, and SEC Howey test analysis. Use for regulated workflows, KYC/AML checks, or jurisdictional compliance questions.
metadata:
  phase: 3
  chains: all
---

# Compliance & AML

## When to Use

- Screening wallet addresses against sanctions lists
- Implementing Travel Rule for VASP transfers
- Assessing MiCA token classification (ART, EMT, other crypto-assets)
- Tax reporting (IRS 1099-DA, cost basis)
- Evaluating whether a token passes the Howey test

## Prerequisites

- MCP: `compliance-screening-server` (required for all outbound transfers)
- Knowledge base: `knowledge-base/regulations/`

## Jurisdiction Coverage

| Jurisdiction | Regulations |
|--------------|-------------|
| EU | MiCA, Travel Rule (TFR), DORA, AMLD6 |
| US | SEC Howey, FinCEN BSA, IRS 1099-DA |
| UK | FCA crypto registration, financial promotions |
| Singapore | MAS Payment Services Act |
| Japan | FSA exchange registration, stablecoin rules |
| UAE | VARA (Dubai), ADGM |
| Global | FATF Travel Rule, risk-based approach |

## Workflow

### 1. Sanctions Screening

**Required before every transfer to an external address:**

1. Call `compliance-screening-server` → `screen_address`
2. Check OFAC SDN, EU consolidated list, UN sanctions
3. **BLOCK** if match score > threshold
4. Log screening result with timestamp and case ID

### 2. Travel Rule (FATF R.16)

For VASP-to-VASP transfers > jurisdiction threshold:

1. Identify beneficiary VASP
2. Exchange originator info (name, account, address) via TRP (Travel Rule Protocol)
3. Verify beneficiary before releasing funds
4. Retain records ≥ 5 years

### 3. MiCA Classification

| Category | Criteria | Requirements |
|----------|----------|--------------|
| EMT | Single fiat-pegged stablecoin | Reserve backing, redemption |
| ART | Multi-asset or algo stable | Stricter reserve rules |
| Other crypto-asset | Default | Whitepaper, CASP authorization |
| Utility token | Access to good/service | Exempt if no investment expectation |

### 4. Howey Test (US)

Four prongs — investment contract if ALL met:
1. Investment of money
2. Common enterprise
3. Expectation of profits
4. Derived from efforts of others

Document analysis for any token launch or marketing in US.

### 5. Tax Reporting

- Track cost basis (FIFO default; specific ID if elected)
- Report disposals on Form 8949 / 1099-DA (2025+)
- Flag staking rewards as income at FMV on receipt

## Hard Rules

- Never bypass sanctions screening
- Escalate PEP (Politically Exposed Person) matches
- Require enhanced due diligence for transactions > $3,000 (FinCEN)

## References

- `knowledge-base/regulations/mica/`
- `knowledge-base/regulations/travel-rule/`
- `knowledge-base/regulations/fatf/`
- `knowledge-base/regulations/sec-howey/`

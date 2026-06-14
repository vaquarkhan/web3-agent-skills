---
name: skill-14-social-reputation
description: Integrates Web3 social protocols including Lens, Farcaster, Frames, reputation scores, and prediction markets. Use for social graph queries, on-chain reputation, or social trading features.
metadata:
  phase: 5
  chains: polygon,base,ethereum
---

# Social & Reputation

## When to Use

- Querying Lens Protocol profiles and publications
- Reading/posting Farcaster casts and Frames
- Building reputation scores from on-chain activity
- Integrating prediction markets (Polymarket, Omen)
- Social trading signals and copy-trading filters

## Prerequisites

- MCP: `blockchain-rpc-server`, `nft-metadata-server`
- Skills: skill-10 (identity), skill-07 (analytics)

## Workflow

### 1. Lens Protocol (v3)

- Profile: `LensProfile` NFT per user
- Publications: posts, comments, mirrors, quotes
- GraphQL via Lens API for feed queries
- Actions: `follow`, `collect`, `comment` via Lens Client

```
Profile ID → Publications → Collect modules → Revenue split
```

### 2. Farcaster

- Hub API for casts, reactions, links
- **Frames:** Interactive embeds in casts (v2 SDK)
  - Build frame with `fc:frame` meta tags
  - Handle `post_message` callbacks for user actions
- Signer management for posting on behalf of users

### 3. Reputation Scores

Composite score from:
| Signal | Weight |
|--------|--------|
| Wallet age | 10% |
| DeFi participation (non-toxic) | 20% |
| Governance participation | 15% |
| NFT/ENS ownership | 10% |
| Social graph (mutual follows) | 15% |
| Attestations (EAS) | 20% |
| No sanctions/flags | 10% (binary gate) |

Use Gitcoin Passport, Talent Protocol, or custom scoring.

### 4. Prediction Markets

- Polymarket: CTF exchange on Polygon, USDC collateral
- Query market odds as probability signals
- **Compliance:** restrict US persons per CFTC guidance

### 5. DePIN (Emerging)

- Helium, Render, Filecoin network participation
- Token rewards for infrastructure provision
- Integrate device/wallet reputation for node operators

## Privacy & Safety

- Never auto-post on behalf of user without confirmation
- Filter spam/low-reputation accounts in social feeds
- Prediction market integration requires jurisdiction check

## References

- `references/lens-api.md`
- `references/farcaster-frames.md`
- `references/reputation-models.md`

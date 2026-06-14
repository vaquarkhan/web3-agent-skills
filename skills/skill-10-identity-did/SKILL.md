---
name: skill-10-identity-did
description: Manages decentralized identity including DIDs, verifiable credentials, ENS names, ZK-KYC, and on-chain attestations. Use for identity verification, name resolution, or credential workflows.
metadata:
  phase: 3
  chains: ethereum,polygon,base
---

# Identity (DID)

## When to Use

- Creating or resolving Decentralized Identifiers (DIDs)
- Issuing/verifying Verifiable Credentials (VCs)
- Registering or resolving ENS names
- Implementing ZK-KYC (prove eligibility without revealing PII)
- Working with on-chain attestations (EAS, Verax)

## Prerequisites

- MCP: `blockchain-rpc-server`, `compliance-screening-server`
- Skill-09 for KYC/regulatory context

## Workflow

### 1. DID Methods

| Method | Format | Chain |
|--------|--------|-------|
| `did:ethr` | `did:ethr:0x...` | Ethereum |
| `did:pkh` | `did:pkh:eip155:1:0x...` | Multi-chain |
| `did:ion` | Sidetree on Bitcoin | Bitcoin L2 |
| `did:web` | HTTPS-hosted | Off-chain |

Create DID document with verification methods (public keys) and service endpoints.

### 2. Verifiable Credentials

```
Issuer → signs VC → Holder stores → Verifier requests proof
```

- Use W3C VC Data Model v2
- Sign with `EthereumEip712Signature2021` or `Ed25519Signature2020`
- Verify: check signature, revocation status, schema compliance

### 3. ENS

- Resolve: `eth_resolver.resolve(name, data)`
- Register via ETH Registrar Controller
- Set records: address, text (email, url, avatar), contenthash (IPFS)
- Reverse resolution: set `addr.reverse` record

### 4. ZK-KYC

Prove attributes without revealing identity:
1. User completes KYC with issuer off-chain
2. Issuer provides signed credential or Semaphore identity
3. User generates ZK proof of membership/eligibility
4. Verifier checks proof on-chain (no PII exposed)

Protocols: Polygon ID, World ID, Semaphore, Sismo

### 5. On-Chain Attestations

**Ethereum Attestation Service (EAS):**
```solidity
eas.attest(AttestationRequest({
  schema: schemaUID,
  data: AttestationRequestData({ recipient, expirationTime, revocable, refUID, data, value })
}));
```

Use for reputation, KYC status, guild membership, and compliance proofs.

## Privacy Rules

- Never store PII on-chain
- Minimize credential disclosure (selective disclosure proofs)
- Honor GDPR right-to-erasure for off-chain identity data

## References

- `references/did-methods.md`
- `references/eas-schemas.md`

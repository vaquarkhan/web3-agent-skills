---
name: skill-04-nft-management
description: Manages NFTs including minting, trading, ERC-721/1155 operations, marketplace integration, and token-bound accounts (ERC-6551). Use when working with NFT collections, metadata, or TBA wallets.
metadata:
  phase: 2
  chains: ethereum,polygon,arbitrum,base,optimism
---

# NFT Management

## When to Use

- Minting ERC-721 or ERC-1155 tokens
- Buying/selling on OpenSea, Blur, Reservoir
- Resolving and validating NFT metadata
- Creating token-bound accounts (ERC-6551)
- Managing royalty enforcement (EIP-2981)

## Prerequisites

- MCP: `nft-metadata-server`, `blockchain-rpc-server`, `ipfs-storage-server`
- Skills: skill-02, skill-08 (verify collection contracts)

## Workflow

### 1. Collection Verification

- Verify contract on explorer; check for verified source
- Confirm standard: ERC-721 (`ownerOf`), ERC-1155 (`balanceOf` with id)
- Check for honeypot patterns (non-transferable after mint, hidden fees)
- Validate royalty config via `royaltyInfo(tokenId, salePrice)`

### 2. Minting

1. Resolve metadata URI (IPFS CID or Arweave txid)
2. Pin metadata via `ipfs-storage-server` before mint
3. Estimate mint cost including gas
4. Execute mint; verify token received

### 3. Trading

- Use Reservoir API via `nft-metadata-server` for aggregated listings
- Set approval: prefer `setApprovalForAll` only for trusted marketplaces
- For high-value sales: use private tx submission (skill-15)
- Verify listing price and currency (ETH, WETH, USDC)

### 4. Token-Bound Accounts (ERC-6551)

1. Deploy TBA registry implementation
2. Create account: `createAccount(implementation, chainId, tokenContract, tokenId, salt, initData)`
3. TBA can hold ETH, ERC-20, and other NFTs
4. Sign transactions from TBA via ERC-1271

### 5. Metadata Standards

| Field | Requirement |
|-------|-------------|
| `name` | Human-readable token name |
| `description` | Token description |
| `image` | IPFS/Arweave URI (not HTTP unless pinned) |
| `attributes` | Array of trait_type/value pairs |

## References

- `knowledge-base/standards/erc721/`, `erc1155/`, `erc6551/`
- `references/marketplace-apis.md`

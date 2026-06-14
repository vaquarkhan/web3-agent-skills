# ERC-721 Non-Fungible Token Standard

## Required Functions

```solidity
function balanceOf(address owner) external view returns (uint256);
function ownerOf(uint256 tokenId) external view returns (address);
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) external;
function transferFrom(address from, address to, uint256 tokenId) external;
function approve(address to, uint256 tokenId) external;
function setApprovalForAll(address operator, bool approved) external;
function getApproved(uint256 tokenId) external view returns (address);
function isApprovedForAll(address owner, address operator) external view returns (bool);
```

## Metadata Extension (ERC-721Metadata)

- `name()`, `symbol()`, `tokenURI(tokenId)`

## Related Standards

- EIP-2981: NFT Royalty Standard
- ERC-6551: Token Bound Accounts

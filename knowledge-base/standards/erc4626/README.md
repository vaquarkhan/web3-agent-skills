# ERC-4626 Tokenized Vault Standard

Extends ERC-20 with vault semantics.

```solidity
function deposit(uint256 assets, address receiver) returns (uint256 shares);
function redeem(uint256 shares, address receiver, address owner) returns (uint256 assets);
function convertToAssets(uint256 shares) view returns (uint256);
function convertToShares(uint256 assets) view returns (uint256);
```

Used by Yearn, ERC-4626 wrappers for yield-bearing assets.

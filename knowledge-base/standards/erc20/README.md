# ERC-20 Fungible Token Standard

## Required Functions

```solidity
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address to, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address from, address to, uint256 amount) external returns (bool);
```

## Events

- `Transfer(address indexed from, address indexed to, uint256 value)`
- `Approval(address indexed owner, address indexed spender, uint256 value)`

## Security Notes

- Warn on unlimited approvals (`type(uint256).max`)
- Check for fee-on-transfer tokens before DEX integration
- Verify `decimals()` — typically 18, USDC/USDT use 6

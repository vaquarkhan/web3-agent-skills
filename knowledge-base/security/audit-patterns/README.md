# Audit Patterns

Recommended patterns from OpenZeppelin, Consensys, and Trail of Bits.

## Checks-Effects-Interactions

```solidity
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);  // checks
    balances[msg.sender] -= amount;              // effects
    (bool ok,) = msg.sender.call{value: amount}(""); // interactions
    require(ok);
}
```

## Pull over Push

Prefer `claim()` pattern over pushing payments in loops.

## Timelocks

Admin functions should go through TimelockController with ≥ 24h delay for DeFi protocols.

See `common-vulnerabilities/` for anti-patterns.

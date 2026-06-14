# Aave V3

## Ethereum Pool

Pool: `0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2`
PoolAddressesProvider: `0x2f39d218133AFaB8F2B819B1066a7e862A5E5729`

## Core Functions

- `supply(asset, amount, onBehalfOf, referralCode)`
- `withdraw(asset, amount, to)`
- `borrow(asset, amount, interestRateMode, referralCode, onBehalfOf)`
- `repay(asset, amount, interestRateMode, onBehalfOf)`
- `flashLoanSimple(receiver, asset, amount, params, referralCode)`

## Health Factor

Liquidation when health factor < 1.0. Recommend maintaining > 1.5.

## Subgraph

`https://api.thegraph.com/subgraphs/name/aave/protocol-v3`

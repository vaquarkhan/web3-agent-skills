# MCP Server Templates

Template MCP configurations for Cursor, Claude, and other MCP-capable agents.

Build servers before use:

```bash
npm install && npm run build
```

## Templates

| Template | Server | Env vars |
|----------|--------|----------|
| [blockchain-rpc.mcp.json](blockchain-rpc.mcp.json) | blockchain-rpc-server | `ALCHEMY_ETH_URL`, `ETHEREUM_RPC_URL` |
| [defi-protocol.mcp.json](defi-protocol.mcp.json) | defi-protocol-server | `THE_GRAPH_API_KEY` |
| [nft-metadata.mcp.json](nft-metadata.mcp.json) | nft-metadata-server | `RESERVOIR_API_KEY` |
| [price-feed.mcp.json](price-feed.mcp.json) | price-feed-server | `COINGECKO_API_KEY` |
| [compliance-screening.mcp.json](compliance-screening.mcp.json) | compliance-screening-server | `CHAINALYSIS_API_KEY` |
| [ipfs-storage.mcp.json](ipfs-storage.mcp.json) | ipfs-storage-server | `PINATA_JWT` |

Copy into your agent's MCP settings. Paths assume repo root as working directory.

See also root [mcp-config.json](../mcp-config.json) for combined config.

# Web3 Agent Skills — Tech Steering

## Stack

- **Skills:** Agent Skills standard (`SKILL.md` + YAML frontmatter)
- **MCP:** TypeScript servers via `@modelcontextprotocol/sdk`
- **Knowledge base:** YAML/JSON seed data with provenance blocks
- **Validation:** Node.js scripts (`validate-skills.mjs`, `validate-assets.mjs`)
- **Installers:** VS Code extension (JS), JetBrains plugin (Kotlin)

## Key Paths

| Path | Purpose |
|------|---------|
| `skills/` | 15 domain skills |
| `tools/mcp-servers/` | 6 MCP servers |
| `registry/assets.json` | Machine-readable index (version-synced) |
| `presets/` | Chain operating profiles |
| `guardrails/web3-guardrails.yaml` | Safety policy |

## Build

```bash
npm install && npm run build && npm run validate && npm test
```

## MCP Env Vars

See `.env.example`. Never commit secrets.

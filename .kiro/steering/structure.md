# Web3 Agent Skills — Structure Steering

```
web3-agent-skills/
├── skills/              # SKILL.md workflows (15)
├── tools/mcp-servers/   # MCP implementations (6)
├── knowledge-base/      # Seed data: chains, protocols, regulations
├── presets/             # Chain presets → knowledge_base links
├── starter-packs/       # Use-case bundles
├── guardrails/          # web3-guardrails.yaml
├── registry/            # assets.json (source of truth for installers)
├── examples/            # Runnable (3) + blueprint (3)
├── vscode-extension/    # VS Code/Cursor installer
├── jetbrains-plugin/    # JetBrains installer
├── evals/               # Routing benchmark
└── tests/               # skills, assets, guardrails, mcp, knowledge-base
```

When adding assets: update `registry/assets.json`, run `npm run validate:assets`, add tests.

# Web3 Agent Skills — JetBrains Plugin

Install Web3 agent skills into the current project from **Tools → Web3 Agent Skills**.

Mirrors the VS Code extension commands:

- Install Full Toolkit
- Install Core Pack
- Install Agent Adapters
- Install Starter Pack
- Install MCP Templates
- Scaffold Runnable Example

## Build

Requires JDK 17+ and Gradle:

```bash
cd jetbrains-plugin
./gradlew buildPlugin   # produces build/distributions/*.zip
./gradlew runIde        # sandbox IDE
```

## Development

Source: `src/main/kotlin/com/vaquarkhan/web3agentskills/`

Asset maps mirror `vscode-extension/extension.js` and load from the bundled repo or GitHub raw URL.

See [docs/jetbrains-setup.md](../docs/jetbrains-setup.md).

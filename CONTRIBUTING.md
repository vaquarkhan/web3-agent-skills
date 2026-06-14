# Contributing to Web3 Agent Skills

Contributions should be specific, verifiable, and grounded in real Web3 practice.

## Adding a Skill

1. Create `skills/skill-XX-name/SKILL.md` with YAML frontmatter (`name`, `description`)
2. Include: When to Use, Workflow, Guardrails, References
3. Run `node scripts/validate-skills.js`
4. Update `skills-index.md` and `registry/assets.json`

## Adding an Example

- **Runnable:** include `Makefile`, scripts, and `make smoke-test` path
- **Blueprint:** include `README.md`, `spec.md`, `plan.md`, `tasks.md` only
- Update `examples/README.md` and `registry/assets.json`

## Plugin Changes

Keep `vscode-extension/extension.js` and `jetbrains-plugin/InstallerData.kt` in sync with `registry/assets.json`.

## Pull Requests

- One concern per PR when possible
- Run `npm test` and `node scripts/validate-skills.js` before submitting

Inspired by [data-engineering-agent-skills](https://github.com/vaquarkhan/data-engineering-agent-skills) and [agent-skills](https://agentskills.io).

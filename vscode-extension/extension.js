const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const https = require("https");

const CORE_FILES = [
  "AGENTS.md",
  "CLAUDE.md",
  "skills-index.md",
  "registry/assets.json",
  "guardrails/web3-guardrails.yaml",
  "mcp-config.json",
  "templates/transaction-plan.yaml",
  "templates/compliance-checklist.yaml",
  "templates/security-audit-report.yaml",
  "templates/bridge-transfer-plan.yaml",
  "templates/incident-runbook.md",
  ".env.example",
  "docs/getting-started.md",
  "docs/cursor-setup.md",
  "docs/jetbrains-setup.md",
  "docs/codex-setup.md",
  "scripts/install.sh",
  "scripts/install.ps1",
  "scripts/install_toolkit.py",
  "scripts/link-skills.js",
  "scripts/validate-skills.js",
  "hooks/README.md",
  "hooks/hooks.json",
  "hooks/session-start.sh",
  "hooks/transaction-guard.sh",
  "hooks/compliance-pre.sh",
  "hooks/security-audit-pre.sh"
];

const AGENT_ADAPTERS = {
  Cursor: [
    ".cursor/rules/00-web3-agent-core.mdc",
    ".cursor/rules/10-guardrails-first.mdc",
    ".cursor/rules/20-chain-preset-selector.mdc",
    ".cursor/rules/30-simulate-before-send.mdc"
  ],
  Claude: [
    ".claude/commands/simulate.md",
    ".claude/commands/audit.md",
    ".claude/commands/swap.md",
    ".claude/commands/bridge.md",
    ".claude/commands/screen.md",
    ".claude/commands/review.md",
    "AGENTS.md",
    "CLAUDE.md"
  ],
  Copilot: [".github/copilot-instructions.md", "AGENTS.md"],
  Gemini: [
    ".gemini/commands/simulate.md",
    ".gemini/commands/audit.md",
    ".gemini/commands/swap.md",
    ".gemini/commands/bridge.md",
    ".gemini/commands/screen.md",
    ".gemini/commands/review.md"
  ],
  Kiro: [
    ".kiro/steering/product.md",
    ".kiro/steering/tech.md",
    ".kiro/steering/structure.md",
    "docs/kiro-setup.md",
    "AGENTS.md",
    "CLAUDE.md"
  ],
  Codex: ["AGENTS.md", "CLAUDE.md", "skills-index.md", "docs/getting-started.md", "docs/codex-setup.md"],
  OpenCode: ["AGENTS.md", "CLAUDE.md", ".opencode/README.md", "docs/opencode-setup.md", "docs/getting-started.md"],
  Windsurf: [".windsurfrules.example", "docs/windsurf-setup.md", "docs/getting-started.md"]
};

const STARTER_PACKS = {
  "DeFi Trader": {
    files: [
      "starter-packs/defi-trader-starter.yaml",
      "presets/ethereum-mainnet.yaml",
      "guardrails/web3-guardrails.yaml",
      "mcp/defi-protocol.mcp.json",
      "mcp/price-feed.mcp.json",
      "mcp/blockchain-rpc.mcp.json",
      "AGENTS.md",
      "skills-index.md"
    ]
  },
  "Compliance Officer": {
    files: [
      "starter-packs/compliance-officer-starter.yaml",
      "templates/compliance-checklist.yaml",
      "mcp/compliance-screening.mcp.json",
      "guardrails/web3-guardrails.yaml",
      "AGENTS.md",
      "skills-index.md"
    ]
  },
  "NFT Curator": {
    files: [
      "starter-packs/nft-curator-starter.yaml",
      "presets/ethereum-mainnet.yaml",
      "mcp/nft-metadata.mcp.json",
      "mcp/ipfs-storage.mcp.json",
      "AGENTS.md",
      "skills-index.md"
    ]
  },
  "Cross-Chain Bridge": {
    files: [
      "starter-packs/cross-chain-starter.yaml",
      "templates/bridge-transfer-plan.yaml",
      "presets/arbitrum-one.yaml",
      "presets/ethereum-mainnet.yaml",
      "mcp/blockchain-rpc.mcp.json",
      "AGENTS.md",
      "skills-index.md"
    ]
  },
  "MEV Protection": {
    files: [
      "starter-packs/mev-protection-starter.yaml",
      "references/mev-protection-patterns.md",
      "presets/ethereum-mainnet.yaml",
      "mcp/blockchain-rpc.mcp.json",
      "mcp/price-feed.mcp.json",
      "AGENTS.md",
      "skills-index.md"
    ]
  },
  "RWA Institutional": {
    files: [
      "starter-packs/rwa-institutional-starter.yaml",
      "templates/compliance-checklist.yaml",
      "mcp/compliance-screening.mcp.json",
      "guardrails/web3-guardrails.yaml",
      "AGENTS.md",
      "skills-index.md"
    ]
  }
};

const MCP_TEMPLATES = {
  "Blockchain RPC": ["mcp/blockchain-rpc.mcp.json"],
  "DeFi Protocol": ["mcp/defi-protocol.mcp.json"],
  "NFT Metadata": ["mcp/nft-metadata.mcp.json"],
  "Price Feed": ["mcp/price-feed.mcp.json"],
  "Compliance Screening": ["mcp/compliance-screening.mcp.json"],
  "IPFS Storage": ["mcp/ipfs-storage.mcp.json"]
};

const RUNNABLE_EXAMPLES = {
  "Uniswap Swap Guardrails": [
    "examples/uniswap-swap-guardrails/README.md",
    "examples/uniswap-swap-guardrails/spec.md",
    "examples/uniswap-swap-guardrails/plan.md",
    "examples/uniswap-swap-guardrails/tasks.md",
    "examples/uniswap-swap-guardrails/Makefile",
    "examples/uniswap-swap-guardrails/scripts/simulate-swap.js",
    "examples/uniswap-swap-guardrails/scripts/check-approval.js",
    "examples/uniswap-swap-guardrails/config/chains.json",
    "scripts/validate-skills.js"
  ],
  "Compliance Screening Transfer": [
    "examples/compliance-screening-transfer/README.md",
    "examples/compliance-screening-transfer/spec.md",
    "examples/compliance-screening-transfer/plan.md",
    "examples/compliance-screening-transfer/tasks.md",
    "examples/compliance-screening-transfer/Makefile",
    "examples/compliance-screening-transfer/scripts/screen-address.js",
    "examples/compliance-screening-transfer/scripts/travel-rule-check.js",
    "examples/compliance-screening-transfer/data/sample-addresses.json",
    "scripts/validate-skills.js"
  ],
  "NFT Mint IPFS": [
    "examples/nft-mint-ipfs/README.md",
    "examples/nft-mint-ipfs/spec.md",
    "examples/nft-mint-ipfs/plan.md",
    "examples/nft-mint-ipfs/tasks.md",
    "examples/nft-mint-ipfs/Makefile",
    "examples/nft-mint-ipfs/metadata/collection.json",
    "examples/nft-mint-ipfs/scripts/pin-metadata.js",
    "examples/nft-mint-ipfs/scripts/validate-cid.js",
    "scripts/validate-skills.js"
  ]
};

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("web3AgentSkills.installFullToolkit", async () => {
      const root = getWorkspaceRoot();
      if (!root) return;
      const files = [
        ...CORE_FILES,
        ...Object.values(AGENT_ADAPTERS).flat(),
        ...Object.values(STARTER_PACKS).flatMap((item) => item.files),
        ...Object.values(MCP_TEMPLATES).flat(),
        "mcp/README.md",
        "skills/skill-01-wallet-management/SKILL.md",
        "skills/skill-02-smart-contract-interaction/SKILL.md",
        "skills/skill-03-defi-operations/SKILL.md",
        "skills/skill-08-security-audit/SKILL.md",
        "skills/skill-09-compliance-aml/SKILL.md",
        "skills/skill-12-gas-optimization/SKILL.md",
        "skills/skill-15-mev-protection/SKILL.md"
      ];
      await installFiles(context, root, dedupe(files), "full toolkit");
    }),
    vscode.commands.registerCommand("web3AgentSkills.installCorePack", async () => {
      const root = getWorkspaceRoot();
      if (!root) return;
      await installFiles(context, root, CORE_FILES, "core pack");
    }),
    vscode.commands.registerCommand("web3AgentSkills.installAgentAdapters", async () => {
      const root = getWorkspaceRoot();
      if (!root) return;
      const choices = [...Object.keys(AGENT_ADAPTERS), "All"];
      const picked = await vscode.window.showQuickPick(choices, { placeHolder: "Choose agent adapters" });
      if (!picked) return;
      const files = picked === "All" ? dedupe(Object.values(AGENT_ADAPTERS).flat()) : AGENT_ADAPTERS[picked];
      await installFiles(context, root, files, `${picked} adapters`);
    }),
    vscode.commands.registerCommand("web3AgentSkills.installStarterPack", async () => {
      const root = getWorkspaceRoot();
      if (!root) return;
      const picked = await vscode.window.showQuickPick(Object.keys(STARTER_PACKS), { placeHolder: "Choose starter pack" });
      if (!picked) return;
      await installFiles(context, root, STARTER_PACKS[picked].files, `${picked} starter pack`);
    }),
    vscode.commands.registerCommand("web3AgentSkills.installMcpTemplates", async () => {
      const root = getWorkspaceRoot();
      if (!root) return;
      const choices = [...Object.keys(MCP_TEMPLATES), "All"];
      const picked = await vscode.window.showQuickPick(choices, { placeHolder: "Choose MCP templates" });
      if (!picked) return;
      const files = picked === "All" ? dedupe(["mcp/README.md", ...Object.values(MCP_TEMPLATES).flat()]) : ["mcp/README.md", ...MCP_TEMPLATES[picked]];
      await installFiles(context, root, files, `${picked} MCP templates`);
    }),
    vscode.commands.registerCommand("web3AgentSkills.scaffoldRunnableExample", async () => {
      const root = getWorkspaceRoot();
      if (!root) return;
      const picked = await vscode.window.showQuickPick(Object.keys(RUNNABLE_EXAMPLES), { placeHolder: "Choose runnable example" });
      if (!picked) return;
      await installFiles(context, root, RUNNABLE_EXAMPLES[picked], `${picked} example`);
    })
  );
}

function deactivate() {}

function getWorkspaceRoot() {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    vscode.window.showErrorMessage("Open a workspace folder before installing Web3 Agent Skills.");
    return null;
  }
  return folders[0].uri.fsPath;
}

async function installFiles(context, workspaceRoot, relativePaths, label) {
  const collisions = relativePaths.filter((p) => fs.existsSync(path.join(workspaceRoot, p)));
  let overwrite = false;
  if (collisions.length > 0) {
    const choice = await vscode.window.showWarningMessage(
      `${collisions.length} file(s) already exist for ${label}. Overwrite?`,
      { modal: true },
      "Overwrite",
      "Skip Existing",
      "Cancel"
    );
    if (choice === "Cancel" || !choice) return;
    overwrite = choice === "Overwrite";
  }

  const installed = [];
  const skipped = [];
  await vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: `Installing ${label}`, cancellable: false },
    async (progress) => {
      for (let i = 0; i < relativePaths.length; i++) {
        const relativePath = relativePaths[i];
        progress.report({ message: relativePath, increment: 100 / relativePaths.length });
        const targetPath = path.join(workspaceRoot, relativePath);
        if (fs.existsSync(targetPath) && !overwrite) {
          skipped.push(relativePath);
          continue;
        }
        const content = await loadAsset(context, relativePath);
        await fs.promises.mkdir(path.dirname(targetPath), { recursive: true });
        await fs.promises.writeFile(targetPath, content, "utf8");
        installed.push(relativePath);
      }
    }
  );
  vscode.window.showInformationMessage(`Installed ${installed.length} file(s) for ${label}.${skipped.length ? ` Skipped ${skipped.length}.` : ""}`);
}

async function loadAsset(context, relativePath) {
  const localCandidates = [
    path.resolve(context.extensionPath, "..", relativePath),
    path.join(context.extensionPath, "resources", relativePath)
  ];
  for (const candidate of localCandidates) {
    if (fs.existsSync(candidate)) return fs.promises.readFile(candidate, "utf8");
  }
  const config = vscode.workspace.getConfiguration("web3AgentSkills");
  const rawBaseUrl = config.get("rawBaseUrl", "https://raw.githubusercontent.com/vaquarkhan/web3-agent-skills/main");
  const url = `${String(rawBaseUrl).replace(/\/$/, "")}/${relativePath.replace(/\\/g, "/")}`;
  return downloadText(url);
}

function downloadText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        resolve(downloadText(response.headers.location));
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    }).on("error", reject);
  });
}

function dedupe(items) {
  return [...new Set(items)];
}

module.exports = { activate, deactivate };

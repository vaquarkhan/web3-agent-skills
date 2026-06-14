#!/usr/bin/env python3
"""Install Web3 Agent Skills into a target project directory."""
import argparse
import os
import shutil
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

CORE_PATHS = [
    "AGENTS.md", "CLAUDE.md", "skills-index.md", "registry/assets.json",
    "guardrails/web3-guardrails.yaml", "mcp-config.json", ".env.example",
    "templates", "presets", "starter-packs", "references", "hooks",
    "docs/getting-started.md", "docs/cursor-setup.md", "docs/jetbrains-setup.md",
    "mcp", "examples/README.md",
    "scripts/install.sh", "scripts/install.ps1", "scripts/install_toolkit.py",
    "scripts/link-skills.js", "scripts/validate-skills.js",
]

TOOL_PATHS = {
    "cursor": [".cursor/rules"],
    "claude": [".claude/commands", "CLAUDE.md"],
    "copilot": [".github/copilot-instructions.md"],
    "gemini": [".gemini/commands"],
    "kiro": [".kiro/steering", "docs/kiro-setup.md"],
    "windsurf": [".windsurfrules.example", "docs/windsurf-setup.md"],
    "opencode": [".opencode", "docs/opencode-setup.md"],
    "codex": ["AGENTS.md", "CLAUDE.md", "skills-index.md", "docs/codex-setup.md"],
    "generic": ["AGENTS.md", "skills-index.md", "registry/assets.json"],
    "skills": ["skills"],
}


def copy_path(src: Path, dst: Path, force: bool, symlink: bool):
    if dst.exists() and not force:
        print(f"skip (exists): {dst.relative_to(dst.parent.parent) if dst.parent.parent in dst.parents else dst}")
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    if symlink and src.is_dir():
        if dst.is_symlink() or dst.exists():
            if dst.is_symlink():
                dst.unlink()
            elif dst.is_dir():
                shutil.rmtree(dst)
            else:
                dst.unlink()
        os.symlink(src, dst, target_is_directory=True)
    elif src.is_dir():
        if dst.exists():
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
    else:
        shutil.copy2(src, dst)
    print(f"installed: {src.relative_to(REPO_ROOT)}")


def detect_tools(target: Path) -> list[str]:
    detected = []
    markers = {
        "cursor": ".cursor",
        "claude": ".claude",
        "copilot": ".github",
        "kiro": ".kiro",
        "windsurf": ".windsurf",
        "opencode": ".opencode",
    }
    for tool, marker in markers.items():
        if (target / marker).exists():
            detected.append(tool)
    return detected or ["generic"]


def main():
    parser = argparse.ArgumentParser(description="Install Web3 Agent Skills")
    parser.add_argument("--tool", required=True, help="cursor|claude|copilot|all|auto|comma-separated")
    parser.add_argument("--target", required=True, help="Target project directory")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--symlink", action="store_true")
    args = parser.parse_args()

    target = Path(args.target).resolve()
    target.mkdir(parents=True, exist_ok=True)

    if args.tool == "all":
        tools = list(TOOL_PATHS.keys()) + ["skills"]
        paths = list(CORE_PATHS)
        for t in TOOL_PATHS:
            paths.extend(TOOL_PATHS[t])
        paths.append("skills")
    elif args.tool == "auto":
        tools = detect_tools(target)
        paths = list(CORE_PATHS) + [p for t in tools for p in TOOL_PATHS.get(t, [])]
    else:
        tools = [t.strip() for t in args.tool.split(",")]
        paths = list(CORE_PATHS) + [p for t in tools for p in TOOL_PATHS.get(t, [])]

    seen = set()
    for rel in paths:
        if rel in seen:
            continue
        seen.add(rel)
        src = REPO_ROOT / rel
        if not src.exists():
            print(f"warn: missing {rel}")
            continue
        dst = target / rel
        copy_path(src, dst, args.force, args.symlink)

    print(f"Done. Installed into {target}")


if __name__ == "__main__":
    main()

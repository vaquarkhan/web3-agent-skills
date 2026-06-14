#!/usr/bin/env sh
TARGET="${1:-.}"
TOOL="${2:-auto}"
exec python3 "$(dirname "$0")/scripts/install_toolkit.py" --tool "$TOOL" --target "$TARGET"

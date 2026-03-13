#!/usr/bin/env bash
# Bootstrap script for agents and contributors.
# Run once after cloning, or any time you suspect the environment is stale.
#
# Usage: ./scripts/setup.sh

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

ok()   { printf "${GREEN}✓${NC} %s\n" "$1"; }
warn() { printf "${YELLOW}!${NC} %s\n" "$1"; }
fail() { printf "${RED}✗${NC} %s\n" "$1"; }

errors=0

# ---------------------------------------------------------------------------
# 1. Git submodules (.sources/)
# ---------------------------------------------------------------------------
printf "\n== Source material submodules ==\n"
if [ -f ".sources/portal/docs/building-apps/essentials/canisters.mdx" ]; then
  ok "Submodules already initialized"
else
  echo "Initializing submodules (shallow)..."
  git submodule update --init --depth 1
  ok "Submodules initialized"
fi

# ---------------------------------------------------------------------------
# 2. Node dependencies
# ---------------------------------------------------------------------------
printf "\n== Node dependencies ==\n"
if [ -d "node_modules" ]; then
  ok "node_modules exists"
else
  echo "Installing npm dependencies..."
  npm install
  ok "npm install complete"
fi

# ---------------------------------------------------------------------------
# 3. Beads + Dolt (task tracking)
# ---------------------------------------------------------------------------
printf "\n== Task tracking (Beads + Dolt) ==\n"

has_bd=true
has_dolt=true

if command -v bd &>/dev/null; then
  ok "bd installed ($(bd --version 2>/dev/null || echo 'unknown version'))"
else
  fail "bd not found — install with: npm install -g @beads/bd"
  has_bd=false
  errors=$((errors + 1))
fi

if command -v dolt &>/dev/null; then
  ok "dolt installed ($(dolt version 2>/dev/null | head -1))"
else
  fail "dolt not found — install with: brew install dolt (macOS) or https://github.com/dolthub/dolt/releases"
  has_dolt=false
  errors=$((errors + 1))
fi

if $has_bd && $has_dolt; then
  if [ -d ".beads/dolt" ]; then
    echo "Syncing task state from remote..."
    bd dolt pull
    ok "Task state synced"
  else
    echo "Bootstrapping task database..."
    bd bootstrap
    ok "Task database bootstrapped"
  fi
fi

# ---------------------------------------------------------------------------
# 4. Build check
# ---------------------------------------------------------------------------
printf "\n== Build check ==\n"
if npm run build --silent 2>/dev/null; then
  ok "Site builds successfully"
else
  fail "Build failed — run 'npm run build' to see errors"
  errors=$((errors + 1))
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
printf "\n"
if [ $errors -eq 0 ]; then
  ok "All set. Run 'bd dolt pull && bd ready' to see available tasks."
else
  warn "$errors issue(s) found — see above."
  if ! $has_bd || ! $has_dolt; then
    echo ""
    echo "Beads/Dolt are optional but required for task coordination."
    echo "Without them you can still write docs — check .docs-plan/migration-plan.md for tasks."
  fi
fi

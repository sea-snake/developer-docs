#!/usr/bin/env bash
# Bootstrap script for agents and contributors.
# Run once after cloning, or any time you suspect the environment is stale.
#
# Usage: ./scripts/setup.sh

set -euo pipefail

# Parse flags
SKIP_BUILD=false
for arg in "$@"; do
  case "$arg" in
    --skip-build) SKIP_BUILD=true ;;
  esac
done

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
echo "Initializing submodules (shallow, no-op for already-initialized ones)..."
git submodule update --init --depth 1
ok "Submodules initialized"

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
  # Working DB: sentinel file present AND .dolt/noms/ has actual data.
  # .bd-dolt-ok alone is not sufficient — it can survive a corrupted or empty DB.
  # Check the noms directory to confirm the database has real data.
  DB_HAS_DATA=false
  if [ -f ".beads/dolt/.bd-dolt-ok" ] && \
     [ -d ".beads/dolt/.dolt/noms" ] && \
     [ -n "$(ls .beads/dolt/.dolt/noms/ 2>/dev/null)" ]; then
    DB_HAS_DATA=true
  fi

  if $DB_HAS_DATA; then
    # DB exists — start server and pull latest state
    echo "Starting Dolt server and syncing..."
    DOLT_OUT=$(bd dolt start 2>&1) || true
    echo "$DOLT_OUT"
    DOLT_PORT=$(echo "$DOLT_OUT" | grep -oE 'port [0-9]+' | grep -oE '[0-9]+$')
    [ -n "$DOLT_PORT" ] && printf '%s\n' "$DOLT_PORT" > .beads/dolt-server.port
    bd dolt pull
    ok "Task state synced"
  else
    # Fresh clone or corrupted DB — full clean reinit from remote.
    # Use bd init --force (not bd bootstrap) so it overwrites any partial data.
    # bd init may emit "embedded Dolt requires CGO" — this is harmless; the bootstrap still succeeds.
    echo "Bootstrapping task database (fresh clone or corrupted DB)..."
    pkill -9 -f dolt 2>/dev/null || true
    rm -rf .beads/dolt/.dolt .beads/dolt/.doltcfg
    # Note: "embedded Dolt requires CGO" in the output below is expected and harmless.
    bd init --force --prefix developer-docs || true
    # Restart server after init (init does not leave the server running)
    pkill -9 -f dolt 2>/dev/null || true
    DOLT_OUT=$(bd dolt start 2>&1) || true
    echo "$DOLT_OUT"
    DOLT_PORT=$(echo "$DOLT_OUT" | grep -oE 'port [0-9]+' | grep -oE '[0-9]+$')
    [ -n "$DOLT_PORT" ] && printf '%s\n' "$DOLT_PORT" > .beads/dolt-server.port
    bd dolt pull
    ok "Task database bootstrapped and synced"
  fi

  # Verify the database is actually accessible
  if $has_bd; then
    if bd list --limit 1 --json >/dev/null 2>&1; then
      ok "Dolt server running and database accessible"
    else
      fail "Dolt server started but database is not accessible — re-run ./scripts/setup.sh to retry"
      errors=$((errors + 1))
    fi
  fi
fi

# ---------------------------------------------------------------------------
# 4. Build check (skipped when --skip-build is passed)
# ---------------------------------------------------------------------------
if $SKIP_BUILD; then
  printf "\n== Build check (skipped) ==\n"
else
  printf "\n== Build check ==\n"
  if npm run build --silent 2>/dev/null; then
    ok "Site builds successfully"
  else
    fail "Build failed — run 'npm run build' to see errors"
    errors=$((errors + 1))
  fi
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
printf "\n"
if [ $errors -eq 0 ]; then
  ok "All set. Run 'bd ready' to see available tasks."
else
  warn "$errors issue(s) found — see above."
  if ! $has_bd || ! $has_dolt; then
    echo ""
    echo "Beads/Dolt are optional but required for task coordination."
    echo "Without them you can still write docs — check .docs-plan/migration-plan.md for tasks."
  fi
fi

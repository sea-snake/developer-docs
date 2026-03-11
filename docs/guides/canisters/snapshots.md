---
title: "Canister Snapshots"
description: "Create, restore, and manage canister snapshots for backup and recovery"
sidebar:
  order: 5
doc_type: how-to
level: intermediate
icskills: []
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Create and manage canister snapshots for backup and recovery. Cover creating snapshots via icp-cli and programmatically via the management canister, listing available snapshots, restoring from a snapshot, deleting old snapshots, and downloading snapshot data. Explain use cases: pre-upgrade safety net, disaster recovery, state debugging.

<!-- Source Material -->
- Portal: building-apps/canister-management/snapshots.mdx
- icp-cli: guides/canister-snapshots.md
- Examples: canister-snapshots (Rust), canister-snapshot-download (Rust)

<!-- Cross-Links -->
- guides/canisters/lifecycle -- snapshots during upgrade workflow
- guides/security/canister-upgrades -- snapshot-based rollback
- icp-cli docs: https://dfinity.github.io/icp-cli/

---
title: "Data Persistence"
description: "Store and retrieve data in canisters using stable structures, persistent actors, and upgrade hooks"
sidebar:
  order: 1
doc_type: how-to
level: intermediate
features: [orthogonal-persistence, stable-memory]
icskills: [stable-memory]
last_verified: 2026-03-11
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Guide developers through storing data in canisters. Cover stable structures (StableBTreeMap in Rust), persistent actors (Motoko), MemoryManager for multiple data structures, and pre/post-upgrade hooks. Include idempotency patterns for safe data mutation. Show code examples for both Rust and Motoko.

<!-- Source Material -->
- Portal: building-apps/canister-management/storage.mdx, best-practices/storage.mdx, best-practices/idempotency.mdx
- icskills: stable-memory
- Examples: daily_planner (both), superheroes (Motoko), photo_gallery (Rust)
- Rust CDK: https://docs.rs/ic-cdk/latest/ic_cdk/

<!-- Cross-Links -->
- concepts/orthogonal-persistence -- conceptual background
- guides/canisters/lifecycle -- upgrade hooks
- languages/rust/stable-structures -- Rust-specific deep dive
- languages/motoko/ -- Motoko persistence patterns

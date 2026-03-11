---
title: "Testing Strategies"
description: "Test canisters with unit tests, PocketIC integration tests, and benchmarking"
sidebar:
  order: 1
doc_type: how-to
level: intermediate
features: [testing]
icskills: []
last_verified: 2026-03-11
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Overview of testing approaches for ICP canisters. Cover unit testing (mocking ic-cdk), integration testing with PocketIC, performance benchmarking, and Docker-based test networks. Make a strong case for why testing matters on ICP: upgrades can be irreversible, cycles cost real money. Show the testing pyramid and recommend PocketIC as the primary approach.

<!-- Source Material -->
- Portal: building-apps/advanced/benchmarking.mdx
- icp-cli: guides/containerized-networks.md
- JS SDK: pic-js (https://js.icp.build/pic-js)
- Examples: unit_testable_rust_canister (Rust)

<!-- Cross-Links -->
- guides/testing/pocket-ic -- primary testing tool
- guides/canisters/logs -- debugging with logs
- guides/canisters/lifecycle -- testing before upgrades

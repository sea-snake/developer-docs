---
title: "Inter-Canister Calls"
description: "Call functions on other canisters using canister discovery and the IC messaging system"
sidebar:
  order: 1
doc_type: how-to
level: intermediate
icskills: [multi-canister]
---

TODO: Write content for this page.

<!-- Content Brief -->
Call functions on other canisters from your canister code. Cover canister discovery (env vars, ic_env cookie), update vs query calls, error handling (reject codes, trap handling), calling third-party canisters, and the pub/sub pattern. Show Rust (ic_cdk::call) and Motoko (async message sends) patterns. Explain the 2MB response limit.

<!-- Source Material -->
- Portal: building-apps/integrations/advanced-calls.mdx, advanced/using-third-party-canisters.mdx, developer-tools/cdks/rust/intercanister.mdx
- icp-cli: concepts/canister-discovery.md
- icskills: multi-canister
- Examples: inter-canister-calls (Rust), pub-sub (Motoko), composite_query (both)

<!-- Cross-Links -->
- concepts/canisters -- messaging model
- guides/inter-canister/candid -- interface definitions
- guides/backends/parallel-calls -- concurrent calls
- guides/security/inter-canister-calls -- async safety

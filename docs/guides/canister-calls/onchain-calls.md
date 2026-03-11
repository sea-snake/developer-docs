---
title: "Onchain Calls"
description: "Call functions on other canisters from your canister code"
sidebar:
  order: 3
icskills: [multi-canister]
---

TODO: Write content for this page.

<!-- Content Brief -->
Call functions on other canisters from your canister code. Start with the query vs update decision: queries are fast (~200ms), free, and run on a single node but aren't replicated (caller must trust the node); updates go through consensus (~2s), cost cycles, and modify state reliably. Explain when to use each and the trust tradeoffs. Cover canister discovery (env vars, ic_env cookie), error handling (reject codes, trap handling), calling third-party canisters, and the pub/sub pattern. Show Rust (ic_cdk::call) and Motoko (async message sends) patterns for both query and update calls. Explain the 2MB response limit. Link to parallel-calls for composite queries (the advanced query pattern) and to certified-variables for making query responses verifiable.

<!-- Source Material -->
- Portal: building-apps/integrations/advanced-calls.mdx, advanced/using-third-party-canisters.mdx, developer-tools/cdks/rust/intercanister.mdx
- icp-cli: concepts/canister-discovery.md
- icskills: multi-canister
- Examples: inter-canister-calls (Rust), pub-sub (Motoko), composite_query (both)

<!-- Cross-Links -->
- concepts/canisters -- messaging model
- guides/canister-calls/candid -- interface definitions
- guides/canister-calls/parallel-calls -- concurrent calls and composite queries
- guides/backends/certified-variables -- making query responses verifiable
- guides/security/inter-canister-calls -- async safety

---
title: "Canisters"
description: "Smart contracts that run WebAssembly, hold state, serve HTTP, and pay for their own compute"
sidebar:
  order: 3
icskills: []
---

TODO: Write content for this page.

<!-- Content Brief -->
Explain what canisters are and how they work. Cover the Wasm execution model, message types (update calls, query calls, composite queries), the memory model (heap + stable memory), canister IDs and principals, and the lifecycle (create, install, upgrade, delete). Explain how canisters differ from smart contracts on other chains: they serve HTTP, hold GBs of state, and pay for their own execution.

<!-- Source Material -->
- Portal: building-apps/essentials/canisters.mdx, message-execution.mdx
- Learn Hub: [Canister Smart Contracts](https://learn.internetcomputer.org/hc/en-us/articles/34210839162004), [What is a Principal?](https://learn.internetcomputer.org/hc/en-us/articles/34250491785108), [Computational Model](https://learn.internetcomputer.org/hc/en-us/articles/34573860369172), [Execution Layer](https://learn.internetcomputer.org/hc/en-us/articles/34208985618836)

<!-- Cross-Links -->
- concepts/app-architecture -- canisters in context
- concepts/reverse-gas-model -- how canisters pay
- guides/canisters/lifecycle -- practical lifecycle management
- reference/management-canister -- canister management API

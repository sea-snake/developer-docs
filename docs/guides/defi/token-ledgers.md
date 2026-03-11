---
title: "Token Ledgers"
description: "Transfer ICP and ICRC-1/ICRC-2 tokens from canisters and frontends"
sidebar:
  order: 1
doc_type: how-to
level: intermediate
features: [icrc-1, icrc-2, token-ledgers]
icskills: [icrc-ledger]
last_verified: 2026-03-11
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Interact with token ledgers from canisters and frontends. Cover ICP ledger transfers, ICRC-1 fungible token transfers, ICRC-2 approve/transferFrom pattern, fee handling, subaccount management, and setting up a local test ledger. Show code for both Rust and Motoko canister-side, and JS using @icp-sdk/canisters. Open with a "building DeFi on ICP" overview that maps common patterns.

<!-- Source Material -->
- Portal: defi/tokens/ (multiple files on token standards, transfers, ledger setup)
- icskills: icrc-ledger
- JS SDK: @icp-sdk/canisters (https://js.icp.build/canisters)
- Examples: icp_transfer (both), token_transfer (both), token_transfer_from (both), icrc2-swap (Motoko), receiving-icp (Rust), ic-pos (Motoko), nft-creator (Motoko), tokenmania (both)
- Learn Hub: [How Token Ledgers Work](https://learn.internetcomputer.org/hc/en-us/articles/44969820125972)

<!-- Cross-Links -->
- reference/token-standards -- ICRC standard specifications
- guides/defi/chain-key-tokens -- ckBTC/ckETH ledger interaction
- guides/inter-canister/calls -- ledger calls are inter-canister calls

---
title: "On-Chain Randomness"
description: "How ICP generates unpredictable random numbers using threshold VRF"
sidebar:
  order: 7
doc_type: explanation
level: intermediate
icskills: []
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Explain how ICP generates cryptographically secure random numbers on-chain. Cover why randomness is hard on blockchains (deterministic execution), the VRF (Verifiable Random Function) approach used by ICP, security guarantees (no node can predict or bias the output), and developer-facing constraints (randomness only available in update calls, not queries).

<!-- Source Material -->
- Portal: building-apps/integrations/randomness.mdx (conceptual parts)
- Learn Hub: https://learn.internetcomputer.org (VRF implementation)

<!-- Cross-Links -->
- guides/backends/randomness -- practical how-to
- concepts/security -- randomness in the security model
- reference/management-canister -- raw_rand API

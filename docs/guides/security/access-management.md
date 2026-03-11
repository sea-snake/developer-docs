---
title: "Access Management"
description: "Control who can call your canister with guards, caller checks, and controller management"
sidebar:
  order: 1
icskills: [canister-security]
---

TODO: Write content for this page.

<!-- Content Brief -->
Control who can call your canister functions. Cover controller-only functions, caller principal checking, anonymous principal rejection, Rust guards pattern, role-based access control, and the who_am_i pattern for debugging identity. Include inline code examples (~10 lines) for basic caller checking in both Rust and Motoko. Written as a checklist, not an essay.

<!-- Source Material -->
- Portal: building-apps/best-practices/general.mdx (access control sections)
- icskills: canister-security
- Examples: guards (Rust), who_am_i (both, inline ~10 lines)

<!-- Cross-Links -->
- concepts/security -- security model background
- guides/canisters/settings -- controller configuration
- guides/security/dos-prevention -- rate limiting as access control

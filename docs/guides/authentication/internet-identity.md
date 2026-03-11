---
title: "Internet Identity"
description: "Integrate passkey-based authentication with Internet Identity"
sidebar:
  order: 1
doc_type: how-to
level: intermediate
features: [internet-identity]
icskills: [internet-identity]
last_verified: 2026-03-11
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Integrate Internet Identity (II) for passkey-based user authentication. Cover frontend setup with @icp-sdk/auth (AuthClient), delegation handling, principal-per-app isolation, and alternative origins configuration. Include Unity native app integration via deep links. Explain the delegation chain and session management.

<!-- Source Material -->
- Portal: building-apps/authentication/overview.mdx, integrate-internet-identity.mdx, alternative-origins.mdx
- icskills: internet-identity
- JS SDK: @icp-sdk/auth (https://js.icp.build/auth)
- Examples: internet_identity_integration (Motoko), encrypted-notes-dapp-vetkd (both), native-apps/unity_ii_* (3 variants)

<!-- Cross-Links -->
- concepts/security -- identity and trust
- guides/frontends/frameworks -- framework-specific auth setup
- guides/authentication/wallet-integration -- alternative to II
- reference/internet-identity-spec -- protocol details

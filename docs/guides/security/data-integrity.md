---
title: "Data Integrity"
description: "Protect data with VetKeys encryption, certified variables, and signature verification"
sidebar:
  order: 3
doc_type: how-to
level: advanced
features: [vetkeys, data-integrity, security]
icskills: [canister-security, vetkd, certified-variables]
last_verified: 2026-03-11
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Protect data confidentiality and integrity in canisters. Cover VetKeys for on-chain encryption (encrypt data so only authorized users can decrypt), identity-based encryption (IBE) patterns, X.509 certificate handling, signature verification for external data, and certified variable patterns for data authenticity. Include the encrypted-notes example as a real-world reference.

<!-- Source Material -->
- Portal: building-apps/authentication/independently-verifying-ic-signatures.mdx
- icskills: canister-security, vetkd, certified-variables
- Examples: vetkd (both), vetkeys (both), encrypted-notes-dapp-vetkd (both), x509 (Rust), filevault (Motoko)

<!-- Cross-Links -->
- concepts/vetkeys -- VetKeys conceptual background
- concepts/security -- security model
- guides/backends/certified-variables -- certified data implementation

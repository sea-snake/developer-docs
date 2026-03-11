---
title: "Asset Canister"
description: "Deploy and serve frontend assets from an ICP canister"
sidebar:
  order: 1
icskills: [asset-canister]
---

TODO: Write content for this page.

<!-- Content Brief -->
Deploy frontend assets to ICP using the @dfinity/asset-canister recipe. Cover build configuration in icp.yaml, SPA routing, programmatic uploads via the JS SDK (@icp-sdk/canisters), and the static-website template for frontend-only projects. Explain how canister discovery (ic_env cookie, PUBLIC_*_CANISTER_ID env vars) connects frontend to backend.

<!-- Source Material -->
- Portal: building-apps/frontends/using-an-asset-canister.mdx, uploading-serving-assets.mdx
- icp-cli: concepts/canister-discovery.md, guides/local-development.md
- icskills: asset-canister
- Recipe: @dfinity/asset-canister
- Templates: static-website, hello-world (frontend portion)
- JS SDK: @icp-sdk/canisters (https://js.icp.build/canisters)
- Examples: hosting/static-website, hosting/photo-storage, hosting/my_crypto_blog

<!-- Cross-Links -->
- getting-started/project-structure -- recipe config
- guides/frontends/custom-domains -- point a domain to your frontend
- guides/frontends/certification -- verify responses
- guides/frontends/frameworks -- React, Svelte, Vue integration

---
title: "HTTPS Outcalls"
description: "Make HTTP requests from canisters to external web APIs"
sidebar:
  order: 2
doc_type: how-to
level: intermediate
icskills: [https-outcalls]
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Show how to make HTTP GET and POST requests from canisters. Cover transform functions for consensus on responses, cycle costs for outcalls, response size limits, and idempotency requirements. Include inline code examples (~20 lines) for a basic GET request in both Rust and Motoko. Link to the exchange-rates example for a complete real-world use case.

<!-- Source Material -->
- Portal: building-apps/integrations/https-outcalls/ (5 files: overview, GET, POST, technology, costs)
- icskills: https-outcalls
- Examples: send_http_get (both, inline ~20 lines), send_http_post (both, link), exchange-rates (Rust, link)

<!-- Cross-Links -->
- concepts/https-outcalls -- how outcalls achieve consensus
- guides/chain-fusion/ethereum -- EVM RPC uses HTTPS outcalls under the hood
- reference/cycles-costs -- outcall pricing

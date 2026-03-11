---
title: "Timers"
description: "Schedule one-shot and periodic tasks in your canister"
sidebar:
  order: 3
doc_type: how-to
level: intermediate
features: [timers]
icskills: []
last_verified: 2026-03-11
source_repo: null
source_ref: null
---

TODO: Write content for this page.

<!-- Content Brief -->
Set up one-shot and periodic timers in canisters. Cover the timer API for both Rust (ic_cdk_timers) and Motoko (Timer module). Explain migration from heartbeats to timers. Common patterns: periodic cleanup, scheduled data aggregation, timed state transitions. Include cycle cost implications.

<!-- Source Material -->
- Portal: building-apps/integrations/periodic-tasks.mdx
- Examples: periodic_tasks (Rust)
- Rust CDK: https://docs.rs/ic-cdk/latest/ic_cdk/ (timers module)

<!-- Cross-Links -->
- concepts/timers -- how the global timer mechanism works
- guides/canisters/lifecycle -- timer setup during canister init
- reference/cycles-costs -- timer execution costs

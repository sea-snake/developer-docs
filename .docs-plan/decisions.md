# Design Decisions Log

Append new decisions at the bottom. Never modify existing entries.

---

## 2026-03-11: Diataxis framework with 5 top-level sections
**Context:** Need a clear information architecture for the new developer docs
**Decision:** Use Diataxis with 5 sections: Getting Started (tutorials), Guides (how-to), Concepts (explanations), Languages (synced + hand-written), Reference (information)
**Rationale:** Diataxis is proven, maps cleanly to developer intent ("how do I" vs "what is" vs "exact params"). Languages gets its own section due to volume (52+ synced Motoko pages).
**Alternatives considered:** 10-section structure (too many groups), single guides section (too flat), capabilities as top-level (not a Diataxis quadrant)

## 2026-03-11: No separate capabilities section
**Context:** IC capabilities (chain-key, VetKeys, HTTPS outcalls, timers, randomness) are the platform's biggest differentiators
**Decision:** Keep capabilities in concepts/ (explanation) with companion how-to guides in guides/backends/ (task-oriented)
**Rationale:** A "capabilities" section is marketing-oriented, not Diataxis-aligned. Developers find content by intent: "what is chain-key" → concepts/, "how to make HTTPS outcalls" → guides/backends/
**Alternatives considered:** Top-level capabilities section (violates Diataxis), capabilities under guides only (loses explanatory depth)

## 2026-03-11: New guides/backends/ section
**Context:** Biggest gap in existing docs — no task-oriented guides for ICP backend patterns
**Decision:** Create guides/backends/ with pages for: data-persistence, https-outcalls, timers, randomness, certified-variables, large-wasm, parallel-calls
**Rationale:** Every canister developer needs these. Currently only concept explanations exist, not "how to do it" guides with code.
**Alternatives considered:** Put under guides/canister-management/ (too crowded, mixing management with development patterns)

## 2026-03-11: New guides/canister-management/ section
**Context:** No home for "going to mainnet" topics like subnet selection, cycles management, canister discovery
**Decision:** Create guides/canister-management/ for topics that bridge local development to production deployment
**Rationale:** These don't fit under canisters/ (which is about management) or tools/ (which is about CLI). They're about production readiness.
**Alternatives considered:** Under guides/canister-management/ (conflates management with deployment), separate "deployment" section (too narrow)

## 2026-03-11: Clean slate approach
**Context:** Existing 124 pages were written for v3.1 structure which we're reconsidering
**Decision:** Wipe src/content/docs/ and create uniform stubs for ALL pages. Remove CI workflows. Keep minimal Astro infrastructure.
**Rationale:** Uniform stubs are better than a mix of full content (possibly misaligned) and empty pages. Previous work preserved on `restructuring-attempt-1` branch.
**Alternatives considered:** Keep existing content + add stubs for new pages only (inconsistent, may not align with new structure)

## 2026-03-11: .docs-plan/ as coordination directory
**Context:** Need durable artifacts that future agents can discover and use
**Decision:** All analysis, decisions, and progress tracking in `.docs-plan/` (committed to repo, not gitignored)
**Rationale:** Files in the repo survive across clones, CI, and agent sessions. Hidden directory keeps it out of the docs site.
**Alternatives considered:** .analysis/ (less descriptive), planning/ (visible, clutters root), .meta/ (too generic)

## 2026-03-11: AGENTS.md as canonical agent policy
**Context:** AGENTS.md was just a stub alias to CLAUDE.md
**Decision:** AGENTS.md becomes the canonical cross-agent instruction file with explicit Always/Ask first/Never boundaries. CLAUDE.md remains primary for Claude Code (auto-loaded).
**Rationale:** Per agents.md spec, AGENTS.md should be substantive for all agent platforms (Codex, Cursor, etc.), not just Claude.
**Alternatives considered:** Keep CLAUDE.md as sole source (excludes non-Claude agents)

## 2026-03-11: Code examples — inline vs link to examples repo
**Context:** Need a consistent strategy for code in docs
**Decision:** Inline code for snippets under ~30 lines. Link to dfinity/examples repo for anything larger.
**Rationale:** Short snippets aid reading flow. Long examples are better maintained in a dedicated repo with tests.
**Alternatives considered:** Always inline (maintenance burden), always link (poor reading experience)

## 2026-03-11: icp-cli content — link, don't duplicate
**Context:** icp-cli has its own comprehensive docs at dfinity.github.io/icp-cli/
**Decision:** Link to icp-cli docs. Inline icp-cli commands in guides where they aid reading flow. Don't duplicate guides.
**Rationale:** Single source of truth. The migration guide is the only exception (synced).
**Alternatives considered:** Sync more content (maintenance burden), duplicate quickstart (violates single-source principle)

## 2026-03-11: Remove DOCS_RESTRUCTURING_PROPOSAL.md
**Context:** v3.1 proposal has stale paths and structure that doesn't match the new analysis
**Decision:** Remove from restructuring-attempt-2 branch. .docs-plan/synthesis.md is the new source of truth.
**Rationale:** Having two competing "truth" documents confuses agents. Original preserved on restructuring-attempt-1.
**Alternatives considered:** Update in place (synthesis.md is more detailed and structured for agent consumption)

## 2026-03-11: CLAUDE.md symlinks to AGENTS.md
**Context:** Having both CLAUDE.md and AGENTS.md with overlapping but different content creates maintenance risk and confusion
**Decision:** Consolidate all agent/contributor instructions into AGENTS.md. CLAUDE.md is a symlink (`CLAUDE.md → AGENTS.md`).
**Rationale:** Single source of truth. AGENTS.md is the cross-agent standard (works for Claude, Codex, Cursor, etc.). The symlink ensures Claude Code auto-loads the same content. If the file grows too large, create referenced sub-files rather than splitting the primary instruction file.
**Alternatives considered:** Keep both files in sync (drift risk), AGENTS.md symlinks to CLAUDE.md (AGENTS.md is the more universal name)

## 2026-03-11: docs/ is the canonical content directory
**Context:** Astro/Starlight expects content at `src/content/docs/`, but `docs/` at root is the natural location for documentation
**Decision:** Real files live in `docs/` (project root). `src/content/docs/` is a symlink pointing to `../../docs`. All agent instructions and documentation reference `docs/` as the canonical path.
**Rationale:** `docs/` is shorter, more discoverable, and the standard convention. Astro follows the symlink transparently — builds work unchanged. Agents and contributors use `docs/` exclusively; the symlink is an implementation detail.
**Alternatives considered:** Keep files in `src/content/docs/` with symlink the other way (forces agents to use long paths), no symlink (agents must always navigate three levels deep)

## 2026-03-11: Clean up stale CODEOWNERS, package.json, CONTRIBUTING.md
**Context:** After restructuring, several files referenced old paths or deleted scripts
**Decision:** Updated CODEOWNERS paths to new structure, removed 10 broken scripts from package.json (validate, generate, sync), fixed stale references in CONTRIBUTING.md.
**Rationale:** Stale references confuse both agents and CI. Scripts will be restored from `restructuring-attempt-1` when docs are production-ready.
**Alternatives considered:** Leave as-is with TODO comments (agents would try to run broken commands)

## 2026-03-11: Motoko sidebar pre-configured, no stubs for synced content
**Context:** Motoko docs (~60 files across fundamentals/, icp-features/, reference/) are synced from `caffeinelabs/motoko` via a sync script on `restructuring-attempt-1`
**Decision:** Keep the sidebar config with `autogenerate` directives for the three Motoko subdirectories. Do not create stub files — they would be overwritten by the sync. Only the hand-written `index.md` (overview) exists as a stub.
**Rationale:** `autogenerate` picks up files automatically once the sync runs. The sync script flattens nested dirs, injects frontmatter, and rewrites links. Creating 60 stubs adds no value and creates merge noise.
**Alternatives considered:** Create stubs for all 60 pages (would be overwritten), wait to configure sidebar until sync is restored (risks forgetting the structure)

## 2026-03-11: Remove `features` frontmatter field
**Context:** Every stub had a `features` array with free-form kebab-case tags (~50 unique values across 79 pages). Nothing consumed this field.
**Decision:** Remove `features` from the frontmatter schema and all stub pages.
**Rationale:** Directory structure already serves as taxonomy, `icskills` covers AI agent discovery, and cross-links cover related pages. For llms.txt generation, page titles + descriptions + directory paths are sufficient. No prominent developer docs site uses feature tags for taxonomy — they organize by intent (which Diataxis already handles). Re-add when a concrete consumer exists.
**Alternatives considered:** Keep as-is (aspirational metadata), standardize with a canonical list (maintenance burden without a consumer)

## 2026-03-11: Remove `last_verified` frontmatter field
**Context:** Every stub had `last_verified: 2026-03-11`. No verification process existed.
**Decision:** Remove `last_verified` from the frontmatter schema and all stub pages.
**Rationale:** The date is meaningless on stub pages with no real content. Maintaining it adds overhead with no payoff — there's no periodic verification workflow. Re-add when a verification process is established.
**Alternatives considered:** Keep as required (establishes habit but meaningless on stubs), make optional (still no process to enforce it)

## 2026-03-11: Remove `source_repo` and `source_ref` frontmatter fields
**Context:** Every stub had `source_repo: null` and `source_ref: null`. Only 2 pages (Motoko index, migrating-from-dfx) would ever use non-null values.
**Decision:** Remove both fields from the frontmatter schema and all stub pages. Synced content protection is enforced by path-based rules in AGENTS.md ("Never edit synced files") and CONTRIBUTING.md ("Synced content" section) — not by frontmatter metadata.
**Rationale:** Having `source_repo: null` on 77 non-synced pages is noise. The sync script can inject a comment (`<!-- Synced from repo — do not edit -->`) if file-level marking is needed. Path-based rules are the actual enforcement mechanism.
**Alternatives considered:** Keep on synced pages only (still redundant with path rules), keep as optional (agents would still see null values in schema examples)

## 2026-03-11: Remove `doc_type` and `level` frontmatter fields
**Context:** Every stub had `doc_type` (tutorial/how-to/reference/explanation) and `level` (beginner/intermediate/advanced). Neither field had a consumer.
**Decision:** Remove both fields from the frontmatter schema and all stub pages. Directory structure already implies Diataxis type: `getting-started/` = tutorial, `guides/` = how-to, `concepts/` = explanation, `reference/` = reference. Page content conveys difficulty level.
**Rationale:** Same principle as previous removals — no consumer means no value. The Diataxis directory structure IS the type classification. Maintaining redundant metadata on 79 pages adds noise. Re-add if a filtering UI, badge display, or llms.txt grouping requires it.
**Alternatives considered:** Keep doc_type only (still redundant with directories), keep level for future filtering (no filtering UI planned)

## 2026-03-11: Image/asset strategy — `src/assets/images/` with section-based organization
**Context:** Portal has hand-drawn diagrams (canister internals, app architecture, create/install flows) worth carrying over. No image strategy existed for the new docs.
**Decision:** Images live in `src/assets/images/`, organized by docs section (concepts/, guides/canister-management/, etc.). Carry over portal images case-by-case during content writing — not bulk-imported upfront. Keep the existing hand-drawn visual style for consistency. Use descriptive kebab-case filenames.
**Rationale:** `src/assets/` enables Astro image optimization (Sharp). Section-based organization mirrors the docs structure. Case-by-case approach avoids importing images for pages that may not need them or may need different visuals.
**Alternatives considered:** `public/images/` (no optimization), co-located images next to .md files (clutters docs/), bulk import all portal images (wasteful, many won't be used)

## 2026-03-11: Use relative paths with `.md` extension for internal links
**Context:** Landing page links like `/getting-started/quickstart/` worked on the Astro site but broke on GitHub (files live at `docs/getting-started/quickstart.md`).
**Decision:** All internal links must use relative paths with `.md` extension (e.g., `[Quickstart](getting-started/quickstart.md)`). Never use absolute URL paths.
**Rationale:** Relative paths with `.md` work on GitHub natively. A remark plugin (`plugins/remark-strip-md-extension.mjs`) strips `.md` extensions at build time for Astro/Starlight. This ensures docs are readable and navigable wherever they're viewed — no pre-build scripts or temp directories needed.
**Alternatives considered:** Absolute paths (break on GitHub), paths without extension (break on GitHub), pre-build sed script like icp-cli repo (fragile, adds build complexity)

## 2026-03-11: Motoko core library is the standard; base is legacy
**Context:** The Motoko `core` library (`mops.one/core`) supersedes the `base` library (`mops.one/base`). A migration guide exists in the Motoko repo (`doc/md/12-base-core-migration.md`) and is synced to the docs site.
**Decision:** Always recommend `core` over `base` in all docs. Link to `mops.one/core/docs` as the standard library reference. Do not link to `mops.one/base/docs` as an equal alternative. The base→core migration guide is synced from `caffeinelabs/motoko` and should not be edited directly.
**Rationale:** `core` is the actively developed standard library with AI-friendly design, consistent naming, and stable memory support. `base` is legacy. Docs should guide developers to the current standard.
**Alternatives considered:** List both as equal options (confusing, encourages continued use of legacy library)

## 2026-03-11: Add encryption and verifiable credentials guides
**Context:** Portal crawl revealed 9 VetKeys pages and 4 Verifiable Credentials pages with no proper home in the 79-page plan. VetKeys how-to content was crammed into `concepts/vetkeys.md` (an explanation page). VC content was split as "partial" across internet-identity.md and concepts/security.md.
**Decision:** Add `guides/security/encryption.md` (VetKeys how-to: encrypted storage, DKMS, IBE, timelock) and `guides/authentication/verifiable-credentials.md` (VC issuer/relying party patterns). Both P1, Sprint 6. Also update `guides/canister-management/large-wasm.md` stub to cover SIMD as a section, and `guides/defi/token-ledgers.md` stub to cover ICRC-7/NFTs as a section. Total pages: 79 → 81.
**Rationale:** Encryption guide placed in security/ because the developer intent is "how do I handle privacy/encryption on ICP" — VetKeys is the answer, spanning backend and frontend. VC guide placed in authentication/ because VCs are an authentication/identity pattern built on Internet Identity. SIMD and NFTs don't warrant dedicated pages but need explicit coverage in existing stubs.
**Alternatives considered:** VetKeys under guides/backends/ (undersells frontend/identity aspects), VCs folded into internet-identity.md (distinct enough for own page), dedicated SIMD page (too niche), dedicated NFT page (can be a section in token-ledgers)

## 2026-03-11: Reorder guides sidebar and concepts to follow developer journey
**Context:** Guides sidebar had arbitrary ordering (Backends first, Canisters at #6, Inter-Canister at #2). Concepts had VetKeys at #5 before basic topics like persistence (#10) and reverse gas model (#9).
**Decision:** Reorder guides sidebar to: Canisters → Backends → Inter-Canister → Frontends → Authentication → Testing → Security → Production → Chain Fusion → DeFi → Governance → Tools. Reorder concepts to: network-overview → app-architecture → canisters → reverse-gas-model → orthogonal-persistence → https-outcalls → onchain-randomness → timers → chain-key-cryptography → chain-fusion → vetkeys → security → governance. Reference section unchanged.
**Rationale:** Guides follow the developer journey: build → connect → present → secure → ship → extend. Concepts follow: fundamentals (1-5) → capabilities (6-8) → cryptography & cross-chain (9-11) → governance & security (12-13). Reference pages are browsed by name, not sequentially — order matters less.
**Alternatives considered:** Keep alphabetical (no narrative flow), group by sprint priority (confusing for readers)

## 2026-03-11: Move agentic-development from getting-started/ to guides/tools/
**Context:** `getting-started/agentic-development.md` was bundling icskills setup + LLM chatbot example. Getting-started should be a fast 3-page onboarding flow. Agentic development is a tooling choice, not a prerequisite.
**Decision:** Move `getting-started/agentic-development.md` → `guides/tools/agentic-development.md`. Getting-started becomes: quickstart → project-structure → what-next. The agentic development page focuses on icskills setup and AI agent configuration, referencing LLM chatbot examples from `dfinity/examples` as a demo rather than a walkthrough. `what-next.md` links to it as a "power up your workflow" option.
**Rationale:** Getting-started should be lean and zero-decision. AI-assisted development is a workflow enhancement that belongs with other tooling guides. The page's primary audience (developers who already know they want AI-assisted development) will find it in guides/tools/.
**Alternatives considered:** Keep in getting-started (adds friction to onboarding), split into two pages (overcomplicates), defer entirely (loses valuable content)

## 2026-03-11: Code examples — prefer linking to dfinity/examples
**Context:** Many guide pages need code examples in both Rust and Motoko. Inline examples are harder to maintain and can't be tested.
**Decision:** Avoid inline code when possible — link to `dfinity/examples` repo. Only include inline examples (both Rust + Motoko) when the `technical-documentation` skill determines they are essential for the page to be useful (e.g., short patterns that lose context when linked externally).
**Rationale:** Examples repo has CI, tests, and versioning. Inline code rots. Linking keeps docs focused on explanation and workflow.
**Alternatives considered:** Always inline both languages (maintenance burden, doubles code), Rust-only with Motoko links (inconsistent)

## 2026-03-11: Content writing pacing — batch per sprint
**Context:** Need a review strategy for 81 pages of content.
**Decision:** Write all pages in a sprint as a batch, then review together. After each sprint, do a cross-reference verification pass: verify all internal links resolve, anchors exist, and cross-links are bidirectional.
**Rationale:** Batching allows cross-referencing between pages in the same sprint. Per-page review is too slow. Post-sprint verification catches broken links early.
**Alternatives considered:** One page at a time with review (too slow), no verification pass (broken links accumulate)

## 2026-03-11: Add onchain AI guide in guides/backends/
**Context:** The LLM canister (`w36hm-eqaaa-aaaal-qr76a-cai`) is an onchain service for calling large language models from canister code. Previously, the llm_chatbot examples were referenced in the agentic-development page, but they don't belong there — agentic-development is about developer tooling (icskills), while the LLM canister is a backend capability.
**Decision:** Create `guides/backends/onchain-ai.md` for the LLM canister guide. Remove llm_chatbot references from `guides/tools/agentic-development.md`. The LLM canister is a backend pattern (like HTTPS outcalls or timers) — you call it from canister code using `ic-llm` (Rust) or `llm` (Motoko). P1, Sprint 5. Total pages: 81 → 82.
**Rationale:** Developer intent is "how do I use AI from my canister" → `guides/backends/`. It's analogous to HTTPS outcalls but for decentralized inference. Separating it from agentic-development keeps both pages focused: tools page = developer workflow, backends page = canister capabilities.
**Alternatives considered:** Under guides/tools/ (not a developer tool, it's a canister API), as a section in https-outcalls (different enough for own page — no HTTP, no API keys, different API)

## 2026-03-11: Use "onchain" not "on-chain"
**Context:** Inconsistent usage of "on-chain" vs "onchain" across docs stubs and planning artifacts.
**Decision:** Always use "onchain" (no hyphen) in all docs content. Normalized all existing occurrences in `docs/`. Planning artifacts in `.docs-plan/` left as-is (not published).
**Rationale:** Consistent terminology. "Onchain" is the prevailing convention in ICP ecosystem.
**Alternatives considered:** "on-chain" (hyphenated, less common in ICP context)

## 2026-03-11: Rename LLM canister guide to "Onchain AI"
**Context:** `guides/backends/llm-canister.md` sounded like a reference page, not a how-to guide.
**Decision:** Rename to `guides/backends/onchain-ai.md` with title "Onchain AI". The guide covers the developer task ("how do I add AI to my canister"). The LLM canister ID and API details belong in `reference/application-canisters.md` as a reference entry.
**Rationale:** Guide names should reflect developer intent, not infrastructure names. "Onchain AI" matches the search query a developer would have.
**Alternatives considered:** "LLM Integration" (less evocative), "AI from Canisters" (awkward)

## 2026-03-11: Section index pages for all top-level sections
**Context:** Landing page linked to arbitrary first pages within sections (e.g., Guides → `guides/backends/data-persistence.md`, Reference → `reference/management-canister.md`). No index pages existed for guides/, concepts/, languages/, or reference/.
**Decision:** Create `index.md` for all four sections: `guides/index.md`, `concepts/index.md`, `languages/index.md`, `reference/index.md`. Each provides a curated overview of the section with links to all subsections/pages. `concepts/` and `reference/` index pages use `sidebar.order: 0` to appear first in autogenerated sidebars. `guides/` and `languages/` index pages use `sidebar.hidden: true` since those sections use manually configured sidebar items. Landing page links updated to point to these index pages.
**Rationale:** Proper entry points for every section — both on the website and on GitHub (which renders `index.md` as directory landing pages). Developers browsing the repo on GitHub see a curated overview instead of a raw file listing. Consistent pattern across all sections. Total pages: 82 → 86.
**Alternatives considered:** Link Guides to `getting-started/what-next.md` (wrong section, pathfinder not overview), keep arbitrary first-page links (confusing, no context), create index pages only for concepts/reference (inconsistent)

## 2026-03-11: Rename guides/canisters/ → guides/canister-management/ and reorder to position 6
**Context:** "Canisters" as a subsection name was ambiguous alongside "Backends" — developers couldn't tell whether "write canister code" belonged in Canisters or Backends. It was also placed first in the sidebar despite containing operational/management tasks (lifecycle, settings, snapshots) that belong to Stages 5-7 of the developer journey, not Stage 3 (backend development).
**Decision:** Rename `guides/canisters/` to `guides/canister-management/` and move from sidebar position 1 to position 6 (after Testing, before Security). New sidebar order: Backends → Inter-Canister → Frontends → Authentication → Testing → Canister Management → Security → Production → Chain Fusion → DeFi → Governance → Tools.
**Rationale:** "Canister Management" clearly signals operational tasks (configure, upgrade, optimize) vs. "Backends" (write canister logic). Position 6 matches the developer journey: build (1-4) → test (5) → configure & ship (6-8) → extend (9-11) → tools (12). The developer journey analysis already recommended this exact change.
**Alternatives considered:** Keep name with sidebar reorder only (still ambiguous), merge into Production (too many pages), split across Backends and Production (loses cohesion)

## 2026-03-11: Content writing before infrastructure restoration
**Context:** P0 infrastructure tasks (validation scripts, sync scripts) are pending alongside P0 content.
**Decision:** Start content writing before restoring validation/sync scripts. Infra is not blocking content work.
**Rationale:** Validation scripts catch issues but don't prevent writing. Content is the primary deliverable. Scripts will be restored when capacity allows.
**Alternatives considered:** Infra first (delays content), in parallel (splits focus)

## 2026-03-11: Dissolve guides/production/ into guides/canister-management/
**Context:** `guides/production/` had only 3 pages (cycles-management, subnet-selection, canister-discovery). "Canister Discovery" was about metadata configuration — a canister setting, not a production concern. The other two pages (cycles, subnets) are tightly coupled with canister lifecycle and deployment. With 12 sidebar subsections already being a lot to scan, a 3-page subsection didn't justify its own group.
**Decision:** Move all 3 production pages into `guides/canister-management/`. Remove `guides/production/` entirely. Sidebar subsections reduced from 12 to 11. Canister Management becomes the comprehensive operational section (9 pages): lifecycle → settings → logs → optimization → snapshots → reproducible-builds → cycles-management → subnet-selection → canister-discovery.
**Rationale:** All 3 pages are canister operational tasks — funding, deploying to a subnet, and configuring metadata. They share the same developer intent ("manage my canister") as lifecycle, settings, and snapshots. Consolidation reduces sidebar noise and creates a single go-to section for all canister operations.
**Alternatives considered:** Keep Production as standalone (too thin at 3 pages), merge only canister-discovery (still leaves a 2-page orphan), merge into a new "Deployment" section (just renaming the same problem)

## 2026-03-11: Rename guides/inter-canister/ → guides/canister-calls/, broaden scope
**Context:** "Inter-Canister" implied only canister-to-canister communication, but the section already covered Candid interfaces and binding generation — both equally relevant for off-chain callers (frontends, scripts, agents). "Parallel Calls" was misplaced in backends/ since it's fundamentally an inter-canister calling pattern. "Large Wasm Modules" was misplaced in backends/ since it's a deployment/operational concern, not a coding pattern.
**Decision:** (1) Rename section to "Canister Calls" (`guides/canister-calls/`). (2) Rename `calls.md` → `onchain-calls.md` (title: "Onchain Calls"). (3) Create new `offchain-calls.md` for frontend/agent-to-canister call patterns. (4) Move `parallel-calls.md` from backends/ to canister-calls/. (5) Move `large-wasm.md` from backends/ to canister-management/. (6) Reorder: candid (1) → binding-generation (2) → onchain-calls (3) → offchain-calls (4) → parallel-calls (5). Sidebar stays at 11 subsections. Total pages: 81 → 82.
**Rationale:** "Canister Calls" follows the noun-based naming pattern (like "HTTPS Outcalls") and encompasses both directions — calling into canisters from anywhere. Candid-first ordering reflects the foundation: understand the interface → generate bindings → use them. Large Wasm is operationally adjacent to optimization (reduce size) and lifecycle (deploy with chunk store). Parallel calls depend on onchain-calls as their foundation.
**Alternatives considered:** "Canister Communication" (too vague), "Calling Canisters" (action-oriented, inconsistent with other titles), keep inter-canister and add separate off-chain section (adds a 12th subsection)

## 2026-03-11: Rename subnet-types.md → subnet-selection.md
**Context:** `guides/canister-management/subnet-types.md` had title "Subnet Types" which described what exists rather than the developer task. Other guide titles are noun-based and task-oriented (e.g., "Data Persistence", "Cycles Management").
**Decision:** Rename to `subnet-selection.md` with title "Subnet Selection". Updated all cross-references across docs and planning artifacts.
**Rationale:** "Subnet Selection" matches the developer intent — "which subnet should I deploy to?" — and follows the noun-based naming pattern of other guide titles. "Subnet Types" and "Subnet Choice" were considered but "Selection" best conveys the active decision.
**Alternatives considered:** "Subnet Types" (descriptive, not task-oriented), "Subnet Choice" (informal)

## 2026-03-11: Remove canister-discovery.md — content absorbed by existing pages
**Context:** `guides/canister-management/canister-discovery.md` covered canister metadata, ICRC-1 token listing, and IC dashboard APIs. All canisters are automatically visible on the dashboard. Metadata is a canister setting. ICRC-1 compliance is covered in token-ledgers.md. Dashboard APIs are reference material covered by the ic-dashboard icskill.
**Decision:** Delete `canister-discovery.md`. Add metadata (name, description, git commit) to the `canister-management/settings.md` content brief. Total pages: 82 → 81.
**Rationale:** No standalone developer task warranted its own page. The content brief was a combination of things already covered elsewhere. Removing it keeps the docs focused and avoids a page with no clear developer intent.
**Alternatives considered:** Keep as a thin page (adds maintenance burden for low value), merge entirely into settings (metadata is the only actionable part)

## 2026-03-11: Hide section index pages from sidebar for Guides, Concepts, and Reference
**Context:** Sections with `autogenerate` sidebars rendered their `index.md` as a nav entry with the same label as the parent group — e.g., "Concepts > Concepts", "Reference > Reference".
**Decision:** Set `sidebar.hidden: true` on index pages for Guides (already done), Concepts, and Reference. The pages still exist for GitHub directory landing pages and direct links from the landing page — they just don't appear in the sidebar navigation.
**Rationale:** Avoids redundant "Section > Section" entries. These index pages serve GitHub browsing and as entry points from the landing page, not as sidebar navigation items.
**Alternatives considered:** Rename to "Overview" (still an extra click in nav with no unique content), delete index pages (loses GitHub directory landing pages)

## 2026-03-11: Languages overview page visible in sidebar, expanded with community CDKs
**Context:** Languages section only listed Rust and Motoko (official CDKs). Community CDKs (Azle, Kybra, icpp-pro, moonbit-ic-cdk) had no home. Unlike Concepts/Reference, the Languages index provides unique value — it's the only place listing all language options.
**Decision:** Keep Languages index visible in sidebar as "Overview" (`sidebar.order: 0`). Add explicit slug entry in `astro.config.mjs`. Expand content to list community CDKs: TypeScript (Azle), Python (Kybra), C++ (icpp-pro), MoonBit (moonbit-ic-cdk) in a table with repository links.
**Rationale:** Developers choosing a language need a single page comparing all options. This page serves that purpose — unlike the Concepts/Reference indexes which just list their children. Community CDKs are important for adoption even though we don't write dedicated docs for them.
**Alternatives considered:** Separate "Community CDKs" page (too thin), list in each language's section (scattered, hard to compare)

## 2026-03-11: CI deployment to IC asset canister
**Context:** Docs needed automated deployment to the Internet Computer for live preview.
**Decision:** Deploy to asset canister `2akpg-uqaaa-aaaal-qv5ha-cai` on every push to `main` via GitHub Actions + icp-cli. Custom domain: `beta-docs.internetcomputer.org`. Asset canister configured with `.ic-assets.json5` (no raw access, standard security headers, immutable caching for hashed `_astro/` assets). Canister ID stored in `.icp/data/mappings/ic.ids.json` (committed). Deployer identity imported from `DFX_IDENTITY_DESIGN_TEAM` secret in `IC mainnet` GitHub environment.
**Rationale:** Matches the pattern used by icskills repo. icp-cli is the standard deployment tool. Raw access disabled for security (all responses cryptographically verified). Hashed assets cached immutably, HTML pages revalidated on every request.
**Alternatives considered:** Deploy via dfx (deprecated), manual deployment (error-prone, not repeatable)

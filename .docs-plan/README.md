# ICP Developer Docs — Planning Artifacts

This directory contains all analysis, design decisions, and progress tracking for the ICP developer documentation restructuring.

## I'm an agent. What do I do?

1. **Read `AGENTS.md`** (project root) — rules, boundaries, content guidelines
2. **Read `decisions.md`** — understand past structural decisions before proposing new ones
3. **Find your next task:**
   - Run `bd dolt pull` to sync task state
   - Run `bd ready` to see tasks with no unresolved blockers
   - Follow the priority order in `AGENTS.md` → "Multi-agent workflow"
4. **Get execution details:**
   - For content pages: read the stub file itself (has content brief, source material, cross-links in HTML comments), then check `migration-plan.md` for dependencies, effort estimate, and skills needed
   - For infrastructure tasks: check `migration-plan.md` for details
5. **Do the work** following `AGENTS.md` rules (especially the "Content authoring workflow" section)
6. **Update Beads** — `bd update <id> --status draft --notes "PR #X" && bd dolt push`
7. **Record decisions in `decisions.md`** if you made any structural choices

## Files

### Living documents (check these every session)

| File | What it answers |
|------|-----------------|
| `decisions.md` | "Has this been decided already?" — append-only decision log |
| `migration-plan.md` | "How do I execute this task?" — dependencies, source material, effort, skills per page |

> **Task state** is tracked in [Beads](https://github.com/steveyegge/beads) (`bd ready`), not in a file. See `AGENTS.md` → "Multi-agent workflow".

### Agent workflow references

| File | What it answers |
|------|-----------------|
| `content-authoring.md` | "How do I write a page?" — full content workflow, content rules, linking rules, external docs |
| `review-guidelines.md` | "How do I review a PR?" — mechanical checks, content quality checks, post format |

### Research artifacts (read when writing specific pages)

| File | What it answers |
|------|-----------------|
| `synthesis.md` | "Why is the structure this way?" — full structure proposal with rationale |
| `portal-deep-dive.md` | "What portal content maps to this page?" — triage of 346 portal files |
| `learn-hub-inventory.md` | "Which Learn Hub articles should I link to?" — 86 articles mapped to pages |
| `jssdk-skills-mapping.md` | "Which icskills and JS SDK docs are relevant?" — 17 skills + 5 SDK projects |
| `icp-cli-examples-inventory.md` | "Which CLI docs, recipes, templates, examples to reference?" — full ecosystem |
| `developer-journey.md` | "How does this page fit the developer journey?" — Zero-to-Production stages |

## Source repos analyzed

These repos were analyzed during the research phase. All source repos are pinned as git submodules under `.sources/` — see `AGENTS.md` → "Source material repos" for the mapping and rules.

| Repo | GitHub | Path within repo | What |
|------|--------|-------------------|------|
| Portal (old) | `dfinity/portal` | `docs/` | 346 docs files to triage |
| icp-cli docs | `dfinity/icp-cli` | `docs/` | 33 CLI doc files |
| icp-cli-recipes | `dfinity/icp-cli-recipes` | `/` | 4 build recipes |
| icp-cli-templates | `dfinity/icp-cli-templates` | `/` | 6 project templates |
| icskills | `dfinity/icskills` | `/` | 17 agent skills |
| JS SDK docs | `dfinity/icp-js-sdk-docs` | `/` | 5 JS library docs |
| Examples | `dfinity/examples` | `/` | 97 code examples |
| Learn Hub | — | https://learn.internetcomputer.org | Concept explanations (Zendesk API) |

## Previous work

Branch `restructuring-attempt-1` contains the previous restructuring attempt with:
- Full Astro+Starlight infrastructure
- 124 docs pages (52 Motoko synced + 70 hand-written)
- CI workflows, sync scripts, validation scripts
- `DOCS_RESTRUCTURING_PROPOSAL.md` (v3.1)

The current `main` branch starts fresh with stubs, informed by the analysis.

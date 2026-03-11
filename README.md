# ICP Developer Docs

> **Work in progress.** This is a complete rewrite of the ICP developer documentation. All pages are currently stubs with content briefs — actual content is being written following the plan in `.docs-plan/`. The existing production docs live at [internetcomputer.org/docs](https://internetcomputer.org/docs) (source: [dfinity/portal](https://github.com/dfinity/portal)).

Developer documentation for the [Internet Computer](https://internetcomputer.org), built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Quick start

```bash
npm install
npm run dev      # Dev server at localhost:4321
npm run build    # Production build
```

## Project layout

```
docs/                   # All documentation (.md only)
├── getting-started/    # Tutorials
├── guides/             # How-to guides
├── concepts/           # Explanations
├── languages/          # Motoko (synced) + Rust
└── reference/          # Specs and reference
.docs-plan/             # Planning artifacts and progress tracking
AGENTS.md               # Agent and contributor instructions
CONTRIBUTING.md         # Contribution guidelines
```

Documentation lives in `docs/` at the project root. Astro reads it via a symlink at `src/content/docs/`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for content format, frontmatter schema, and review ownership.

## For AI agents

See [AGENTS.md](AGENTS.md) for the full workflow: orientation, rules, content authoring, and planning artifacts. `CLAUDE.md` symlinks to `AGENTS.md`.

## Related resources

| Resource | URL |
|----------|-----|
| icp-cli docs | https://dfinity.github.io/icp-cli/ |
| JS SDK docs | https://js.icp.build |
| icskills | https://skills.internetcomputer.org |
| Learn Hub | https://learn.internetcomputer.org |
| Motoko libraries | https://mops.one/core/docs |
| Rust CDK API | https://docs.rs/ic-cdk/latest/ic_cdk/ |

## License

See [LICENSE](LICENSE).

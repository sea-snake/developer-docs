---
name: icp-brand-design
description: "ICP / DFINITY visual design system: tokens, color, typography, layout, components, motion, iconography, and accessibility for surfaces under the DFINITY or Internet Computer (ICP) mark. Pairs with icp-brand-voice (positioning, voice, vocabulary). Use when building or reviewing the visual side of products (NNS, ICP.app, Internet Identity, dashboards), the main website, developer docs, marketing material, or internal tools. Enforces the Anthropic-inspired visual system from skills.internetcomputer.org: Newsreader 500 serif headings, parchment palette, terracotta accent, light mode default, dark mode opt-in. Triggers: ICP design, DFINITY design, ICP visual style, brand tokens, is this on brand visually, design review ICP, color palette, typography ICP, component library, NNS redesign. Products with their own brand identity (OISY, Caffeine, and future ecosystem products with their own visual systems) are out of scope."
license: MIT
metadata:
  version: '1.0'
  source: https://skills.internetcomputer.org
  author: Pierre Samaties
  pairs_with: icp-brand-voice
---

# ICP / DFINITY Brand Design

## When to Use This Skill

Load this skill when the user works on any **visual** surface under the DFINITY or Internet Computer mark. That includes:

- **Products**: NNS, ICP.app, Internet Identity, the IC dashboard, developer portals, explorers, internal tools
- **The main website**: internetcomputer.org and its subpages
- **Developer documentation**: docs pages, API references, tutorials, SDK sites
- **Marketing material**: landing pages, campaign pages, investor pages, press pages, decks
- **Reviews**: design reviews, brand checks, compliance audits, PR or mockup reviews

Also load when the user says "make this on brand visually", "ICP style", "DFINITY look", "brand tokens", "Anthropic-style but for ICP".

For **what to say** (positioning, voice, vocabulary), load `icp-brand-voice`. The two skills are designed to be used together.

Do NOT use this skill for:

- **OISY wallet.** Own product identity. Out of scope.
- **Caffeine.** Own brand. Out of scope.
- **Any other ecosystem product with its own established visual system.**
- Third-party dapps that happen to run on ICP but are not DFINITY products.

## North Star

Every DFINITY product should feel like it came from the same studio: quiet, editorial, confident. The reference implementation is [skills.internetcomputer.org](https://skills.internetcomputer.org).

Two non-negotiables:

1. **Light mode is the default.** Dark mode is opt-in per product via `data-theme="dark"` on the root. Never use `prefers-color-scheme` to auto-switch.
2. **One accent color per page.** Terracotta / ember only. No green, blue, or secondary brand colors.

## Instructions

### 1. Load the tokens

Use `assets/tokens.css` as the single source of truth for color, type, spacing, and radii. Ship it untouched, or mirror the same values into your framework config.

```html
<link rel="stylesheet" href="/tokens.css">
```

Never redefine the accent, background, or text colors with hex values in product code. Always reference the CSS custom properties (`var(--icp-bg)`, `var(--icp-fg)`, `var(--icp-accent)`, etc.).

### 2. Color

**Light (default)**

| Role          | Token              | Hex       | Notes                                      |
| ------------- | ------------------ | --------- | ------------------------------------------ |
| Page bg       | `--icp-bg`         | `#f8f5ef` | parchment, never pure white                |
| Elevated bg   | `--icp-bg-elev`    | `#fdfaf3` | cards, code headers, inputs                |
| Text          | `--icp-fg`         | `#1a1714` | ink, never pure black                      |
| Muted text    | `--icp-muted`      | `#6b6660` | captions, meta                             |
| Rule          | `--icp-rule`       | `#e5ddcf` | 1px hairlines, dividers                    |
| Accent        | `--icp-accent`     | `#cc5a2b` | terracotta, the one and only brand color   |
| Accent dim    | `--icp-accent-dim` | `#f2d7c7` | blush, callout backgrounds                 |
| Code bg       | `--icp-code-bg`    | `#efe8da` | sand                                       |

**Dark (opt-in)**

| Role          | Hex       | Notes                                  |
| ------------- | --------- | -------------------------------------- |
| Page bg       | `#14110d` | deep bark, never pure black            |
| Elevated bg   | `#1b1812` | bark                                   |
| Text          | `#f0ebe0` | bone                                   |
| Muted         | `#a29a8d` | ash                                    |
| Rule          | `#2d2820` | soil                                   |
| Accent        | `#ff7a4d` | ember (warmer for dark surfaces)       |
| Accent dim    | `#3a2218` | hearth                                 |

**Rules**

- One accent color per page. Terracotta / ember only. No green, blue, or secondary brand colors.
- No gradients on brand surfaces. Flat color.
- No pure `#000` text and no pure `#fff` backgrounds.
- Hairlines are 1px in `--icp-rule`. No heavy borders.

### 3. Typography

- **Serif (headings):** Newsreader, 500 weight, letter-spacing `-0.01em` to `-0.015em` for h1/h2. Fallback stack: `"Newsreader", "Source Serif 4", "EB Garamond", ui-serif, Georgia, serif`.
- **Sans (body, UI, labels):** Inter. Fallback: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
- **Mono (code):** system monospace stack.
- Body line-height `1.6`–`1.75`. Headings `1.15`–`1.25`.
- Headings in serif italic only for emphasis words inside an otherwise roman heading (see hero pattern on skills.internetcomputer.org).

### 4. Layout and spacing

- Container max width: `68rem` (~1088px).
- Prose max width: `48rem` (~768px). Never run body text wider.
- Horizontal gutter: `1.75rem` (28px).
- Generous vertical rhythm. Sections separated by 1px hairlines in `--icp-rule`, not boxes.

### 5. Radii

- Inline code: `3px`
- Buttons, pre blocks, meta cards: `6px`
- Search bars, callout right-hand side: `8px`
- No pills, no fully rounded shapes anywhere except circular avatars.

### 6. Iconography and imagery

- Line icons, 1.5px stroke, rounded joins. No filled or duotone icons in product chrome.
- Photography is rare. When used, warm-toned, documentary, no stock illustrations.
- No 3D renders, no isometric illustrations, no crypto iconography.

### 7. Motion

- Default transition: `0.15s ease` on `background`, `color`, and `border-color`.
- No bounce, no slide-ins on load. Respect `prefers-reduced-motion`.

### 8. Components (mirror the reference)

Use the component patterns from the brand guide directly. Never invent a new primary button, card, or callout without a review. Key patterns:

- **Primary CTA**: terracotta fill, white text, `6px` radius, sans-serif, no shadow.
- **Secondary CTA**: transparent with 1px rule border, fg text.
- **Eyebrow label**: uppercase, `0.06em` letter-spacing, muted color, small caps feel.
- **Callout**: blush (`--icp-accent-dim`) left stripe on cream card.
- **Meta card**: cream bg, 1px rule, serif title, sans body.
- **List row**: 1px bottom hairline, serif label, muted right-hand value.
- **Code block**: sand background, mono, no syntax colors beyond fg + muted.
- **Trust banner**: row of monochrome logos, no boxes.

### 9. Accessibility

- WCAG AA contrast minimum. The palette is designed to pass; verify on every surface.
- Real `<button>` and `<a>` elements. No div-buttons. Keyboard navigable.
- Focus rings must be visible: 2px `--icp-accent` outline with `2px` offset.
- Never convey meaning by color alone.
- Every product ships a visible skip-link to main content.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` for respect, not auto-switching.
- Alt text is specific, not decorative: describe what matters, skip "image of".

### 10. Design review checklist

Before merging any ICP / DFINITY visual change, confirm:

- [ ] Uses `tokens.css` variables, no hardcoded brand hex values
- [ ] Light mode is default. Dark mode only via explicit `data-theme="dark"`
- [ ] Newsreader for headings, Inter for body, system mono for code
- [ ] One accent color on the page (terracotta / ember only)
- [ ] Body prose capped at `48rem`
- [ ] 1px hairlines in `--icp-rule`, no heavy borders
- [ ] Focus states visible, AA contrast verified
- [ ] No emoji, no stock illustration, no 3D render
- [ ] No gradients, no pills, no drop shadows

If any box is unchecked, the work is not on brand.

### 11. When in doubt

Defer to [skills.internetcomputer.org](https://skills.internetcomputer.org) as the living reference. If the reference and this skill disagree, the reference wins and this skill should be updated.

## Resources

- **Canonical brand guide**: the deployed HTML guideline page (shareable URL in the conversation)
- **Tokens file**: `assets/tokens.css` in this skill. Drop into any product as the single source of truth.
- **Reference site**: [skills.internetcomputer.org](https://skills.internetcomputer.org)
- **Paired skill**: `icp-brand-voice` for positioning, voice, and vocabulary.
- **Out of scope**: products with their own brand identity (OISY wallet, Caffeine, and any future ecosystem product that ships under its own visual and verbal system).

## Examples

**Example 1. Reviewing a mockup**

User: "Here's a mockup for the new NNS proposal detail page. Does it fit our brand visually?"

Response: Walk the design review checklist. Flag hardcoded `#ffffff` background and any green CTAs, recommend swapping to `var(--icp-bg)` and terracotta, confirm serif h1 and 1px hairlines are correct.

**Example 2. New developer tool**

User: "I'm shipping a new IC explorer dashboard. Give me the starter styles."

Response: Hand over `tokens.css`, Inter + Newsreader font links, the primary / secondary CTA CSS, the meta card pattern, and a reminder that light mode is the default. Point to `icp-brand-voice` for headline and copy decisions.

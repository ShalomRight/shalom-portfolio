# CLAUDE.md — Shalom Sutherland Portfolio

This file gives Claude full context on the portfolio project. Read this before doing anything else.

---

## Who Is Shalom Sutherland

**Shalom Sutherland** is a multidisciplinary designer based in Kingstown, Saint Vincent and the Grenadines. He works across:

- **Brand identity** — logos, visual systems, print collateral
- **Motion graphics** — After Effects, DaVinci Resolve, Cinema 4D, AI-assisted generation
- **UI/UX** — app design, interactive web, front-end (HTML, CSS, JS, React)
- **Web design** — interactive pieces, component builds

Contact: shalom.sutherland@gmail.com

---

## What This Project Is

A personal portfolio website. The goal is to present Shalom's freelance and independent work in a way that feels premium, kinetic, and specific — not generic designer-portfolio AI aesthetic.

---

## Brand Voice (Apply to All Written Output)

- **Precise, not wordy.** Every sentence earns its place.
- **Confident, not arrogant.** State facts. Don't hedge.
- **Kinetic.** Short sentences hit. Longer ones carry context.
- **No buzzwords.** "Innovative," "seamless," "cutting-edge" are banned.
- **Lead with the work, not the process.**
- **No passive voice** unless it serves the sentence.

Taglines must be under 12 words and feel like a headline, not a sentence. Descriptions max 4 sentences for standard, no padding in case study copy.

---

## Visual Direction (Starting Point)

- **Dark-mode first.** Deep warm-dark background, not pure black.
- **One accent colour** doing all the heavy lifting. Not red, not purple.
- **Typography:** Refined serif display + clean grotesque body. E.g. Editorial New + Suisse Int'l, or Cormorant Garamond + DM Sans.
- **Logo:** Signature/script treatment of "Shalom Sutherland." High contrast thick-to-thin strokes. Scales to "SS" monogram.

---

## Site Architecture — Three Page Types

### 1. Project Pages (`/work/[slug]`)
Individual case studies with their own URL. Two depth levels:
- `standard` — tagline, description, tools, gallery, outcome. No process breakdown.
- `deep` — full case study: brief, ordered process phases, gallery, metrics, outcome.
- `BrandingProject` — extends `deep` with a `brandSystem` block (colours, type, logo variants, deliverables).

### 2. Gallery Pages (no individual routes)
Scrollable grid pages. Items open in a lightbox — brief description + secondary images. No sub-pages.
- `/logos` — logo work across clients
- `/social-kits` — social media content and carousel kits
- `/motion` — motion graphics archive

### 3. About Page (`/about`)
Static. Work history + small gallery. Not typed in the data layer.
Contains: Discovery Works Legal (2006–08), Right Stuff (2008–09), Island Koncepts Television (2009–11), Skye Investment (2019–22).
**None of this goes in `portfolio-data.ts`.**

---

## Key Files

| File | Purpose |
|---|---|
| `portfolio-types.ts` | All TypeScript interfaces and types |
| `portfolio-data.ts` | The actual portfolio content — owner, projects, galleries |
| `brand-tone.md` | Voice guide and visual direction |
| `rant-clear-system-prompt.md` | System prompt for turning project brain-dumps into structured entries |

---

## Routing Reference

```
/                  → Home / featured projects
/work              → All project pages (grid)
/work/[slug]       → Individual project page (standard | deep)
/logos             → Gallery — logos
/social-kits       → Gallery — social media kits
/motion            → Gallery — motion archive
/about             → Work history + small gallery
```

---

## Current Projects — Status

### Project Pages (`portfolio.projects[]`)

| # | ID | Title | Level | Status |
|---|---|---|---|---|
| 1 | proj-001 | Paradise (Kimya Glasgow) | deep | ✅ Written — confirm year + duration |
| 2 | proj-002 | Kimya Glasgow — Sustainability | standard | ✅ Written — confirm if one-off or ongoing |
| 3 | proj-003 | Botanical — Product Visuals | standard | ✅ Written — confirm metrics |
| 4 | proj-004 | The Reef — Brand Identity | deep/branding | ✅ Written — confirm year + colour palette |
| 5 | proj-005 | Lots of Lobster | standard | ✅ Written — confirm first edition year |
| 6 | proj-006 | Mutiny on the Reef | deep | ✅ Written — confirm first edition year |
| 7 | proj-007 | LuxCare | deep | ⏳ Needs rant-clear |
| 8 | proj-008 | Superbook | deep | ⏳ Needs rant-clear |
| 9 | proj-009 | Island Troves | standard | ⏳ Needs rant-clear |
| 10 | proj-010 | Carryvan | deep | ⏳ Needs rant-clear |

### Gallery Pages (`portfolio.galleries{}`)

| Gallery | Items Seeded | Status |
|---|---|---|
| logos | The Reef, Lots of Lobster, Jubilee | Jubilee needs rant-clear. Add more logos. |
| social-kits | Kimya sustainability, Botanical | Add more kits as produced. |
| motion | Paradise titles, Mutiny logo, Lobster promo | Add more clips as gathered. |

---

## Key Decisions Made (Don't Re-Debate These)

- **Resume/work history does NOT go in the portfolio.** It lives only on the About page.
- **Logos do NOT get individual project pages.** They live in the Logo gallery only, with a `projectSlug` link back to a full brand project where one exists.
- **Social kits and motion clips are gallery items**, not project pages.
- **`BriefProject` type was removed** — the old concept is now handled by `GalleryItem`, which is cleaner.
- **`logoShowcase` was replaced by `galleries`** — a `Partial<Record<GalleryPageType, GalleryPage>>` that handles logos, social kits, and motion equally.
- The **Lots of Lobster event** is correctly named "Lots of Lobster" — not "Bequia Lobster Fest."

---

## Rant-Clear System

To add or flesh out a project, use the `rant-clear-system-prompt.md` as the system prompt and brain-dump at the project. The system will:
1. Classify the detail level (brief skips — use GalleryItem instead)
2. Extract and map all fields
3. Ask max 4 targeted follow-up questions if critical fields are missing
4. Output written copy + a valid TypeScript object

**Critical fields still PENDING on confirmed projects:**
- `proj-001` Paradise — `year`, `duration`
- `proj-002` Kimya Sustainability — `duration` (one-off or ongoing?)
- `proj-003` Botanical — `duration`, metrics
- `proj-004` The Reef Brand — `year`, colour palette, full deliverables list
- `proj-005` Lots of Lobster — `year` (first edition)
- `proj-006` Mutiny — `year` (first edition, assumed 2022)
- `logo-jubilee` — industry, description

---

## Tools Shalom Uses

| Category | Tools |
|---|---|
| Motion / Video | Adobe After Effects, DaVinci Resolve, Final Cut Pro |
| 3D | Cinema 4D |
| Design | Adobe Illustrator, Figma |
| Front-end | HTML, CSS, JavaScript, React |
| AI | AI image generation tools (used in Mutiny 2026 campaign, Botanical) |

---

## Clients / Projects Reference

| Client | Project(s) | Notes |
|---|---|---|
| Kimya Glasgow Inc. | Paradise launch, Sustainability campaign | SVG luxury fashion brand. First fragrance: Vanilla Orchid. Second: Paradise. |
| The Reef | Brand identity, Lots of Lobster, Mutiny | Restaurant, Lower Bay, Bequia, SVG. Run by Cassie Simmons. |
| Botanical | Product visuals + social | Natural oils, small-batch. Phone photos → Cinema 4D → AI render pipeline. |
| Personal products | LuxCare, Superbook, Carryvan | Apps built by Shalom. All need rant-clear. |
| Island Troves | Web app | Client project. Needs rant-clear. |

---

## What NOT to Do

- Do not add work history roles (Right Stuff, IKTV, etc.) to `portfolio.projects[]`
- Do not create individual pages for logos — they are `GalleryItem` entries only
- Do not use the words "innovative," "seamless," or "cutting-edge" anywhere
- Do not write passive voice in project descriptions unless it's intentional
- Do not invent metrics or outcomes Shalom hasn't confirmed
- Do not fabricate client details, dates, or names

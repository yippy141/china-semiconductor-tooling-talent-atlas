# 01 — PM decision brief

**Audience:** product manager (or PM AI). **Time to read:** 10 minutes.
**Outcome:** pick a track, answer the open questions, hand `04` to the
coding agent.

The critique in `00` identifies six hierarchy problems. They cluster into
three families of change. Each family can ship independently. Sequencing
matters; tracks are additive (Light → Medium → Full).

---

## The three families

### A — Visual register (typography + tokens)
The single highest-leverage change. Move the page from default sans on white
cards to an editorial serif on warm paper, with hairlines and one accent.

- Touches: `app/layout.tsx`, `app/globals.css`. **Two files.**
- Reflows the entire site automatically (brief, dossiers, segments, explorer).
- No data changes. No new components.
- Risk: any hard-coded font-weight or font-size in components becomes visible.
  In practice the codebase uses Tailwind utilities everywhere, so the risk is
  low.
- Time: **half a day** for an agent. **One day** with QA across all five
  routes (`/`, `/essay`, `/firms`, `/firms/[slug]`, `/explorer`).

### B — Hero recomposition
Single primary CTA, demoted secondaries, anchor-firms exhibit replaces the
*Core question* pull-out, beta caveat shrunk to a methodology line, masthead
strip added above.

- Touches: `app/page.tsx`, new `components/atlas/anchor-firms-exhibit.tsx`,
  new `components/atlas/atlas-masthead.tsx`.
- Reuses existing `firmWorkforceSnapshots` data — no new figures invented.
- Risk: the masthead duplicates nav already present on sub-pages; resolve by
  hoisting it to `app/layout.tsx` later, after PM signs off on its content.
- Time: **half a day**.

### C — Argument consolidation
Merge `<AnalystBriefRail/>` (4 cards) and the inline Findings grid (3 cards)
into one `<TheArgument/>` component. Promote `<ArticleStatStrip/>` to sit
inside it as a *source-base* band. Remove per-block eyebrows downstream.

- Touches: `app/page.tsx`, new `components/atlas/the-argument.tsx`. Leaves
  `AnalystBriefRail.tsx` and the Findings inline JSX intact but unimported, so
  the rollback is one revert.
- Reuses existing `homepageInsights` + `articleBrief.findings` data — copy
  picked by editorial decision below.
- Risk: this is the change a stakeholder might push back on, because it
  visibly removes content. Counter-argument: the content isn't removed, it's
  un-duplicated; the words live on, in the brief at `/essay`.
- Time: **half to one day**.

---

## Three tracks for the PM to choose

| Track | Includes | Ship time | Risk | When to pick |
| --- | --- | --- | --- | --- |
| **L · Light** | A only | ~1 day | Lowest | You want the page to *feel* serious before the next demo, but can't move IA yet. |
| **M · Medium** | A + B | ~2 days | Low | You can change the hero but politically not the body. Recommended default. |
| **F · Full**   | A + B + C | ~3–4 days | Medium | You have editorial sign-off to consolidate the two finding grids. Strongest result. |

**Recommendation: M.** It's the smallest change that addresses the four
most visible hierarchy problems (typography, hero scatter, hidden credibility
exhibit, caveat placement) and leaves the politically harder consolidation
for a follow-up. The argument-consolidation in F is the right answer; it just
benefits from a separate conversation with whoever wrote the existing copy.

If you have already aligned with the brief author, ship F.

---

## Trade-offs you should think about

### Serif by default vs. serif-headlines-only

Two flavors of family A exist.

- **A.1 — Serif everywhere.** Source Serif 4 for body and headlines, IBM Plex
  Sans for chrome and labels, IBM Plex Mono for IDs and figures. The Economist
  register. Strongest "publication" signal.
- **A.2 — Serif headlines, sans body.** Source Serif 4 for headlines, Plex
  Sans for body and chrome. The FT/Bloomberg register. Easier to read at
  small sizes; reads as "serious tech magazine".

Both shapes are good. **v7 recommends A.1** because the artefact is closer to
*The Economist* (analytical brief, no live data, no charts updated in
real-time) than to *Bloomberg* (live data, fast scroll). A.1 also reads
better when printed, which the audience (consultants, policy advisors) may
actually do.

If readability at small body sizes is a concern, pick A.2. The token spec in
`03` carries both as named groups; switching is one variable change.

### One accent vs. accent-free

The mockup in the design critique uses a single editorial amber
(`#B07418`) for section markers and the highlighted node on the city map.
The alternative is pure black-and-paper with no accent.

- **One accent (amber):** matches the existing dark city-map's amber, gives a
  single restrained moment of color, signals the brand without becoming the
  brand.
- **No accent:** more McKinsey memo than Economist editorial. Lowest possible
  noise.

Either works. Default in `03` is one accent. To drop it, set
`--color-accent` to `--color-ink` and remove the four explicit `text-amber-*`
references in the new components.

### Anchor-firms exhibit: prose figures vs. tiny chart

The hero's right column carries four firms with one figure each. Two
renderings to choose from:

- **A — Bare list.** Firm name, one disclosed figure, denominator chip. Most
  restrained. Strongest credibility. The mockup in `Design Critique.html`
  uses this.
- **B — One sparkline-style bar each.** Tiny horizontal bar showing the
  disclosed figure as % of total staff where available (AMEC 52.24%, ACM
  49.42%, NAURA 30.86% R&D share). Visually richer; sits closer to
  data-journalism. The risk is that bar lengths invite cross-firm
  comparison, which the data does not support — three different denominators.

**Recommendation: A.** It keeps the page true to the editorial pledge in
`AGENTS.md` (*do not invent equivalences*). If you want a chart there later,
build it after the user has read the boundary condition on each dossier.

### Where the *Core question* pull-out goes

It is being removed from the hero. Two options for its content (which is
useful — the question is the product's mission statement):

- **A — Drop it.** The standfirst already paraphrases it.
- **B — Move it.** Reuse as a small block above the `<ComparatorFrame/>`,
  where it can frame *"What we're trying to read from filings."*
- **C — Move it to the brief.** Place at the head of `/essay` as the
  question the brief answers.

**Recommendation: C.** The question is editorial, not chrome. It belongs in
the article it asks.

---

## Open questions for the PM (please answer before handing to coder)

1. **Track choice.** L, M, or F? *(default: M)*
2. **Typeface flavor.** A.1 serif-throughout, or A.2 serif-headlines-only?
   *(default: A.1)*
3. **Accent.** Amber, or none? *(default: amber)*
4. **Anchor-firms exhibit format.** Bare list (A) or sparkline (B)?
   *(default: A)*
5. **What happens to the Core question pull-out.** Drop / move to comparator /
   move to brief? *(default: move to brief)*
6. **Issue number.** Is *“Issue 04 · May 24, 2026”* accurate, or should the
   masthead read *“Beta · May 2026”* without an issue counter? The dataset is
   versioned by `data/generated/manifest.json` — coder can read the date from
   there.
7. **Masthead nav items.** The current sub-pages are `/essay /firms /segments
   /explorer /sources /methodology`. Which four should appear in the top nav
   on every page? *(default: Brief · Firms · Segments · Explorer · Methodology)*
8. **What to call the home page.** *Atlas*, *Talent Atlas*, *Tooling Talent
   Atlas*? *(used in masthead and `<title>` tag.)*
9. **Body text language.** The brief at `/essay` uses long-form publication
   prose. The home today is closer to bullet voice. Should the new home lede
   (drop-cap paragraph) be the first ~90 words of `/essay`, or a fresh
   summary written for the home? *(default: lift the first paragraph of the
   brief verbatim — single source of truth, no drift.)*
10. **What ships with this pack vs. what waits.** Three things are flagged as
    "consider next" not "ship now": (a) reworking `<ToolmakerFootprintGrid/>`
    into a coverage-dot matrix, (b) adding a `print.css` for actual print
    output, (c) introducing the v7 register into the dossier and brief
    routes. Tell the coder explicitly if any of these belong in scope. *(default:
    none — keep this pack to the home.)*

---

## What this pack will NOT do

- Add a new tab, page, or route.
- Add a new dependency. (`next/font/google` is shipped with Next 16.)
- Touch any data file, CSV, or generated JSON.
- Introduce a capability score, ranking, or composite index. (Forbidden by
  `AGENTS.md`.)
- Add a chart that does not exist today.
- Add interactivity (hover tooltips, animations, transitions beyond
  Tailwind's `transition-colors`).
- Rewrite component internals beyond what the prompts in `04` describe.

→ When the PM has answered the ten questions, hand
[`04_coding_agent_prompts.md`](./04_coding_agent_prompts.md) to Claude Code or
Codex.

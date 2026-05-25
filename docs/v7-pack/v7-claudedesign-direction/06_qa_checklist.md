# 06 — QA checklist

Acceptance criteria for each prompt in `04`. Run after every commit; do not
ship a prompt that fails any check on its row.

## Universal (every prompt)

- [ ] `npm run lint` exits 0.
- [ ] `npm run build` exits 0.
- [ ] `npm run dev` and click through `/`, `/essay`, `/firms`,
      `/firms/amec`, `/explorer`, `/segments/deposition`, `/methodology`.
      Every page renders without hydration warnings in the browser console.
- [ ] No new dependency added to `package.json`.
- [ ] No file touched under `data/` (raw, generated, or editorial) unless
      the prompt explicitly says so.
- [ ] No new claim, figure, source ID, or attribution that is not already in
      the repository.
- [ ] No `Score`, `Ranking`, `Index`, `Top N`, or composite-metric language
      anywhere in changed files.
- [ ] No new ESLint suppressions (`// eslint-disable-...`).
- [ ] Diff is < 300 lines added/removed per prompt unless the prompt
      explicitly notes otherwise.

## Prompt 1 — design tokens + fonts

- [ ] `app/globals.css` contains exactly one `@theme inline` block.
- [ ] `app/layout.tsx` declares `Source_Serif_4`, `IBM_Plex_Sans`, and
      `IBM_Plex_Mono` from `next/font/google`.
- [ ] The three `.variable` classNames are concatenated onto `<html>`.
- [ ] Body computed `font-family` resolves to Source Serif 4 (DevTools
      → Computed → font-family).
- [ ] Body computed `background-color` is `rgb(243 239 231)` (paper).
- [ ] `text-ink`, `bg-paper`, `border-rule`, `border-rule-hair`,
      `text-muted`, `text-accent` all resolve to a non-default value in
      DevTools when applied to any test element.
- [ ] No FOUT longer than 200ms on a cold reload (visual check). If
      severe, add `display: "optional"` to the font calls.
- [ ] The dark sections (city map, source trail) still read as dark on
      reverse-out — no broken contrast.

## Prompt 2 — hero recomposition

- [ ] One primary CTA in the hero. Two secondary text links.
- [ ] No `Core question` block anywhere on the page.
- [ ] The beta footnote is ≤ 11px and tracked-uppercase.
- [ ] `AnchorFirmsExhibit` shows exactly four rows.
- [ ] Each row's figure carries a `source_checked` status, OR shows a
      visible *Not yet source-checked* caption.
- [ ] The figure values render with tabular numerals — they align
      vertically on the right edge.
- [ ] On mobile (`<sm`), the exhibit stacks beneath the actions, with a
      top hairline; columns are not cropped.
- [ ] The italic *chip-tooling* in the title renders in `text-accent-deep`.

## Prompt 3 — AtlasMasthead

- [ ] Masthead is present on every route (sticky, 44px tall, paper
      background, 1px bottom rule).
- [ ] Five nav links: Brief, Firms, Segments, Explorer, Methodology — in
      that order.
- [ ] Date string ends with the actual build date, not a placeholder.
- [ ] Nav links are hidden below `sm`, publication mark remains.
- [ ] The masthead does not push the hero content downward in an unwanted
      way — the hero title hangs from the same optical position as before
      (visual diff against the previous commit).

## Prompt 4 — TheArgument

- [ ] No `<AnalystBriefRail/>` rendered in the DOM at `/`.
- [ ] No standalone `<ArticleStatStrip/>` rendered in the DOM at `/`.
- [ ] No inline Findings card grid rendered in the DOM at `/`.
- [ ] Exactly one drop cap (the *M* leading the lede).
- [ ] Three findings, each with a mono `01/02/03` glyph in `text-accent`.
- [ ] Source-base band shows `43 / 143 / 4 / 4` and pulls from
      `lib/atlas-analytics.ts` (verify by changing one number in the
      source file and watching it propagate).
- [ ] All headings (`h2`, `h3`, `h4`) render in serif.
- [ ] No card backgrounds (`bg-white`, `bg-stone-200`, `bg-stone-100`
      grid trick) introduced — only hairlines.

## Prompt 5 — eyebrow strip

- [ ] No uppercase eyebrow precedes the `<h3>` inside any of the four
      exhibit components.
- [ ] Each exhibit's `<h3>` survives, in serif.
- [ ] Section numbers on `app/page.tsx` are sequential: 01, 02, 03, 04, 05.
- [ ] No orphaned imports.

## Prompt 6 — Geography standfirst

- [ ] One paragraph of body prose sits between the section `<h2>` and
      `<CitySignalMap/>`.
- [ ] The paragraph text matches `homepageInsights[city-records].finding`
      verbatim.
- [ ] The map inspector and node positions are unchanged.

## Prompt 7 — source-trail tightening

- [ ] Dark section background is `bg-reverse`, not `bg-stone-950`.
- [ ] Five next-click cards still render and link correctly.
- [ ] No per-card uppercase eyebrows remain.

---

## Visual regression (do once, after Track M or Track F completes)

Compare side-by-side against the snapshots in
`Design Critique.html` (the mockup shipped with this pack).

- [ ] Hero proportions roughly match Mockup A (left column ~2/3,
      exhibit ~1/3 on `lg`).
- [ ] The argument section reads as one continuous unit, not as three
      stacked grids.
- [ ] The page never shows a white-card-on-light-gray pattern (except
      inside the city map, where dark cards on a dark background read as
      data-viz UI).
- [ ] On a 13" laptop screen (≈1440 wide), the hero title sits on no more
      than two lines.
- [ ] On a 4K monitor, the article shell does not stretch beyond 1240px —
      it remains an article column.

## Accessibility

- [ ] All interactive elements remain reachable via keyboard (Tab order
      not regressed by the masthead).
- [ ] Contrast: `text-ink` on `bg-paper` ≥ 12:1. `text-muted` on
      `bg-paper` ≥ 4.5:1. (Run a contrast checker once after Prompt 1.)
- [ ] The accent amber is never used to encode meaning that isn't also
      conveyed in text. (No "amber = good" or "amber = source-checked".)
- [ ] All `<h1>`/`<h2>` order is preserved — no skipped levels.
- [ ] Image-free section dividers don't break screen-reader flow (the
      `§` glyph is wrapped in `aria-hidden` if it's purely decorative).

## Data-integrity

- [ ] Every number rendered on the home is traceable to a file under
      `data/editorial/` or `lib/`.
- [ ] No string of the form `"Score: ..."`, `"Rank #..."`, `"Top..."`.
- [ ] Source IDs are rendered in `font-mono` and unchanged from their
      values in `data/raw/sources.csv`.
- [ ] The `Not yet source-checked` caption appears wherever an exhibit
      figure is not `source_checked`. Audit before ship.

## Sub-page no-regression

After the home work ships, click through these and confirm nothing has
changed structurally — only typography and color:

- [ ] `/essay` — title still bold, body still serif-readable, sections
      still numbered.
- [ ] `/firms` — index grid intact, segment chips visible.
- [ ] `/firms/amec` — workforce snapshot intact, all `source_checked`
      badges visible, denominators legible.
- [ ] `/explorer` — table intact, source IDs still in mono.
- [ ] `/segments/deposition` — capability matrix intact.
- [ ] `/methodology` — text intact.
- [ ] `/sources` — table intact.

---

## Definition of done

- All seven prompts in `04` committed in sequence (or PM stopped earlier
  at L/M boundary).
- Every box in this checklist checked.
- `Design Critique.html` mockup walked visually against `/` on a 1440-wide
  laptop and shown to match within ~10% in proportion.
- One stakeholder (PM + one editorial reader) signs off on the
  `/` page in a 5-minute walkthrough.

→ Ship.

# 04 — Coding agent prompts

Use one prompt at a time in **Claude Code** or **Codex** inside VS Code.
Each prompt is self-contained: read the repo, change a small set of files,
report. After every prompt:

```bash
npm run lint
npm run build
```

Commit only after both pass. If something looks off in the browser
(`npm run dev`), fix in a follow-up prompt — do not pile changes into one
diff.

The prompts are **additive**. Stop after any prompt that ships a stable
release (Track L stops after Prompt 2; Track M after Prompt 4; Track F runs
all seven).

---

## Pre-flight (do once)

```text
Read the repository in this order before changing anything:
- AGENTS.md
- README.md
- docs/v7-design-direction/README.md
- docs/v7-design-direction/02_information_architecture.md
- docs/v7-design-direction/03_design_tokens_spec.md
- docs/v7-design-direction/05_copy_bank.md
- app/page.tsx
- app/layout.tsx
- app/globals.css
- components/atlas/article-stat-strip.tsx
- components/atlas/analyst-brief-rail.tsx
- data/editorial/article-brief.ts
- data/editorial/homepage-insights.ts
- data/editorial/firm-workforce-snapshots.ts

Do not change anything in this pass. Reply with:
- a one-sentence summary of what the home page renders today
- the four homepageInsights ids
- the four firm-workforce snapshot ids (in load order)
- the four numbers exported from lib/atlas-analytics.ts that ArticleStatStrip currently shows.

Then wait for the next prompt.
```

---

## Prompt 1 — design tokens + fonts  *(Track L)*

```text
Goal:
Switch the site from default sans on white to the v7 editorial register
(Source Serif 4 body + headlines, IBM Plex Sans chrome, IBM Plex Mono IDs,
warm-paper background, ink text, hairlines instead of card chrome).

Files to edit:
- app/layout.tsx
- app/globals.css

Files to NOT touch in this pass:
- anything under app/ except layout.tsx and globals.css
- any component
- any data file

Source of truth:
docs/v7-design-direction/03_design_tokens_spec.md

Action:

1. In app/layout.tsx, add three next/font/google imports:
   Source_Serif_4 -> --font-source-serif (weights 300,400,500,600,700)
   IBM_Plex_Sans  -> --font-plex-sans   (weights 400,500,600)
   IBM_Plex_Mono  -> --font-plex-mono   (weights 400,500)
   Apply all three `.variable` className strings to the <html> tag.
   Replace the body className with `min-h-full flex flex-col bg-paper text-ink`.

2. In app/globals.css, replace the existing :root and @theme block with the
   full replacement block from 03_design_tokens_spec.md. Add the
   .tabular-nums utility and the global body font assignment.

Rules:
- Do not add a tailwind.config.ts. Tailwind v4 is CSS-first.
- Do not add a npm dependency. next/font ships with Next 16.
- Do not edit any component yet — they will reflow against the new tokens.
- Do not introduce dark-mode behavior in this pass.

After changes:
- run `npm run lint` and `npm run build`
- report which files changed
- report the new exported color tokens (bg-paper, text-ink, etc.) so the next
  prompt can use them
- visually confirm: every existing page now renders in serif against a warm
  paper background. The default `<button>` and link styles will inherit
  serif — that is expected.
```

---

## Prompt 2 — hero recomposition  *(Track L → M boundary)*

```text
Goal:
Replace the home-page hero with the v7 layout: single primary CTA, demoted
secondary links, beta caveat shrunk to a methodology footnote, and a new
AnchorFirmsExhibit on the right replacing the existing `Core question`
aside.

Files to create:
- components/atlas/anchor-firms-exhibit.tsx

Files to edit:
- app/page.tsx (hero section only — first <section> in HomePage)

Files to NOT touch:
- the rest of app/page.tsx below the hero
- any other component
- any data file

Copy:
Use the exact strings from docs/v7-design-direction/05_copy_bank.md §1 (Hero).
Do not invent new copy.

Action:

1. Create components/atlas/anchor-firms-exhibit.tsx.
   It is a server component (no "use client"). It imports
   `firmWorkforceSnapshots` from data/editorial/firm-workforce-snapshots.ts.

   For each snapshot in order [amec, acm-research-shanghai, naura, piotech]:
     - Pick the first figure where sourceStatus === "source_checked".
     - If no figure is source_checked, pick figures[0].
     - Render a row with:
         left:  firm name (serif 14px semibold) + segment chip subtitle
                (sans 10px tracked uppercase, muted)
         right: figure.value (serif 22px tabular-nums) + figure.label
                (sans 9px tracked uppercase, muted)
   Rows are separated by a 1px dotted border-rule-hair line. No card.
   Above the rows: small caption "Exhibit 01 · Listed-firm disclosure" +
                   bold title "What the four anchors disclose.".
   Below the rows: an `<p>` footnote — the 'Categories are not interchangeable'
   note from the copy bank. Sans 10px muted.

2. In app/page.tsx, replace the existing hero <section> with the layout
   described in 02_information_architecture.md (§ Hero).
   Use only Tailwind classes and the new tokens (bg-paper, text-ink,
   border-rule, font-serif, font-sans, font-mono).

   The hero is grid lg:grid-cols-[1fr_19rem]:
     - left column: kicker + display title + standfirst + action row + beta note
     - right column: <AnchorFirmsExhibit/>
     - left and right are separated on lg by a 1px border-rule on the left
       edge of the right column.

   Title HTML:
     <h1 className="font-serif font-medium text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.0] tracking-[-0.02em] max-w-[14ch] text-balance">
       Can China staff its <em className="not-italic font-medium text-accent-deep italic">chip-tooling</em> push?
     </h1>
   Standfirst uses the `articleBrief.heroClaim.rendered` string.

   Action row:
     primary Link  →  `/essay`  label  "Read the brief →"
                     `inline-flex h-11 items-center bg-ink text-paper px-5 font-sans text-[12px] uppercase tracking-[0.14em] font-semibold border border-ink`
     secondary text: "or jump to firm dossiers · inspect source rows"
                     with the two phrases as <Link>s, font-sans 11px uppercase
                     tracking-[0.14em], muted, underline-on-rule-hair.

   Beta footnote:
     font-sans text-[10px] uppercase tracking-[0.16em] text-muted
     Text: "Beta public-source monitor · counts reflect source coverage,
            not workforce size · methodology"
     The word "methodology" links to /methodology.

3. Delete from app/page.tsx, in this pass only:
   - the entire <aside> for "Core question"
   - the array `heroPrimaryLinks` (replaced by the new layout)

Rules:
- Do not change the layout below the hero.
- Do not invent figures. Read them from the existing snapshots.
- The exhibit must use figures already marked source_checked. If a snapshot
  has none, fall back to figures[0] and add a small `Not yet source-checked`
  caption beside the value (sans 9px italic, muted).
- Do not add hover animations beyond Tailwind's `transition-colors`.
- Mobile layout: stack columns; the exhibit becomes a top-bordered block
  below the actions, with the same row treatment.

After changes:
- run `npm run lint` and `npm run build`
- report:
  - the four firm/figure pairs the exhibit ended up rendering (so PM can
    sanity-check the pick)
  - any place an existing test snapshot needs updating
- visually confirm the hero looks like Mockup A in
  docs/v7-design-direction/assets/ (or in the Design Critique.html shipped
  with this pack).

STOP HERE if PM chose Track L.
```

---

## Prompt 3 — add AtlasMasthead  *(Track M)*

```text
Goal:
Add a thin top masthead strip that carries the publication mark, primary nav,
and the data manifest date. It sits above the hero and is shared with all
sub-pages.

Files to create:
- components/atlas/atlas-masthead.tsx

Files to edit:
- app/layout.tsx (mount the masthead above {children})

Action:

1. components/atlas/atlas-masthead.tsx — server component.
   It reads `data/generated/manifest.json` via a normal `import manifest from`
   statement (Next 16 supports JSON imports). Use `manifest.builtAt` or the
   closest date-bearing field; if none, format `Date.now()` and add a TODO
   comment.

   Markup:
   - sticky top-0 z-10 bg-paper/95 backdrop-blur-sm border-b border-rule
   - inner: max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14, h-11 flex
     items-center justify-between font-sans text-[11px] uppercase
     tracking-[0.18em]
   - left: <Link href="/" className="font-semibold text-ink">
            China Semiconductor Tooling Talent Atlas
           </Link>
   - right: a nav with five <Link>s, gap-7, text-muted, hover:text-ink:
            Brief /essay
            Firms /firms
            Segments /segments/deposition  (or /segments — confirm)
            Explorer /explorer
            Methodology /methodology
   - far-right: a small <span className="ml-7 text-muted-2 normal-case
     tracking-[0.04em]">Beta · {formattedDate}</span>

2. In app/layout.tsx, render <AtlasMasthead/> immediately before {children}
   inside <body>. Remove top padding from the hero (the masthead is 44px
   tall) so the title still hangs from the same optical position.

Rules:
- Do not add a hamburger or mobile menu in this pass. Below `sm`, hide the
  nav with `hidden sm:flex` and let the publication mark stand alone.
- Do not introduce a "current page" highlight state in this pass; nav links
  are passive.

After changes:
- run `npm run lint` and `npm run build`
- confirm the masthead is now present on /essay and /firms too.

STOP HERE if PM chose Track M and Track F is not yet approved.
```

---

## Prompt 4 — TheArgument component  *(Track F)*

```text
Goal:
Replace AnalystBriefRail + the inline Findings grid + ArticleStatStrip with a
single argument section. The drop-cap lede paragraph carries the case; three
numbered findings carry the subordinate claims; a source-base band below
promotes the 43/143/4/4 numbers.

Files to create:
- components/atlas/the-argument.tsx

Files to edit:
- app/page.tsx (replace the second and third sections — Analyst Brief and
  the inline Findings grid; remove the standalone ArticleStatStrip section)

Files to NOT touch:
- components/atlas/analyst-brief-rail.tsx (kept in repo, unimported, for
  easy rollback)
- components/atlas/article-stat-strip.tsx (kept; TheArgument imports its
  underlying lib/atlas-analytics.ts directly so the stats stay in sync)
- data/editorial/*.ts

Action:

1. components/atlas/the-argument.tsx — server component.
   - Imports:
       articleBrief from data/editorial/article-brief
       homepageInsights from data/editorial/homepage-insights
       totalSources, nonTaxonomyEvidenceRows from lib/atlas-analytics
       firmWorkforceSnapshots from data/editorial/firm-workforce-snapshots
       segmentProfiles from data/editorial/segment-profiles
   - Markup structure (Tailwind):
       <section aria-labelledby="argument-heading" className="border-t border-rule pt-7 pb-16">
         <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-14">
           {/* head */}
           <div className="grid grid-cols-1 lg:grid-cols-[96px_1fr] gap-8 items-baseline border-b border-rule pb-6">
             <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
               <span className="font-serif italic text-accent">§</span>&nbsp;01 &nbsp;The argument
             </div>
             <h2 id="argument-heading" className="font-serif font-medium text-[28px] sm:text-[36px] leading-[1.05] tracking-[-0.015em] text-balance max-w-[22ch]">
               The public record shows scale<br/>before customer-site depth.
             </h2>
           </div>

           {/* body */}
           <div className="mt-9 grid grid-cols-1 lg:grid-cols-[96px_1.1fr_1fr] gap-8">
             <div className="hidden lg:block" />
             <p className="font-serif text-[18px] leading-[1.55] text-ink-soft drop-cap">
               { lede text — see copy bank §2 }
             </p>
             <div className="flex flex-col">
               { three findings — see below }
             </div>
           </div>

           {/* source base band */}
           <div className="mt-10 pt-5 border-t border-rule grid grid-cols-1 lg:grid-cols-[96px_repeat(4,1fr)] gap-8 items-baseline">
             ...
           </div>
         </div>
       </section>

   - Findings: render homepageInsights[0..2] (stem-denominator, firm-filings,
     customer-site-support). Skip "city-records" — it is better placed
     adjacent to the CitySignalMap.
     Each finding:
       <div className="grid grid-cols-[28px_1fr] gap-3 py-4 border-t border-rule-hair first:border-t-rule">
         <div className="font-mono text-[11px] text-accent pt-1 tracking-[0.08em]">01</div>
         <div>
           <h4 className="font-serif font-semibold text-[17px] leading-snug text-ink">{insight.title}.</h4>
           <p className="mt-1 font-serif text-[14px] leading-[1.5] text-ink-soft">{insight.finding}</p>
         </div>
       </div>

   - Source-base band: gutter label "Source base" (sans 10px tracked uppercase
     muted), then four stat cells:
       43   Public sources
       {nonTaxonomyEvidenceRows.length}  Evidence rows
       {segmentProfiles.length}          Tool segments
       {firmWorkforceSnapshots.length}   Firm snapshots
     Stat numbers: font-serif font-medium text-[32px] tabular-nums tracking-[-0.01em] text-ink
     Captions: font-sans text-[10px] uppercase tracking-[0.14em] mt-1.5 text-muted

   - Drop-cap: add `.drop-cap` to globals.css:
       .drop-cap::first-letter {
         font-family: var(--font-serif);
         font-weight: 500;
         font-size: 3.4em;
         line-height: 0.86;
         float: left;
         padding: 5px 10px 0 0;
         color: var(--color-ink);
       }
     (This is the only globals.css change in this prompt.)

2. In app/page.tsx, replace the three sections in order:
     - <section> wrapping <AnalystBriefRail/>
     - the standalone <section> with <ArticleStatStrip/>
     - the <section> with the inline Findings grid (the one with the
       "02 Findings" eyebrow)
   …with a single <TheArgument/>.

   Delete the now-unused `findingNextLinks` array.
   Leave the imports of AnalystBriefRail and ArticleStatStrip in place for
   one commit, then remove them in a follow-up if lint complains.

Rules:
- Do not duplicate content. The lede text is sourced from copy bank §2.
- Do not invent stat numbers. Read them from lib/atlas-analytics.ts.
- Do not add "Read more" links inside findings — the section's job ends with
  the source-base band.
- "city-records" insight is intentionally omitted here; it will resurface as
  the standfirst above CitySignalMap in Prompt 6.

After changes:
- run `npm run lint` and `npm run build`
- report whether AnalystBriefRail and ArticleStatStrip are still imported
  anywhere in app/. If not, leave them on disk but report so PM can decide
  whether to delete in a separate PR.
```

---

## Prompt 5 — strip per-block eyebrows from exhibits  *(Track F)*

```text
Goal:
Remove eyebrow inflation from the third home section. Each exhibit keeps its
own <h3> but loses its uppercase kicker. The section opener carries the
single "02 Exhibits" kicker.

Files to edit (each component, header block only):
- components/atlas/firm-workforce-chart.tsx        (remove "Firm workforce chart" or "Listed-company disclosure" eyebrow)
- components/atlas/discipline-segment-matrix.tsx  (remove "Discipline-to-segment matrix" eyebrow)
- components/atlas/toolmaker-footprint-grid.tsx    (remove "Toolmaker footprint grid" eyebrow)
- components/atlas/comparator-frame.tsx            (remove "Comparator frame" eyebrow)

Also edit:
- app/page.tsx (rename the section eyebrow from "03 Exhibits" to "02 Exhibits"
  now that the merge in prompt 4 collapsed sections 01 + 02; renumber 04 → 03,
  05 → 04, 06 → 05.)

Action:
For each component above, locate the small uppercase eyebrow `<p>` that
precedes the section's `<h2>` or `<h3>` and remove it. Keep the `<h3>` (which
is the real title). If the eyebrow holds information not in the h3 (e.g.
"Schematic — not to scale"), move it under the h3 as a 10px tracked sans
caption in `text-muted`.

Rules:
- Do not change any chart geometry, data binding, or labels inside the
  exhibits.
- Do not change the visual order of the four exhibits unless PM has
  explicitly approved the reorder discussed in 02_information_architecture.md.

After changes:
- run `npm run lint` and `npm run build`
- report the list of removed eyebrow strings (so PM can see what was deleted).
```

---

## Prompt 6 — promote city-records insight to CitySignalMap standfirst  *(Track F)*

```text
Goal:
The "Shanghai and Beijing produce the most records" insight was omitted from
TheArgument because it belongs with the city map. Surface it as the section
standfirst above <CitySignalMap/>.

Files to edit:
- app/page.tsx (the Geography section)

Action:
Inside the Geography section's container, between the <h2> heading and
<CitySignalMap/>, insert a standfirst paragraph:

  <p className="mt-4 max-w-[42em] font-serif text-[18px] leading-[1.55] text-ink-soft">
    {homepageInsights.find(i => i.id === "city-records")!.finding}
  </p>

Add the homepageInsights import to app/page.tsx if it is not already there.

Rules:
- Do not change the title of the section.
- Do not change the inspector inside CitySignalMap.
- Do not add a "limit" caveat next to the standfirst — the map's own
  inspector already states "node size scales with public-record count, not
  talent ranking."

After changes:
- run `npm run lint` and `npm run build`.
```

---

## Prompt 7 — source-trail tightening  *(Track F)*

```text
Goal:
The dark source-trail block at the foot of the home page is already in the
right register; v7 only asks for two tightenings.

Files to edit:
- app/page.tsx (the final <section> with bg-stone-950)

Action:
1. Map the dark color tokens to the new palette:
   bg-stone-950   -> bg-reverse
   text-stone-100 -> text-paper
   text-stone-400 -> text-muted-2
   text-stone-50  -> text-paper
   border-stone-800 -> border-reverse-soft
   hover:bg-stone-900 -> hover:bg-reverse-soft

2. Remove the "06" section number from the eyebrow if Prompt 5 has not
   already renumbered (it should now read "05").

3. Inside each next-click card, remove any per-card uppercase eyebrow and
   keep only the title + description.

Rules:
- Do not change the link set in articleBrief.nextClicks.
- Do not introduce hover animations beyond the existing `transition-colors`.

After changes:
- run `npm run lint` and `npm run build`.

This completes Track F.
```

---

## Notes for the agent

- **No new dependencies.** Anything that needs `npm install` must be queued
  as a separate PR and discussed in writing first.
- **No data changes.** Every figure, name, and source ID rendered on the
  home page must come from a file under `data/editorial/` or `lib/`.
- **Smallest coherent diff.** If a prompt asks you to change three files and
  you find yourself touching seven, stop and ask.
- **Run lint + build between prompts.** Both must pass before moving on.
- **Report.** End every prompt by listing files changed, lines added/removed
  per file, and one sentence on what to look at in the browser.
- **Roll back is cheap.** Each prompt is one commit. To roll Prompt N back,
  `git revert <sha>`.

→ Continue to [`05_copy_bank.md`](./05_copy_bank.md) for the exact strings,
or [`06_qa_checklist.md`](./06_qa_checklist.md) for acceptance criteria.

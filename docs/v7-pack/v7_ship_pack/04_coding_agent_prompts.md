# 04 — Coding agent prompts

Use these one at a time in Claude Code or Codex. After every prompt, run:

```bash
npm run build:data
npm run lint
npm run build
```

Commit only after all three pass.

## Prompt 0 — preflight read

```text
Read the repository before making changes.

Read these files first:
- AGENTS.md
- README.md
- app/page.tsx
- app/layout.tsx
- app/globals.css
- data/editorial/article-brief.ts
- data/editorial/homepage-insights.ts
- data/editorial/firm-workforce-snapshots.ts
- components/atlas/firm-workforce-chart.tsx
- components/atlas/discipline-segment-matrix.tsx
- components/atlas/toolmaker-footprint-grid.tsx
- components/atlas/comparator-frame.tsx
- components/atlas/city-signal-map.tsx
- lib/atlas-analytics.ts

Do not edit files in this pass.

Reply with:
1. the current homepage section order;
2. whether AnalystBriefRail, ArticleStatStrip, and inline Findings all render on /;
3. the firm IDs in firmWorkforceSnapshots;
4. the current hero CTAs;
5. any build or type risks you see.
```

## Prompt 1 — typography and design tokens

```text
Goal:
Apply the v7 editorial visual register while keeping body and UI text readable.

Decision:
Use Source Serif 4 for display/headings/deks. Use IBM Plex Sans for body, tables, cards, captions, and UI. Use IBM Plex Mono for source IDs and figures.

Files to edit:
- app/layout.tsx
- app/globals.css

Do not edit:
- app/page.tsx
- components
- data files

Tasks:
1. In app/layout.tsx, import Source_Serif_4, IBM_Plex_Sans, and IBM_Plex_Mono from next/font/google.
2. Bind them to CSS variables:
   - --font-source-serif
   - --font-plex-sans
   - --font-plex-mono
3. Add those variables to the <html> className.
4. Set body className to `min-h-full bg-paper text-ink` or preserve existing body layout while using bg-paper/text-ink.
5. In app/globals.css, define tokens:
   - paper: #f3efe7
   - paper-deep: #ece7dc
   - paper-edge: #d9d2c2
   - ink: #14110d
   - ink-soft: #2a2620
   - muted: #6b6358
   - muted-2: #8a8174
   - rule: #1c1917
   - rule-hair: #c8c2b6
   - accent: #b07418
   - accent-deep: #7c4f0f
   - sig-green: #5a6b3e
   - reverse: #08070a
   - reverse-soft: #1c1917
6. In @theme inline, expose Tailwind tokens bg-paper, text-ink, border-rule, etc.
7. Set global body font-family to var(--font-plex-sans). Do not set body to serif.
8. Keep `.font-serif` available through --font-source-serif and `.font-mono` through --font-plex-mono.
9. Add `.tabular-nums` if not already present.

Rules:
- No new npm dependencies.
- Do not add tailwind.config.ts.
- Do not add dark mode.
- Keep the diff small.

After changes, report changed files and the exact commands to run.
```

## Prompt 2 — hero recomposition with curated anchor-firm exhibit

```text
Goal:
Make the homepage open like a professional brief, not a dashboard. Replace the current scattered hero with one claim, one primary CTA, quiet secondary links, and a right-side exhibit of firm disclosures.

Files to create:
- components/atlas/anchor-firms-exhibit.tsx

Files to edit:
- app/page.tsx
- data/editorial/firm-workforce-snapshots.ts only if needed to add a non-numeric `heroFigureLabel` or `heroFigureKey` field.

Do not edit:
- generated JSON
- CSV files
- other components

Copy:
Title: Can China staff its chip-tooling push?
Standfirst: Chinese toolmakers are adding products and R&D staff. The harder test is whether they can build the field engineers, service teams, calibration routines, and customer-support systems that make equipment work in fabs.
Primary CTA: Read the brief -> /essay
Quiet links: firm dossiers -> /firms; inspect source rows -> /explorer
Beta line: Beta public-source monitor · counts reflect source coverage, not workforce size · methodology

AnchorFirmsExhibit:
- Import firmWorkforceSnapshots.
- Render four rows in this order: AMEC, ACM Research Shanghai, NAURA, Piotech.
- Use curated figure selection, not first source-checked by default.
- Preferred figure labels:
  AMEC: R&D personnel
  ACM Research Shanghai: After-sales service personnel; fallback Technical personnel
  NAURA: Sales and customer-service personnel; fallback R&D personnel
  Piotech: R&D personnel
- If a preferred label does not exist, use the first source_checked figure and render a small `fallback figure` note.
- Do not invent values.
- Each row shows firm name, segment chip, figure value, figure label, and source-checked status.
- Footnote: Categories are not interchangeable. R&D, technical staff, service staff, and total employees use different denominators.

Hero layout:
- max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14
- grid on lg: main text + 19rem exhibit column
- title in font-serif, large, sentence case
- body/CTA in font-sans
- no big caveat block

Rules:
- Delete or stop rendering the current Core question aside.
- Reduce hero CTAs to one primary button and two quiet links.
- Do not change sections below the hero.
- No animation.

After changes, report the exact four firm/figure pairs rendered.
```

## Prompt 3 — consolidate the argument section

```text
Goal:
Replace the duplicate Analyst Brief, stat strip, and Findings grid with one argument section.

Files to create:
- components/atlas/the-argument.tsx

Files to edit:
- app/page.tsx
- app/globals.css only if adding a drop-cap utility

Do not edit:
- data files
- existing AnalystBriefRail or ArticleStatStrip components; leave them on disk for rollback.

Section title:
The public record shows scale before customer-site depth.

Lede:
Most coverage of China's chip-tooling push tracks product launches: a new etch platform from Shanghai, a deposition tool out of Shenyang, a metrology product tied to a domestic fab. Those launches matter. They describe only the first half of what a foundry needs. The vendor-side question is whether the firm shipping the tool can install it, tune it, match it across chambers, recover it after maintenance, and support repeat deployment inside a customer's ramp.

Three findings:
1. Broad STEM totals are the wrong denominator.
   Etch, deposition, metrology, and lithography-adjacent tools each draw on a different mix of plasma, thin-film, optical, controls, and field-support talent. A national graduate total collapses those mixes into one number.
2. Listed-firm filings are the clearest workforce window.
   AMEC, ACM Research Shanghai, NAURA, and Piotech disclose more useful detail than education statistics: R&D scale, technical staff, degree mix, after-sales categories, and product-family breadth.
3. Customer-site support is the hardest layer to see.
   Product pages show ambition; filings show parts of the organization. Public sources rarely show installation practice, chamber matching, field calibration, service training, or recovery after maintenance.

Source-base band:
Render four figures from live imports, not hard-coded text:
- totalSources from lib/atlas-analytics.ts
- nonTaxonomyEvidenceRows length from lib/atlas-analytics.ts
- segmentProfiles.length
- firmWorkforceSnapshots.length

Rules:
- Remove the rendered AnalystBriefRail from homepage.
- Remove the standalone ArticleStatStrip from homepage.
- Remove the inline Findings grid from homepage.
- Do not delete the old components from disk.
- No card backgrounds. Use hairlines and typography.
- Use body font sans for paragraphs unless the design system already uses serif for prose.

After changes, report whether the removed components are still imported anywhere.
```

## Prompt 4 — reorder exhibits and remove redundant labels

```text
Goal:
Make the exhibit order support the argument and remove repeated uppercase labels.

Files to edit:
- app/page.tsx
- components/atlas/firm-workforce-chart.tsx
- components/atlas/discipline-segment-matrix.tsx
- components/atlas/toolmaker-footprint-grid.tsx
- components/atlas/comparator-frame.tsx

Tasks:
1. In app/page.tsx, reorder the exhibit section as:
   a. DisciplineSegmentMatrix
   b. FirmWorkforceChart
   c. ComparatorFrame
   d. ToolmakerFootprintGrid
2. The section title should be:
   What the workforce test requires
3. Remove small uppercase eyebrows inside each exhibit component if they duplicate the section title. Keep real h3 titles.
4. Keep captions that explain denominator or source limits.
5. In ToolmakerFootprintGrid, make labels read as source coverage, not capability. Replace any cell label that implies maturity or strength with neutral language such as:
   - source checked
   - public product record
   - no current public row
   - watchlist

Rules:
- Do not change data binding.
- Do not add scores.
- Do not make the grid look like a ranking.
- Keep all links intact.

After changes, report each label you removed or replaced.
```

## Prompt 5 — city map and lab-to-fab placement

```text
Goal:
Keep the city map as orientation and make the lab-to-fab chain carry the core analytical warning.

Files to edit:
- app/page.tsx
- components/atlas/city-signal-map.tsx only if labels need token updates
- components/atlas/lab-to-fab-chain.tsx only if labels need token updates

Tasks:
1. Geography section title: Where public records cluster.
2. Add this standfirst above CitySignalMap:
   Shanghai and Beijing lead the current public record set because listed firms, industrial parks, universities, and policy documents are easier to observe there.
3. Make sure the map note says node size reflects public-record count, not workforce size.
4. Place LabToFabChain after the map with title:
   Where public records go quiet.
5. The chain should emphasize installation, tuning, chamber matching, field calibration, service training, and repeat deployment.

Rules:
- Do not change city coordinates.
- Do not add a map library.
- Do not create a geographic ranking.
```

## Prompt 6 — source trail and reader paths

```text
Goal:
End the homepage with useful next clicks, not more caveats.

Files to edit:
- app/page.tsx

Tasks:
1. Final section title: Open the source trail.
2. Add one sentence:
   Start with the brief, then move into firm dossiers, segment pages, source rows, and methodology as needed.
3. Keep five cards or links:
   - Read the brief -> /essay
   - Open firm dossiers -> /firms
   - Compare tool segments -> /segments/deposition or /segments
   - Inspect source rows -> /explorer
   - Read the methodology -> /methodology
4. Remove per-card uppercase eyebrows.
5. Use bg-reverse, text-paper, border-reverse-soft tokens.

Rules:
- Do not change route names.
- Do not add a new page.
```

## Prompt 7 — README and language audit

```text
Goal:
Remove starter-kit residue and AI-sounding public copy.

Files to edit:
- README.md
- app/page.tsx
- data/editorial/homepage-insights.ts if still rendered anywhere
- data/editorial/article-brief.ts if homepage copy imports from it
- components/atlas/* only where public text appears

README should include:
- product title
- one-paragraph product promise
- routes
- data pipeline commands
- local development commands
- what the product measures
- what it does not measure
- update workflow
- beta status

Search for and replace user-facing text containing:
- landscape
- leverage
- robust
- sharpen
- surface
- actually
- nuanced
- not a
- visibility is not depth
- public evidence signal in headings
- why this matters

Rules:
- Do not rewrite source notes or methodology definitions unless they appear on public pages.
- Keep caveats in methodology and captions.
- Do not remove essential limits.

After changes, report a table: file, old text, new text.
```

## Prompt 8 — final build and route QA

```text
Goal:
Run final checks and prepare for Vercel deployment.

Tasks:
1. Run:
   npm run build:data
   npm run lint
   npm run build
2. Start dev server and manually check:
   /
   /essay
   /firms
   /firms/amec
   /firms/piotech
   /segments/deposition
   /explorer
   /sources
   /methodology
3. Report broken links, hydration errors, console errors, and routes that 404.
4. Do not edit files unless there is a build or route-breaking issue.
```

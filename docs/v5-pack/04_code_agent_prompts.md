# Code agent prompts

Use these prompts one at a time in Claude Code or Codex. Do not paste all prompts at once.

## Prompt 0: repo orientation, no edits

```text
Read the repository before making changes.

I am turning this project from a dashboard-first evidence viewer into an article-led brief with a supporting monitor.

Current stack:
- Next.js App Router
- TypeScript
- Tailwind
- local CSV to JSON pipeline
- data/editorial for curated writing
- data/generated for generated JSON
- components/atlas for reusable sections

Rules:
- Do not edit files yet.
- Summarize the current route structure.
- Identify which files control the homepage, firm pages, segment pages, explorer, methodology, and source ledger.
- Identify whether app/firms/page.tsx exists.
- Identify which data files contain firm profiles, workforce snapshots, segment profiles, and observations.
- End with a recommended smallest-diff plan for V5.
```

## Prompt 1: move current homepage to `/monitor`

```text
Read the repo before editing.

Goal:
Preserve the current homepage as a reference monitor, then free / for a new article-led homepage.

Tasks:
1. Create app/monitor/page.tsx.
2. Move the current app/page.tsx component content into app/monitor/page.tsx.
3. Replace app/page.tsx with a temporary placeholder article homepage:
   - title: Can China Staff Its Chip-Tooling Push?
   - deck: Public filings and company records show Chinese toolmakers adding R&D scale and product breadth. The harder test is whether they are building field engineers, service teams, calibration routines, and customer-support capacity.
   - links to /monitor, /firms, /explorer, /methodology.
4. Preserve all imports required by the moved monitor page.
5. Do not delete components or data files.
6. Do not change CSV schemas.
7. Do not add dependencies.

After edits, list changed files and commands to run.
```

## Prompt 2: create article-led homepage

```text
Read the repo before editing.

Goal:
Build an article-led homepage that answers this question:
Are Chinese semiconductor-equipment firms building the workforce and support organizations needed to make domestic tools work in customer fabs?

Files to create:
- data/editorial/article-brief.ts
- components/atlas/article-stat-strip.tsx
- components/atlas/lab-to-fab-chain.tsx

Files to edit:
- app/page.tsx

Article structure:
1. Hero
   Title: Can China Staff Its Chip-Tooling Push?
   Deck: Public filings and company records show Chinese toolmakers adding R&D scale and product breadth. The harder test is whether they are building field engineers, service teams, calibration routines, and customer-support capacity.
   Primary links: Open firm index, Read methodology, Explore rows.

2. Three findings
   a. Broad STEM counts are too blunt for chip tooling.
   b. Listed-company filings give the clearest public workforce view.
   c. Customer-site support is the hardest layer to see.

3. Exhibit slots
   - discipline-to-segment matrix placeholder if component does not exist yet
   - firm workforce chart placeholder if component does not exist yet
   - toolmaker footprint grid placeholder if component does not exist yet
   - lab-to-fab chain component

4. Next clicks
   - Firms
   - Segments
   - Monitor
   - Explorer
   - Sources

Writing rules:
- No X-not-Y headlines.
- No title that begins with a caveat.
- No raw source IDs on the homepage.
- Keep caveats in small footnote text near the bottom.
- Use active voice and concrete nouns.

Technical rules:
- No new dependencies.
- Do not remove /monitor.
- Do not touch the data pipeline.
```

## Prompt 3: add firm index and expand profiles

```text
Read the repo before editing.

Goal:
Create a clear next click for readers who want to learn about AMEC, NAURA, ACM Research Shanghai, Piotech, Jingce, SMEE, and BEIM.

Files to edit:
- data/editorial/firm-profiles.ts
- app/firms/[slug]/page.tsx if needed

Files to create:
- app/firms/page.tsx
- components/atlas/firm-index-grid.tsx

Data changes:
1. Keep existing full profiles for AMEC, NAURA, and ACM Research Shanghai.
2. Add a full profile for Piotech using existing source IDs:
   - CN_FIRM_PIOTECH
   - CN_FILING_PIOTECH_2025
   Keep claims source-limited. Focus on deposition product families and product breadth. Do not claim parity with Lam, Applied Materials, or Tokyo Electron.
3. Add light profiles for:
   - Jingce Electronics, source_id CN_FILING_JINGCE_2025
   - SMEE, source_id CN_FIRM_SMEE
   - BEIM, source_id CN_FIRM_BEIM
4. If a firm has weak evidence, set analystRead to a conservative sentence and include a doNotInfer list.

Firm index page:
- Title: Chinese toolmakers to watch
- Deck: Product claims are easy to find. The harder question is whether firms are building the staff and support functions needed for production use.
- Section 1: Full dossiers
- Section 2: Lighter watch cards
- Each card links to /firms/{slug}

Rules:
- No rankings.
- No capability claims.
- No internal SharePoint citations.
- No new dependencies.
- Do not edit observations.csv.
```

## Prompt 4: add article visuals

```text
Read the repo before editing.

Goal:
Add three homepage visuals that make the article useful without Tableau.

Files to create:
- components/atlas/firm-workforce-chart.tsx
- components/atlas/toolmaker-footprint-grid.tsx
- components/atlas/discipline-segment-matrix.tsx

Files to edit:
- app/page.tsx

Visual 1: FirmWorkforceChart
Use data/editorial/firm-workforce-snapshots.ts.
Render AMEC, ACM Research Shanghai, and NAURA. Use Recharts if already installed. Do not add dependencies.
The chart should compare only categories present in the data. If a category is not disclosed, show a small note instead of forcing a zero.
Footnote: Categories follow each firm's filing and are not segment-specific headcounts.

Visual 2: ToolmakerFootprintGrid
Use data/editorial/firm-profiles.ts.
Columns: Etch/clean/strip, Deposition, Metrology/inspection, Lithography-adjacent.
Rows: AMEC, NAURA, ACM Research Shanghai, Piotech, Jingce, SMEE, BEIM.
Cell labels: Core source, Some exposure, Sidebar, Needs source check, No current record.
Do not use checkmarks alone.

Visual 3: DisciplineSegmentMatrix
Use data/generated/disciplines.json.
Rows: the 14 MOE-coded disciplines.
Columns: the four segments.
Mark a cell if most_relevant_segments includes the segment.
Show one short discipline note when a row expands or on hover/focus if easy. If not, keep a simple matrix.

Add these visuals to the homepage in this order:
1. DisciplineSegmentMatrix
2. FirmWorkforceChart
3. ToolmakerFootprintGrid

Rules:
- Keep components accessible.
- Do not show raw IDs on the homepage.
- Do not invent data.
- Do not create a composite score.
```

## Prompt 5: fix the map without adding GIS

```text
Read the repo before editing.

Goal:
Make the city map read as a map of mainland China without adding a mapping library.

Files to create:
- public/china-mainland-schematic.svg

Files to edit:
- components/atlas/city-signal-map.tsx

Tasks:
1. Add a simple schematic mainland outline SVG asset in public/china-mainland-schematic.svg.
2. Use it as a low-contrast background inside CitySignalMap.
3. Keep city dots in their existing percentage positions.
4. Keep the label: Schematic mainland outline. City placement is approximate.
5. Do not include Taiwan, South China Sea lines, or disputed-boundary details.
6. Do not add Mapbox, Leaflet, D3, or any new dependency.
7. If the outline looks worse than the current map, demote the map lower on the homepage rather than spending more time.

Implementation hint:
Use an img tag or inline SVG behind the existing city nodes. The map can be visual guidance, not a legal map.
```

## Prompt 6: replace essay page with longform article

```text
Read the repo before editing.

Goal:
Replace the current essay placeholder with a longform article that supports the new homepage.

File to edit:
- app/essay/page.tsx

Title:
Can China Staff Its Chip-Tooling Push?

Sections:
1. China's tool race has a workforce test.
2. Broad STEM numbers are too blunt.
3. Each tool family needs a different workforce.
4. What listed firms disclose.
5. Why Piotech belongs in the deposition story.
6. Where public records go quiet.
7. What to monitor next.

Rules:
- 1,500 to 2,000 words.
- Short paragraphs.
- Use concrete numbers already in the data files.
- Link to firm pages and segment pages in the prose.
- Put caveats in a final methodology note, not in the title.
- Do not use raw source IDs in prose.
- Do not add new facts unless they already exist in current source files.
```

## Prompt 7: language cleanup

```text
Perform a user-facing language audit.

Files to check:
- app/page.tsx
- app/essay/page.tsx
- app/monitor/page.tsx
- app/methodology/page.tsx
- app/sources/page.tsx
- app/firms/[slug]/page.tsx
- app/segments/[segment]/page.tsx
- data/editorial/*.ts
- components/atlas/*.tsx

Replace these patterns:
- X, not Y headlines
- actually
- surface as a verb
- sharpen, unlock, leverage, robust, landscape, nuanced
- generic STEM counts miss them
- visibility is not depth
- directional, not a census
- look for scarce combinations
- why this matters
- important to note
- public evidence signal in prominent headings

Use concrete replacements:
- public records
- filings
- product pages
- service teams
- field application engineers
- customer validation
- calibration
- chamber matching
- R&D staff
- source-checked rows

Output a table of file, current text, replacement. Then make the edits only after I approve.
```

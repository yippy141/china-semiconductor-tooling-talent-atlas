# V4 sprint plan

## Before you start: the working rhythm

Use this loop for every phase:

```bash
git status
npm run build:data
npm run lint
npm run build
```

Then create a branch:

```bash
git checkout -b v4-monitor-dossiers
```

After each phase:

```bash
npm run build:data
npm run lint
npm run build
git add .
git commit -m "Short description of the phase"
```

### What this teaches

A branch is a safe workspace. A commit is a checkpoint. The three npm commands catch broken data, style/type errors, and production build errors before you deploy.

## Phase 1 - Reframe the homepage

### Goal

Stop leading with methodology. Lead with the monitor question.

### Files

- `app/page.tsx`
- `data/editorial/insights.ts`
- `components/atlas/evidence-ladder.tsx`
- `components/atlas/firm-workforce-snapshots.tsx`
- `components/atlas/city-signal-map.tsx`

### Concept

The homepage is not a database cover page. It is the briefing. The methodology proves trust later.

### What to change

Use this hero logic:

```text
China Chip Tooling Talent Monitor
What public records reveal about the people and organizations behind China’s semiconductor-equipment push.
```

Use this supporting paragraph:

```text
The monitor tracks firms, city clusters, role families, and source records tied to etch/clean, deposition, metrology/inspection, and lithography-adjacent tooling. It is built for analysts watching how Chinese toolmakers convert R&D into production support.
```

Move the beta language to a small line below the buttons:

```text
Beta dataset: 43 sources, 172 evidence rows. Counts track public records, not workforce size.
```

Rewrite the findings as concrete readouts:

```ts
export const insights = [
  {
    id: "taxonomy-scaffold-share",
    title: "Thirty-eight percent of rows are structural scaffolding.",
    summary:
      "Sixty-five of 172 rows map disciplines, roles, and segments. They make the monitor navigable, but they do not show firms hiring, training, or deploying people.",
    implication:
      "Broad STEM counts cannot tell a toolmaker where Chinese competitors are building production support.",
    source_ids: ["CN_EDU_MOE_GRAD_DIR_2022", "CN_FILING_AMEC_2025"],
  },
  {
    id: "employer-disclosures-carry-signal",
    title: "Employer disclosures carry the strongest public signal.",
    summary:
      "AMEC, ACM Research Shanghai, and NAURA publish workforce categories that expose R&D, technical, and service structure better than most education data.",
    implication:
      "The conversion layer between R&D and customer support deserves more attention than raw graduate output.",
    source_ids: ["CN_FILING_AMEC_2025", "CN_FILING_ACM_SH_2025", "CN_FILING_NAURA_2025"],
  },
  {
    id: "city-records-cluster",
    title: "Shanghai and Beijing dominate the visible record.",
    summary:
      "Shanghai leads the city view, followed by Beijing. The concentration reflects firm filings, park records, and shortage notices, not a full labor-market map.",
    implication:
      "The city layer points analysts to records worth checking first.",
    source_ids: ["CN_SHORT_SH_DIR_2020", "CN_PARK_BEIJING_ETOWN_IC", "CN_PARK_ORIENTAL_CHIP_PORT"],
  },
  {
    id: "knowhow-hidden",
    title: "The decisive know-how sits behind the public record.",
    summary:
      "Chamber recovery, field calibration, tool matching, and customer-ramp support rarely appear in public records, even when firms publish product lines and R&D counts.",
    implication:
      "The useful monitor looks for production-support signals, not product claims alone.",
    source_ids: ["CN_FILING_NAURA_2025", "CN_FILING_ACM_SH_2025"],
  },
];
```

### Claude/Codex prompt

Paste this into your coding agent:

```text
Read the repo before editing.

Task: Reframe the homepage as a monitoring brief, not a disclaimer-heavy evidence viewer.

Files to edit only:
- app/page.tsx
- data/editorial/insights.ts
- components/atlas/evidence-ladder.tsx
- components/atlas/firm-workforce-snapshots.tsx
- components/atlas/city-signal-map.tsx

Rules:
- Keep the existing architecture.
- Do not change the CSV schema.
- Do not add dependencies.
- Do not invent new numbers.
- Keep caveats, but move them into small notes or methodology links rather than headings.
- Remove repeated "BOTTOM LINE" labels except one if needed.
- Replace "atlas" with "monitor" in the hero and user-facing headlines where it improves clarity. Do not rename files or routes.

Implement these specific changes:
1. Hero title: "China Chip Tooling Talent Monitor".
2. Hero subtitle: "What public records reveal about the people and organizations behind China’s semiconductor-equipment push.".
3. Hero body: "The monitor tracks firms, city clusters, role families, and source records tied to etch/clean, deposition, metrology/inspection, and lithography-adjacent tooling. It is built for analysts watching how Chinese toolmakers convert R&D into production support.".
4. Small beta note: "Beta dataset: 43 sources, 172 evidence rows. Counts track public records, not workforce size.".
5. Replace the four insights in data/editorial/insights.ts with the copy from the implementation pack.
6. Change city map heading to "Where evidence concentrates across mainland China".
7. Change firm snapshot heading to "What AMEC, ACM Research, and NAURA publish about their workforce".
8. Change evidence ladder heading to "Three tiers of evidence".
9. Replace evidence ladder description with: "The monitor combines direct public records, analytical proxies, and taxonomy scaffolding. Each tier is reported separately."

After editing, list changed files and tell me which commands to run.
```

### Acceptance check

Open the homepage. You should be able to explain the product in one sentence before scrolling.

## Phase 2 - Add firm dossier pages

### Goal

Fix the "no next click" problem for AMEC, NAURA, and ACM Research Shanghai.

### Files

Create:

- `data/editorial/firm-profiles.ts`
- `app/firms/[slug]/page.tsx`
- `components/atlas/firm-profile-card.tsx` if needed

Edit:

- `components/atlas/firm-workforce-snapshots.tsx`
- `app/page.tsx` if the homepage needs a link section

### Concept

A dashboard tells users what exists. A dossier tells them what to make of it.

A firm dossier should answer:

1. What does the firm do?
2. Which tooling segments does it touch?
3. What workforce structure is visible?
4. Which public sources support the read?
5. What should a corporate analyst watch next?
6. What should the user not infer?

### Starter data model

```ts
export type FirmProfile = {
  slug: string;
  firmId: string;
  name: string;
  nameCn: string;
  headquarters: string;
  oneLine: string;
  segments: string[];
  productFamilies: {
    segment: string;
    label: string;
    publicRecord: string;
    source_id: string;
  }[];
  workforceSignals: {
    label: string;
    value: string;
    note: string;
    source_id: string;
  }[];
  analystRead: string;
  watchSignals: string[];
  doNotInfer: string[];
  source_ids: string[];
};
```

### Minimum content

Use these three profiles first:

AMEC:

- One-line read: "AMEC is the clearest listed-company anchor for China’s etch story and also has deposition exposure."
- Product families: etch, MOCVD or deposition-adjacent product lines according to existing source records.
- Workforce signals from current firm snapshots.
- Watch signals: customer validation language, field application roles, service training, advanced memory or high-aspect-ratio references.
- Do not infer: yield, installed-base quality, segment-specific headcount.

NAURA:

- One-line read: "NAURA is the scale case: a broad equipment group with public signals across deposition, etch/clean, furnaces, wet tools, implant, RTP, and epi."
- Watch signals: service-team growth, customer-service spending language, deposition product validation, application support.
- Do not infer: segment-specific workforce depth from whole-firm R&D counts.

ACM Research Shanghai:

- One-line read: "ACM Research Shanghai makes the wet-clean, strip, and service layer more visible than most public sources."
- Watch signals: after-sales/service headcount, wet-clean tool validation, customer-site support, cleaning or strip role language.
- Do not infer: clean/strip-specific headcount from technical staff totals.

### Claude/Codex prompt

```text
Read the repo before editing.

Task: Add firm dossier pages for AMEC, NAURA, and ACM Research Shanghai.

Files to create:
- data/editorial/firm-profiles.ts
- app/firms/[slug]/page.tsx

Files to edit:
- components/atlas/firm-workforce-snapshots.tsx

Rules:
- Do not change generated JSON.
- Do not change CSV schema.
- Do not invent numbers.
- Use existing source_ids from sources.json and firm-workforce-snapshots.ts.
- Keep pages static and generated from local TypeScript data.
- Use generateStaticParams for the firm pages.
- If a source URL exists in sources.json, render a "View source" link.
- Do not claim segment-specific headcount.

Implement:
1. Create data/editorial/firm-profiles.ts with a typed array for AMEC, NAURA, and ACM Research Shanghai.
2. Create app/firms/[slug]/page.tsx.
3. Each firm page should include:
   - navigation back to Home and Explorer,
   - firm name, Chinese name, headquarters,
   - one-line analyst read,
   - segment chips,
   - product families,
   - workforce signals,
   - "What to watch" list,
   - "Do not infer" list,
   - sources section with links from sources.json.
4. In firm-workforce-snapshots.tsx, wrap each firm title or card CTA with a Link to `/firms/${snapshot.id}`. If ids do not match profile slugs, create a small mapping.
5. Add a visible text link: "Open firm dossier ->".

After editing, list changed files and commands to run.
```

### Acceptance check

Click AMEC on the homepage. You should land on a readable page explaining AMEC, not a table.

## Phase 3 - Add segment pages

### Goal

Help non-specialists understand what etch, deposition, metrology/inspection, and lithography-sidebar talent mean.

### Files

Create:

- `app/segments/[segment]/page.tsx`

Edit:

- `components/atlas/capability-role-matrix.tsx`
- `app/page.tsx` if needed

### Concept

Segment pages are the teaching layer. They should translate technical capabilities into role families and watch signals.

### Claude/Codex prompt

```text
Read the repo before editing.

Task: Add static segment pages for the four tooling segments.

Files to create:
- app/segments/[segment]/page.tsx

Files to edit:
- components/atlas/capability-role-matrix.tsx

Data to use:
- data/editorial/segment-profiles.ts
- data/generated/capabilities.json
- data/generated/role_families.json
- data/generated/observations.json
- data/generated/sources.json

Rules:
- Do not invent numbers.
- Do not create scores.
- Do not add dependencies.
- Use generateStaticParams.
- Use segment IDs as route params: etch_clean, deposition, metrology_inspection, lithography_sidebar.

Each segment page should show:
1. Segment title and plain-English definition.
2. The capabilities attached to that segment.
3. The role families attached to that segment.
4. Likely bottlenecks from segment-profiles.ts.
5. Public signals and what to watch.
6. A button to `/explorer?segment={segment}`.
7. A short "Do not infer" note.

Also update the homepage capability matrix so each segment card links to `/segments/{segment}` with the text "Open segment brief ->".
```

### Acceptance check

A SAIS student or nontechnical China analyst should be able to click "Deposition" and understand why thin-film talent is different from lithography talent.

## Phase 4 - Fix map visual and click-through

### Goal

Make the map look like mainland China and make city nodes clickable.

### Files

- `components/atlas/city-signal-map.tsx`

### Concept

This is not a GIS product. The outline is wayfinding, not a boundary claim. The user should visually understand China, then click a city to inspect source rows.

### Implementation choice

Use an inline SVG path behind the nodes. Do not use Mapbox, Leaflet, D3, or GeoJSON.

The current city coordinates already use a 0-100 coordinate system. Put a schematic mainland outline in the same coordinate system.

### SVG path starter

This path is a schematic silhouette. It is not an official map.

```tsx
<svg
  aria-hidden="true"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  className="absolute inset-0 h-full w-full"
>
  <path
    d="M76 6 C84 7 91 12 93 20 C96 29 94 39 90 48 C87 56 83 62 78 68 C74 74 71 82 64 88 C58 93 50 88 43 80 C37 74 30 72 25 67 C21 62 16 60 13 54 C9 47 12 40 18 35 C14 29 19 24 27 22 C35 20 41 15 49 11 C58 8 67 11 76 6 Z"
    fill="rgba(68,64,60,0.20)"
    stroke="rgba(214,211,209,0.28)"
    strokeWidth="1.2"
    vectorEffect="non-scaling-stroke"
  />
</svg>
```

### Claude/Codex prompt

```text
Read the repo before editing.

Task: Fix the schematic city map.

File to edit only:
- components/atlas/city-signal-map.tsx

Rules:
- No map libraries.
- No external API calls.
- Do not change city-positions.ts.
- The outline is schematic, not official.
- Keep the existing nodes and inspector.

Implement:
1. Add an inline SVG mainland China silhouette behind the city dots using viewBox="0 0 100 100".
2. Use the path from the implementation pack as the first attempt.
3. Add legend text: "Schematic mainland outline, not an official boundary map.".
4. Make city nodes clickable. On click, navigate to `/explorer?city=${encodeURIComponent(city)}`.
5. Keep hover/focus inspector behavior.
6. Add a text link in the inspector: "View city rows in explorer ->".
7. Improve label placement for Shanghai, Suzhou, Hangzhou, and Tianjin if labels collide.

Use Next.js Link or router navigation in a client component. Keep the diff small.
```

### Acceptance check

At normal browser zoom, a viewer should see a recognizable China-like silhouette behind the nodes. Clicking Shanghai should open the explorer filtered to Shanghai.

## Phase 5 - Make explorer URL filters work

### Goal

Every page should be able to send users into a filtered evidence view.

### Files

- `app/explorer/page.tsx`

### Concept

URL query params are state stored in the address bar. They let you share a filtered view.

Example:

```text
/explorer?segment=deposition&city=Shanghai
```

### Claude/Codex prompt

```text
Read the repo before editing.

Task: Make the Evidence Explorer read filters from URL query parameters.

File to edit only:
- app/explorer/page.tsx

Current page is a client component.

Support these query params:
- segment
- city
- evidence_group
- evidence_type
- confidence
- entity_id

Rules:
- Do not change data files.
- Do not change table columns unless needed for entity_id filtering.
- Keep existing filters working.
- Add entity_id filter only if it is straightforward.
- Make initial React state read from useSearchParams().
- Clear all filters should reset the UI and, if simple, push /explorer without params.
- Default view should hide manual_inference rows and proxy_source/source infrastructure rows unless toggles are turned on.

Add toggles:
- Show taxonomy scaffold
- Show source infrastructure rows

Default both toggles to false.

Counter text:
"Showing X substantive rows of Y total beta rows."

Sort order:
1. direct public record
2. analytical proxy
3. taxonomy scaffold
Then confidence high, medium, low.
```

### Acceptance check

Open `/explorer?segment=deposition`. The segment filter should already be set to Deposition.

## Phase 6 - Add a corporate monitoring section

### Goal

Make the site useful to Lam, Applied, KLA, Nvidia supply-chain teams, and DGA-style clients.

### Files

Create:

- `data/editorial/monitoring-questions.ts`
- `components/atlas/monitoring-questions.tsx`

Edit:

- `app/page.tsx`

### Concept

The strongest client use case is not "what does the evidence say?" It is "what should I monitor next?"

### Content structure

Use three categories:

1. Firm absorption
2. Customer-site support
3. Segment-specific scarce combinations

Starter copy:

Firm absorption:

```text
Watch whether listed tool firms disclose growth in R&D, technical, after-sales, service, or customer-support categories. That is where formal engineering supply starts to become organizational capacity.
```

Customer-site support:

```text
Product announcements are weak signals by themselves. Stronger signals mention field application engineers, customer validation, calibration, repeat orders, service training, or support teams tied to a specific tool family.
```

Scarce combinations:

```text
The hardest roles combine disciplines: plasma plus chamber hardware, ALD chemistry plus vacuum behavior, optics plus algorithms, or precision motion plus calibration. Generic STEM counts miss these combinations.
```

### Claude/Codex prompt

```text
Read the repo before editing.

Task: Add a corporate monitoring section to the homepage.

Files to create:
- data/editorial/monitoring-questions.ts
- components/atlas/monitoring-questions.tsx

File to edit:
- app/page.tsx

Rules:
- No new data claims beyond existing source-backed categories.
- No scores.
- No new dependencies.
- Write in briefing style.

Section title:
"What to watch next"

Deck:
"For corporate and policy users, the useful signal is not a product announcement alone. The stronger signal is whether a firm is building the people and routines that move a tool from lab result to customer-site operation."

Cards:
1. Firm absorption
2. Customer-site support
3. Scarce role combinations
4. City clusters worth checking first

Each card should include:
- watch signal
- stronger version of the signal
- do not infer
- link to relevant firm, segment, or explorer filter
```

### Acceptance check

A Lam Research GR or strategy reader should leave with a checklist of what to monitor.

## Phase 7 - Language and design pass

### Goal

Remove AI-sounding text and make the site feel less generic.

### Files

- `app/page.tsx`
- `app/essay/page.tsx`
- `app/methodology/page.tsx`
- `app/sources/page.tsx`
- `app/explorer/page.tsx`
- `components/atlas/*`
- `data/editorial/*`

### Rules

Replace these patterns:

```text
"not a X" headings -> state what the section is
"why this matters" -> delete or replace with a claim
"evidence pattern" -> delete
"actually" -> delete unless needed
"use this as" -> move to methodology or CTA
"sharpens", "surfaces", "leverages", "robust" -> replace with plain verbs
"can help readers" -> say what it shows
```

### Claude/Codex prompt

```text
Run a user-facing language audit.

Files to inspect:
- app/page.tsx
- app/essay/page.tsx
- app/methodology/page.tsx
- app/sources/page.tsx
- app/explorer/page.tsx
- components/atlas/*
- data/editorial/*

Rules:
- Do not change data logic.
- Do not change routes.
- Do not remove methodology caveats. Move caveats to smaller notes where appropriate.
- Write like an analyst briefing a client, not a marketing page.
- Avoid "not a X" titles.
- Avoid "why this matters" labels.
- Avoid self-referential product instructions in findings.
- Keep all source-backed numbers unchanged.

Output first: a table of proposed text changes.
Then apply only the changes I approve.
```

### Acceptance check

The homepage should sound like a person with judgment, not a compliance note.

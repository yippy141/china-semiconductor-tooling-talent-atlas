# 04 Claude Code / Codex Prompts

Use one prompt at a time. After every prompt, run:

```bash
npm run build:data
npm run lint
npm run build
```

Commit after each clean build.

## Prompt 1: add analyst brief rail

```text
Read the repository before changing files.

Goal:
Make the homepage answer the product question faster by adding an Analyst Brief rail below the hero.

Files to create:
- data/editorial/homepage-insights.ts
- components/atlas/analyst-brief-rail.tsx

Files to edit:
- app/page.tsx

Rules:
- Keep diffs small.
- Do not change CSV schemas.
- Do not add dependencies.
- Do not use raw IDs in public text.
- Do not add capability scores.
- Do not use "not a" headlines.

Data structure:
Each insight should include:
- id
- title
- finding
- recordShows
- limit
- href
- linkLabel

Create four insights:
1. Broad STEM counts are the wrong denominator.
2. Firm filings are the best public workforce window.
3. Shanghai and Beijing produce the most records.
4. Customer-site support is the hardest layer to see.

Place the component immediately after the hero.

After changes, tell me which files changed and what to check on the page.
```

## Prompt 2: rewrite hero and first-screen copy

```text
Read the repository before changing files.

Goal:
Rewrite the homepage hero so a first-time reader understands the product in under one minute.

File to edit:
- app/page.tsx

Use this copy:

Title:
Can China Staff Its Chip-Tooling Push?

Deck:
Chinese toolmakers are adding products and R&D staff. The harder test is whether they can build field engineers, service teams, calibration routines, and customer-support systems that make equipment work in fabs.

Small note:
Beta public-source monitor. Counts show source coverage, not workforce size.

Primary links:
- Read the brief -> /essay
- Open firm dossiers -> /firms
- Inspect source rows -> /explorer

Rules:
- Do not put caveats in the headline.
- Keep the beta note visually smaller than the deck.
- Do not remove existing sections yet.
```

## Prompt 3: add comparator frame

```text
Read the repository before changing files.

Goal:
Add a qualitative Western comparator frame to help readers interpret Chinese workforce disclosures without turning the page into a scoreboard.

Files to create:
- data/editorial/comparator-frames.ts
- components/atlas/comparator-frame.tsx

File to edit:
- app/page.tsx

Module title:
How to read a toolmaker workforce signal

Intro:
Mature equipment firms are not only R&D shops. They run field service, applications engineering, calibration, training, spare-parts, and customer-support systems around an installed base. Chinese filings show parts of that structure. They rarely show the full customer-site layer.

Create comparator rows:
- AMEC -> Lam Research reference -> etch and process equipment
- NAURA / Piotech -> Applied Materials and Tokyo Electron reference -> deposition and broad process equipment
- ACM Research Shanghai -> SCREEN, Lam Research, Tokyo Electron reference -> clean and wafer processing
- Jingce / BEIM / Skyverse -> KLA reference -> metrology and inspection
- SMEE -> ASML, Nikon, Canon reference -> lithography sidebar

Each row fields:
- chinaFocus
- referencePeers
- segment
- compareOn
- doNotCompareOn
- readerUse

Rules:
- No numeric Western claims.
- No parity or catch-up claim.
- No rankings.
- Put this section after the firm workforce chart.
```

## Prompt 4: clarify firm workforce denominators

```text
Read the repository before changing files.

Goal:
Make the firm workforce section safer and clearer by labeling denominators.

Files likely involved:
- data/editorial/firm-workforce-snapshots.ts
- components/atlas/firm-workforce-snapshots.tsx

Tasks:
1. Render each figure as label, value, denominator, note.
2. Do not force every firm into the same metric slots.
3. Add a small note below the chart:
   Firms use different workforce categories. R&D share, technical staff, service staff, and advanced-degree counts are not interchangeable.
4. Make sure ACM Research Shanghai's 1,228 figure is labeled "technical personnel" unless the source says R&D.
5. Add visible source status badges: source_checked, needs_check, staging.

Rules:
- Do not add a talent score.
- Do not combine master's and PhD counts unless the note says exactly what was added.
- Keep component styling consistent with the homepage.
```

## Prompt 5: add next-click links

```text
Read the repository before changing files.

Goal:
Make the homepage useful as a navigation surface.

Files to edit:
- app/page.tsx
- components/atlas/city-signal-map.tsx
- components/atlas/capability-role-matrix.tsx if it exists
- components/atlas/firm-workforce-snapshots.tsx

Tasks:
1. Firm cards link to the corresponding firm pages.
2. Segment cards link to the corresponding segment pages.
3. City nodes link to /monitor?city={city} or /explorer?city={city}.
4. Analyst Brief cards link to the most relevant page or section.
5. Add "Open dossier" and "View source rows" links where useful.

Rules:
- Do not show raw IDs in link text.
- Do not change data schemas.
- Do not add dependencies.
```

## Prompt 6: rewrite README

```text
Rewrite README.md for the current project.

Title:
China Chip Tooling Talent Monitor

Include:
- One-paragraph project description
- Scope
- What it measures
- What it does not measure
- Routes
- Data pipeline commands
- Local development commands
- Verification status note
- Status: beta public-source monitor

Remove all create-next-app starter text.

Mention:
- Mainland PRC only
- Semiconductor manufacturing equipment only
- Evidence rows describe public records, not capability
- No individual-level data
- Observations remain beta until verified
```

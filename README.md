# China Semiconductor Tooling Talent Atlas

Beta interactive source companion for an essay on whether Chinese semiconductor-equipment firms are building the people and support organizations needed to move from product claims to working fab tools.

This is an editorial evidence product, not a SaaS app. It uses local CSV files, generated JSON, and Next.js App Router pages to organize public records, caveats, and interpretation. Counts describe public-record coverage, not workforce size, talent density, or technical capability.

## Current Scope

The atlas focuses on mainland PRC semiconductor tooling talent signals:

- Listed-firm disclosures for AMEC, NAURA, ACM Research Shanghai, Piotech, and related toolmakers.
- Segment briefs for etch and clean, deposition, metrology and inspection, and lithography-adjacent work.
- Feeder-discipline context from existing MOE-coded discipline data.
- Source coverage by city, explicitly not a talent geography map.
- Public source records and evidence types behind each observation.
- Methodology caveats for verification status, proxy evidence, and beta data limits.

The longer public essay will publish separately. Until that URL exists, `/essay` remains the working on-site brief and `/` remains the interactive companion entry point.

## Routes

- `/` - homepage, reader paths, interpretation modules, exhibits, source coverage map.
- `/essay` - working version of the long-form brief.
- `/firms` - firm index.
- `/firms/[slug]` - firm dossiers for individual companies.
- `/segments/[segment]` - segment briefs by tool family.
- `/supply` - talent supply pipeline scaffold using local discipline data.
- `/explorer` - source-record explorer with filters.
- `/sources` - public source ledger.
- `/methodology` - scope, evidence rules, verification status, and responsible-use notes.
- `/monitor` - reference monitor view retained for comparison and review.

## Data Model

Raw CSV files live in `data/raw/`. Generated JSON files live in `data/generated/` and are produced by `npm run build:data`.

Important rules:

- Every observation should have a `source_id`.
- Do not invent values from qualitative claims.
- Keep direct evidence separate from proxy evidence.
- Treat `data/raw/observations.csv` as staging until manually verified.
- Do not include individual-level personal data.
- Do not add a database, authentication, or scraping workflow for v1.

Editorial interpretation lives in `data/editorial/`. Those files should stay aligned with the source ledger and should not introduce unsupported claims.

## Local Commands

Install dependencies:

```bash
npm install
```

Regenerate local JSON data:

```bash
npm run build:data
```

Start the local dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Run quality checks:

```bash
npm run lint
npm run build
```

## Beta Status

This project is still a beta public-source monitor. The site is useful for reading evidence signals and caveats, but it should not be cited as a workforce census, capability ranking, or city talent map. The map shows source coverage only. Firm workforce numbers are filing-level disclosures and should not be read as segment-specific staffing unless the source says so.

## Final Checklist

Before shipping or deploying, run:

```bash
npm run build:data
npm run lint
npm run build
```

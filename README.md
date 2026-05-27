# China Semiconductor Tooling Talent Atlas

Beta public-source monitor.

## Product promise

A public-source monitor for whether Chinese semiconductor-equipment firms are building the R&D, service, field-application, calibration, and training capacity needed to turn product claims into working fab tools. The site reads as an editorial brief, not a dashboard: a homepage that frames the question, firm dossiers, segment briefs, an evidence-row explorer, a methodology page, and a source ledger. Counts describe public-record coverage, not workforce size or technical capability.

## What it measures

- Public-record coverage from filings, company pages, policy documents, industrial-park records, shortage lists, and analytical proxies.
- Firm-level workforce categories where filings disclose them: total employees, R&D personnel, technical personnel, degree mix, after-sales or service categories, and product-family breadth.
- Discipline-to-segment mappings from the MOE graduate catalogue.
- City-level visibility in the current evidence rows.

## What it does not measure

- Workforce totals for China's semiconductor-equipment industry.
- Product performance, yield, installed-base quality, customer uptime, or parity with foreign suppliers.
- Segment-specific headcount unless a source explicitly discloses it.
- Individual scientists, engineers, students, or employees.
- Real-time market conditions or claims outside the local source ledger.

## Routes

- `/` — editorial homepage and first-read brief.
- `/essay` — long-form brief.
- `/firms` — firm index.
- `/firms/[slug]` — firm dossiers.
- `/segments/[segment]` — segment briefs.
- `/explorer` — evidence-row explorer with filters for segment, city, evidence type, and entity.
- `/sources` — public source ledger.
- `/methodology` — scope, evidence rules, verification status, and citation guidance.
- `/monitor` — reference monitor view with city, role, and workforce exhibits.

## Data pipeline commands

```bash
npm run build:data
```

Reads CSV files from `data/raw` and writes generated JSON tables to `data/generated`.

```bash
npm run lint
npm run build
```

Runs linting and the production Next.js build.

## Local development commands

```bash
npm install
npm run build:data
npm run dev
```

Open `http://localhost:3000` after the dev server starts.

## Update workflow

1. Add or revise source rows in `data/raw/sources.csv` with a stable `source_id`, title, publisher, and URL.
2. Add observations in `data/raw/observations.csv`. Every row needs a `source_id` that already exists in the ledger.
3. Update editorial TypeScript files under `data/editorial/` only after the underlying source rows exist. Set `verificationStatus` to `staging` or `needs_check` until you have read the source.
4. Run `npm run build:data` to regenerate `data/generated/`.
5. Run `npm run lint` and `npm run build` before opening a PR.
6. Promote a row from `staging` or `needs_check` to `source_checked` only after a human has read the cited source and confirmed the wording.

## Beta status

Observations remain beta until verified against the underlying public sources. Treat `data/raw/observations.csv` as staging material. The product separates source coverage from capability, uses verification-status labels where they exist, and avoids individual-level personal data.

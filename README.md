# China Chip Tooling Talent Monitor

Status: beta public-source monitor.

This project tracks whether Chinese semiconductor-equipment firms are building the people and support functions needed to make tools work in customer fabs. It combines a short editorial homepage, firm dossiers, segment briefs, an evidence explorer, a methodology page, and a source ledger. Counts describe public-record coverage, not workforce size or technical capability.

## Scope

- Geography: mainland PRC only.
- Industry: semiconductor manufacturing equipment only.
- Tooling segments: etch and clean, deposition, metrology and inspection, and a lithography-adjacent sidebar.
- Data model: local CSV files in `data/raw`, generated JSON files in `data/generated`, and editorial TypeScript files in `data/editorial`.
- No database, authentication, scraping pipeline, or individual-level personal data.

## What It Measures

- Public evidence signals from filings, company pages, policy records, industrial-park records, shortage lists, and analytical proxies.
- Firm-level workforce disclosures where public filings expose categories such as total employees, R&D personnel, technical personnel, advanced-degree share, service language, or customer-support signals.
- Segment-specific role families, bottlenecks, public signals, and watch questions.
- City-level visibility in the current evidence rows.

Evidence rows describe public records, not capability. A source-rich firm, city, or segment is easier to observe; it is not automatically stronger.

## What It Does Not Measure

- Workforce totals for China's semiconductor-equipment industry.
- Product performance, yield impact, installed-base quality, customer uptime, or parity with foreign suppliers.
- Segment-specific headcount unless a source explicitly discloses it.
- Individual scientists, engineers, students, or employees.
- Real-time market conditions or unverified claims outside the local source ledger.

## Routes

- `/`: Editorial homepage and first-read brief.
- `/essay`: Long-form brief.
- `/monitor`: Dashboard-style monitor with city, role, and workforce exhibits.
- `/explorer`: Evidence-row explorer with filters for segment, city, evidence type, confidence, and entity.
- `/sources`: Public source ledger.
- `/methodology`: Scope, evidence rules, confidence levels, and citation guidance.
- `/firms`: Firm index.
- `/firms/[slug]`: Firm dossiers and watch cards.
- `/segments/[segment]`: Segment briefs for role families, capabilities, and public signals.

## Data Pipeline Commands

```bash
npm run build:data
```

Reads CSV files from `data/raw` and writes generated JSON tables to `data/generated`.

```bash
npm run lint
npm run build
```

Runs linting and the production Next.js build.

## Local Development Commands

```bash
npm install
npm run build:data
npm run dev
```

Open `http://localhost:3000` after the dev server starts.

## Verification Status

Observations remain beta until verified against the underlying public sources. Treat `data/raw/observations.csv` as staging material. The app separates source coverage from capability, uses source status labels where available, and avoids individual-level personal data.

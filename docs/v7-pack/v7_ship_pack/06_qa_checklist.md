# 06 — QA checklist

## First-screen test

Open the deployed homepage. Without scrolling, a reader should know:

- the project is about Chinese chip-tooling firms;
- the test is staffing and support capacity, not just product announcements;
- the site has firm dossiers and source rows;
- the method is public-source and beta, but the caveat is not the headline.

## Route test

Check these routes:

- `/`
- `/essay`
- `/firms`
- `/firms/amec`
- `/firms/naura`
- `/firms/acm-research-shanghai`
- `/firms/piotech`
- `/segments/deposition`
- `/explorer`
- `/sources`
- `/methodology`

No route should 404.

## Hero test

- One primary CTA only.
- Secondary links are quiet.
- The beta line is small.
- The right-side exhibit shows four firm disclosures.
- Each disclosure has a denominator label.
- NAURA is not shown only as a raw total-employee comparison unless the label makes the denominator clear.

## Argument test

- No duplicate Analyst Brief card grid.
- No duplicate Findings card grid.
- No separate stat-card strip above or below the argument.
- One argument section contains the lede, three findings, and source-base numbers.

## Visual register test

- The homepage does not look like a SaaS dashboard.
- Cards are reduced; rules and typography carry the layout.
- Headlines have editorial weight.
- Tables and UI remain readable.
- No section has more labels than content.

## Data-integrity test

- No capability scores.
- No rankings.
- No `top city` language unless it clearly means record count.
- No claim implies workforce size unless it is a disclosed headcount.
- No Western comparator number appears without a source and denominator.
- Source IDs remain visible in audit views.

## Language audit

Search:

```bash
grep -R "landscape\|leverage\|robust\|sharpens\|surface\|actually\|nuanced\|why this matters\|visibility is not depth" -n app components data/editorial || true
grep -R "not a" -n app components data/editorial || true
```

Some method pages may need phrases like "not a capability score." That is fine. The homepage should not be full of them.

## Mobile test

- Hero exhibit stacks under headline.
- Masthead nav does not wrap awkwardly.
- Firm rows do not overflow.
- Explorer table remains usable or scrollable.

## Final commands

```bash
npm run build:data
npm run lint
npm run build
```

Deploy only after all pass.

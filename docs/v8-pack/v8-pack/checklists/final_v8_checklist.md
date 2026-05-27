# Final V8 Checklist

## Product clarity
- The first screen says what the site is for.
- The homepage explains what AMEC, ACM, NAURA, and Piotech numbers mean.
- The map is labeled as source coverage, not talent density.
- The site links to /supply for talent pipeline questions.
- The site links to /explorer for audit questions.

## Language
Search for:
```bash
grep -R "evidence rows\|talent signal\|workforce test\|actually\|surface\|visibility is not depth\|directional, not a census" app components data/editorial
```

Rewrite homepage results unless they are in methodology.

## Data claims
- No new number without a source.
- No segment-specific headcount claim from whole-firm filings.
- No map claim that implies talent density.
- No university claim that says it produces etch talent.
- No China-vs-West ranking.

## Build
```bash
npm run build:data
npm run lint
npm run build
```

## Manual route check
- /
- /essay
- /supply
- /firms
- /firms/amec
- /firms/acm-research-shanghai
- /firms/naura
- /firms/piotech
- /segments/deposition
- /explorer?city=Shanghai
- /sources
- /methodology

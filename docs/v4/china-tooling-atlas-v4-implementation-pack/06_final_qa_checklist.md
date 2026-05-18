# Final QA checklist

## Build checks

Run:

```bash
npm run build:data
npm run lint
npm run build
```

## Homepage checks

- The first screen says what the product is.
- The word "beta" is present but not dominant.
- The first scroll contains a finding, not a disclaimer.
- There is a clear next click for AMEC, NAURA, ACM Research Shanghai.
- The city map has a visible mainland China silhouette.
- No homepage section title uses "not a X".

## Click-through checks

- AMEC card opens `/firms/amec`.
- NAURA card opens `/firms/naura`.
- ACM card opens `/firms/acm-research-shanghai`.
- Segment card opens `/segments/deposition` or equivalent.
- Map click opens `/explorer?city=Shanghai`.
- Explorer pre-fills URL query params.
- Source links open in a new tab.

## Language checks

Search the codebase for:

```bash
grep -R "why this matters\|evidence pattern\|actually\|sharpens\|surfaces\|leverage\|robust\|not a" app components data/editorial
```

Do not automatically delete every result. Inspect each one. Some words may be fine in methodology, but they should not dominate the homepage.

## Data claim checks

- No new number was added without a source ID.
- Firm pages do not claim segment-specific headcount.
- Map does not claim talent ranking.
- Explorer still shows audit details.
- Methodology still explains limits.

## Deployment checks

After pushing to GitHub:

- Vercel build passes.
- Open deployed homepage.
- Open one firm page.
- Open one segment page.
- Open `/explorer?city=Shanghai`.
- Open `/sources`.
- Test mobile width in browser dev tools.

## Final release label

Use:

```text
Beta evidence product
```

Avoid:

```text
real-time monitor
capability index
talent ranking
complete atlas
```
